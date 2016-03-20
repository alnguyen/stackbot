const baseServices = {
  get: function (identifier, callback) {
    callback(null, {name: identifier, disabled: false})
  },
  save: function () {},
  all: function () {}
}

const storage = {
  services: baseServices
}

module.exports = {
  botkit: {
    log: function () {},
    storage: storage
  },
  reply: function (msg, reply) { return }
}
