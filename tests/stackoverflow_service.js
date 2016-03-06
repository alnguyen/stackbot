require('envc')({})
var expect = require('chai').expect
var helpers = require('./helpers')
var service = require('../services').stackOverflow
var sinon = require('sinon')

const USER = 'U04N026S8'
const CHANNEL = 'C04N12DCF'
const QUESTION = 'lookup test'
const MESSAGE = {
  type: 'message',
  channel: CHANNEL,
  user: USER,
  text: QUESTION,
  ts: '1457155238.000002',
  team: 'T04N12D43'
}
const fakeBot = {
  botkit: { log: function () {} },
  reply: function (msg, reply) {
    console.log({msg, reply})
    return
  }
}

describe.only('StackOverflow', function () {
  var replySpy = sinon.spy(fakeBot, 'reply')
  beforeEach((done) => {
    helpers.clearNock()
    replySpy.reset()
    done()
  })

  it('returns an accepted answer if present', (done) => {
    helpers.mockQuestionWithAnswer()
    helpers.mockAcceptedAnswer()

    var expectedReply = '*Q:* `answered title`\n*A:* meatloaf ```pizza```'

    service(fakeBot, MESSAGE, () => {
      expect(replySpy.calledOnce).to.equal(true)
      expect(replySpy.calledWith(MESSAGE, expectedReply)).to.equal(true)
      done()
    })
  })

  it('returns sad panda message if no relevant questions', (done) => {
    helpers.mockQuestionWithoutAnswer()
    var expectedReply = 'No relevant result found. :frowning: :panda_face:'
    service(fakeBot, MESSAGE, () => {
      expect(replySpy.calledOnce).to.equal(true)
      expect(replySpy.calledWith(MESSAGE, expectedReply)).to.equal(true)
      done()
    })
  })
})
