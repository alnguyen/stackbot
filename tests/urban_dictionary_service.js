require('envc')({})
var expect = require('chai').expect
var helpers = require('./helpers')
var service = require('../services').urbanDictionary
var sinon = require('sinon')

const USER = 'U04N026S8'
const CHANNEL = 'C04N12DCF'
const DEFINE = 'define test'
const MESSAGE = {
  type: 'message',
  channel: CHANNEL,
  user: USER,
  text: DEFINE,
  ts: '1457155238.000002',
  team: 'T04N12D43'
}
const fakeBot = {
  botkit: { log: function () {} },
  reply: function (msg, reply) { return }
}

describe('UrbanDictionary', function () {
  var replySpy = sinon.spy(fakeBot, 'reply')
  beforeEach((done) => {
    helpers.clearNock()
    replySpy.reset()
    done()
  })

  it('returns no result message if no definition present', (done) => {
    helpers.mockDefinitionWithoutResult()

    var expectedReply = 'No result found.'

    service(fakeBot, MESSAGE, () => {
      expect(replySpy.calledOnce).to.equal(true)
      expect(replySpy.calledWith(MESSAGE, expectedReply)).to.equal(true)
      done()
    })
  })

  it('returns parsed result if definnition exists', (done) => {
    helpers.mockDefinitionWithResult()
    var expectedReply = '*1. API*\n\n*Definition*:\n```Active pharmaceutical ingredient. The part of a drug that causes the effect.```\n\n*Example*: ```The API of aspirine is acetylsalicylic acid.```'
    service(fakeBot, MESSAGE, () => {
      expect(replySpy.calledOnce).to.equal(true)
      expect(replySpy.calledWith(MESSAGE, expectedReply)).to.equal(true)
      done()
    })
  })
})
