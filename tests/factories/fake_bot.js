const baseServices = {
  get: function () {},
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
