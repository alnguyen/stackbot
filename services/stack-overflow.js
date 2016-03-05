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

module.exports = function (bot, message) {
  console.log('1')
  var text = message.text
  // Verify first word is lookup
  var firstWord = text.substr(0, text.indexOf(' '))
  if (firstWord === constants.LOOKUP) {
    console.log('2')
    var search = text.substr(text.indexOf(' ') + 1)
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
      console.log('3')
      if (err) {
        logError(bot, 'Error With Stack Response', err)
        bot.reply(message, 'Error: You must construct additional pylons!')
        return
      }
      var results = JSON.parse(body)

      // Answer exists
      if (results.items.length) {
        console.log('4')
        var question = results.items.find((item) => item.is_answered && item.accepted_answer_id)
        if (!question) {
          bot.reply(message, 'No answered result found!')
          return
        }
        var resultQuestion = question.title

        request.get({
          url: `${constants.API.stack.host}/2.2/answers/${question.accepted_answer_id}`,
          gzip: true,
          qs: answerQS,
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
        }, (err, res, body) => {
          console.log('5')
          if (err) {
            logError(bot, 'Error With Stack Response', err)
            bot.reply(message, 'Error: You must construct additional pylons!')
            return
          }
          var answers = JSON.parse(body)

          if (answers.items.length) {
            console.log('6')
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

            var reply = `*Q:* \`${resultQuestion}\`\n`
            reply += `*A:* ${stripped}`

            bot.reply(message, reply)
          }
        })
      }
    })
  }
}
