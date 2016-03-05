require('envc')({})
// var expect = require('chai').expect
var helpers = require('./helpers')
var service = require('../services').stackOverflow
var sinon = require('sinon')

const USER = 'U04N026S8'
const CHANNEL = 'C04N12DCF'
const fakeBot = {
  botkit: { log: function () {} },
  reply: function (a, b) {}
}

describe.only('StackOverflow', function () {
  beforeEach(function (done) {
    helpers.clearNock()
    done()
  })

  it('returns an accepted answer if present', function (done) {
    var question = 'lookup test'
    helpers.mockQuestionWithAnswer(question)
    helpers.mockAcceptedAnswer()

    var message = {
      type: 'message',
      channel: CHANNEL,
      user: USER,
      text: question,
      ts: '1457155238.000002',
      team: 'T04N12D43'
    }

    var mock = sinon.mock(fakeBot)
    mock.expects('reply').twice()
    service(fakeBot, message)
    mock.verify()
  })
})
