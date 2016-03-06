var async = require('async')
var request = require('request')
var constants = require('../constants')

const answerQS = {
  filter: 'withbody',
  order: 'desc',
  site: constants.API.stack.site,
  sort: 'activity'
}

function logError (bot, err, msg) {
  if (err) {
    var message = msg || 'Danger Will Robinson!'
    bot.botkit.log(message, err)
  }
}

function requestQuestions (bot, message, search, callback) {
  var questionQS = {
    order: 'desc',
    q: search,
    site: constants.API.stack.site,
    sort: 'relevance'
  }

  request.get({
    url: `${constants.API.stack.host}/2.2/search/advanced`,
    gzip: true,
    qs: questionQS,
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  }, (err, res, body) => {
    if (err) {
      logError(bot, 'Error With Stack Response', err)
      bot.reply(message, 'Error: You must construct additional pylons!')
      return callback(err)
    }
    var results = JSON.parse(body)
    var question = results.items.find((item) => item.is_answered && item.accepted_answer_id)
    if (!question) {
      var msg = 'No relevant result found. :frowning: :panda_face:'
      bot.reply(message, msg)
      return callback(msg)
    }
    callback(null, bot, message, question)
  })
}

function requestAnswers (bot, message, question, callback) {
  request.get({
    url: `${constants.API.stack.host}/2.2/answers/${question.accepted_answer_id}`,
    gzip: true,
    qs: answerQS,
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  }, (err, res, body) => {
    if (err) {
      logError(bot, 'Error With Stack Response', err)
      bot.reply(message, 'Error: You must construct additional pylons!')
      return callback(err)
    }
    var answers = JSON.parse(body)

    if (answers.items.length) {
      var answer = answers.items[0]
      var pieces = answer.body.split(constants.REGEX.pre_code)
      var stripped = pieces.map((piece) => {
        if (constants.REGEX.pre_code.test(piece)) {
          var codeBlock = piece.replace(/<pre><code>/igm, '```')
          codeBlock = codeBlock.replace(/<\/code><\/pre>/igm, '```')
          return codeBlock
        }
        var textBlock = piece.replace(/<\/*code>/igm, '`')
        textBlock = textBlock.replace(/(<([^>]+)>)/igm, '')
        return textBlock
      }).join('')

      var reply = `*Q:* \`${question.title}\`\n`
      reply += `*A:* ${stripped}`

      callback(null, bot, message, reply)
    }
  })
}

function replyWithAnswer (bot, message, reply, callback) {
  bot.reply(message, reply)
  callback()
}

/*
  Params:
    bot
    message
    cb - optional
*/
module.exports = function (bot, message, cb) {
  var text = message.text
  // Verify first word is lookup
  var firstWord = text.substr(0, text.indexOf(' '))
  if (firstWord === constants.LOOKUP) {
    var search = text.substr(text.indexOf(' ') + 1)

    async.waterfall([
      requestQuestions.bind(null, bot, message, search),
      requestAnswers,
      replyWithAnswer
    ], (err, result) => {
      logError(bot, err)
      if (cb) cb()
    })
  }
}
