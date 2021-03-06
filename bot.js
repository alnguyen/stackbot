// Loads environment files
require('envc')({})

var constants = require('./constants')
var services = require('./services')

if (!process.env.token) {
  console.log('Error: Specify token in environment')
  process.exit(1)
}

var Botkit = require('./lib/Botkit.js')

var controller = Botkit.slackbot({
  debug: true
})

controller.spawn({
  token: process.env.token
}).startRTM()

controller.hears([constants.LOOKUP], constants.ADDRESSED, services.stackOverflow)
controller.hears([constants.DEFINE], constants.ADDRESSED, services.urbanDictionary)
controller.hears([constants.IDENTIFY], constants.ADDRESSED, services.identify)
controller.hears([constants.ENABLE, constants.DISABLE], constants.ADDRESSED, services.admin)
