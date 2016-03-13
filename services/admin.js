var constants = require('../constants')
var slackWebApi = require('../lib/Slack_web_api.js')

function disableService (service) {
  // Disables Service
  console.log(`disable ${service}`)
}

function enableService (service) {
  // Enables Service
  console.log(`enable ${service}`)
}

var accessMethods = {
  disable: disableService,
  enable: enableService
}

function logError (bot, err, msg) {
  if (err) {
    var message = msg || 'Danger Will Robinson!'
    bot.botkit.log(message, err)
  }
}

module.exports = function (bot, message, cb) {
  var text = message.text
  var action = text.substr(0, text.indexOf(' '))
  var service = text.substr(text.indexOf(' ') + 1)
  var user = message.user

  bot.api.users.info({user}, (err, res) => {
    if (res.user && res.user.is_admin) {
      accessMethods[action](service)
    }
  })

}
