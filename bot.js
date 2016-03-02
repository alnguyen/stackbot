var constants = require('./constants')
var services = require('./services')

// Loads environment files
require('envc')({})

if (!process.env.token) {
  console.log('Error: Specify token in environment')
  process.exit(1)
}

var Botkit = require('./lib/Botkit.js')
var os = require('os')

var controller = Botkit.slackbot({
  debug: true
})

controller.spawn({
  token: process.env.token
}).startRTM()

controller.hears([constants.LOOKUP], constants.ADDRESSED, services.stackOverflow)
controller.hears([constants.DEFINE], constants.ADDRESSED, services.urbanDictionary)

controller.hears(['uptime'], constants.ADDRESSED, function (bot, message) {
  var hostname = os.hostname()
  var uptime = formatUptime(process.uptime())

  bot.reply(message, ':robot_face: I am a bot named <@' + bot.identity.name + '>. I have been running for ' + uptime + ' on ' + hostname + '.')
})

function formatUptime (uptime) {
  var unit = 'second'
  if (uptime > 60) {
    uptime = uptime / 60
    unit = 'minute'
  }

  if (uptime > 60) {
    uptime = uptime / 60
    unit = 'hour'
  }

  if (uptime !== 1) {
    unit = unit + 's'
  }

  uptime = uptime + ' ' + unit
  return uptime
}
