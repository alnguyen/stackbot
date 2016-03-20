var async = require('async')

function disableService (bot, service, cb) {
  // Disables Service
  console.log(`disable ${service}`)
  cb()
}

function enableService (bot, service, cb) {
  // Enables Service
  console.log(`enable ${service}`)
  cb()
}

var accessMethods = {
  disable: disableService,
  enable: enableService
}

function getUser (bot, message, service, cb) {
  bot.api.users.info({user: message.user}, (err, res) => {
    if (err) logError(bot, err, 'Error querying user info')
    if (res.user.is_admin) return cb(null, bot, service)
    bot.reply(message, 'This functionality is above your paygrade.')
  })
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
  async.waterfall([
    getUser.bind(null, bot, message, service),
    accessMethods[action]
  ], (err, result) => {
    logError(bot, err)
    if (cb) cb()
  })
}
