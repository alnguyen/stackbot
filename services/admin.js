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

function getUser (bot, userId) {
  bot.botkit.storage.users.get(userId, (err, res) => {
    if (err) logError(bot, err, 'Error accessing user info')
    if (!res) {
      // No user stored -- save it
      var slackUser = queryUserInfo(bot, userId)
      console.log({userId, slackUser})
      return slackUser
    }
  })
}

function queryUserInfo (bot, userId) {
  bot.api.users.info({user: userId}, (err, res) => {
    if (err) logError(bot, err, 'Error querying user info')
    console.log({res})
    return res
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
  var user = getUser(bot, message.user)

  console.log('after query', user)
  // if (user.is_admin) {
  //   accessMethods[action](service)
  // }
}
