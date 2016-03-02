var request = require('request')
var constants = require('../constants')

function logError (bot, err, msg) {
  if (err) {
    var message = msg || 'Danger Will Robinson!'
    bot.botkit.log(message, err)
  }
}

module.exports = function (bot, message) {
  var text = message.text
  // Verify first word is lookup
  var firstWord = text.substr(0, text.indexOf(' '))
  if (firstWord === constants.DEFINE) {
    var term = text.substr(text.indexOf(' ') + 1)
    var defineQS = {
      term
    }

    request.get({
      url: `${constants.API.urban.url}`,
      gzip: true,
      qs: defineQS,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    }, (err, res, body) => {
      if (err) {
        logError(bot, 'Error Communicating With Urban Dictionary', err)
        bot.reply(message, 'Error: You must construct additional pylons!')
        return
      }

      var results = JSON.parse(body).list.slice(0, 3)
      if (results.length) {
        results.forEach((result, index) => {
          var reply = `*${index + 1}. ${result.word}*\n\n`
          reply += `*Definition*:\n\`\`\`${result.definition}\`\`\`\n\n`
          reply += `*Example*: \`\`\`${result.example}\`\`\``
          bot.reply(message, reply)
        })
      } else {
        bot.reply(message, 'No results found.')
      }
    })
  }
}
