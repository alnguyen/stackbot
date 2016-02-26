var constants = require('./constants')

// Loads environment files
require('envc')({})
var request = require('request')

if (!process.env.token) {
  console.log('Error: Specify token in environment')
  process.exit(1)
}

var Botkit = require('./lib/Botkit.js')
var os = require('os')

var controller = Botkit.slackbot({
  debug: true
})

var bot = controller.spawn({
  token: process.env.token
}).startRTM()

function logError (err, msg) {
  if (err) {
    var message = msg || 'Danger Will Robinson!'
    bot.botkit.log(message, err)
  }
}

controller.hears([constants.LOOKUP], constants.ADDRESSED, function (bot, message) {
  var text = message.text
  // Verify first word is lookup
  var firstWord = text.substr(0, text.indexOf(' '))
  if (firstWord === constants.LOOKUP) {
    var test = text.substr(text.indexOf(' ') + 1)
    console.log('raw rawr rawr', test)
  }
})

controller.hears(['hello', 'hi'], constants.ADDRESSED, function (bot, message) {
  bot.api.reactions.add({
    timestamp: message.ts,
    channel: message.channel,
    name: 'robot_face'
  }, function (err, res) {
    if (err) {
      bot.botkit.log('Failed to add emoji reaction :(', err)
    }
  })

  controller.storage.users.get(message.user, function (err, user) {
    logError(err, 'Failed to get user')

    if (user && user.name) {
      bot.reply(message, 'Hello ' + user.name + '!!')
    } else {
      bot.reply(message, 'Hello.')
    }
  })
})

controller.hears(['call me (.*)'], constants.ADDRESSED, function (bot, message) {
  var matches = message.text.match(/call me (.*)/i)
  var name = matches[1]
  controller.storage.users.get(message.user, function (err, user) {
    logError(err, 'Failed to get user')
    if (!user) {
      user = {
        id: message.user
      }
    }
    user.name = name
    controller.storage.users.save(user, function (err, id) {
      logError(err, 'Failed to save user')
      bot.reply(message, 'Got it. I will call you ' + user.name + ' from now on.')
    })
  })
})

controller.hears(['shutdown'], constants.ADDRESSED, function (bot, message) {
  bot.startConversation(message, function (err, convo) {
    logError(err, 'Failed to start conversation')
    convo.ask('Are you sure you want me to shutdown?', [
      {
        pattern: bot.utterances.yes,
        callback: function (response, convo) {
          convo.say('Bye!')
          convo.next()
          setTimeout(function () {
            process.exit()
          }, 3000)
        }
      },
      {
        pattern: bot.utterances.no,
        default: true,
        callback: function (response, convo) {
          convo.say('*Phew!*')
          convo.next()
        }
      }
    ])
  })
})

controller.hears(['uptime', 'identify yourself', 'who are you', 'what is your name'], constants.ADDRESSED, function (bot, message) {
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
