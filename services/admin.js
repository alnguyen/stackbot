var async = require('async')

function disableService (bot, message, service, cb) {
  // Disables Service
  bot.botkit.storage.services.save({
    name: service,
    disabled: true
  }, () => {
    bot.reply(message, `${service} has been disabled.`)
    cb()
  })
}

function enableService (bot, message, service, cb) {
  // Enables Service
  console.log(`enable ${service}`)
  bot.botkit.storage.services.save({
    name: service,
    disabled: false
  }, () => {
    bot.reply(message, `${service} has been enabled.`)
    cb()
  })
}

var accessMethods = {
  disable: disableService,
  enable: enableService
}

function getUser (bot, message, service, cb) {
  bot.api.users.info({user: message.user}, (err, res) => {
    if (err) logError(bot, err, 'Error querying user info')
    if (res.user.is_admin) return cb(null, bot, message, service)
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
