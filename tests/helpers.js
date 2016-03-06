var constants = require('../constants')
var fixtures = require('./fixtures')
var nock = require('nock')
var clearNock = nock.cleanAll

const ACCEPTED_ANSWER_ID = 30000977

// -- TODO: Get query strings to work
function mockQuestionWithAnswer () {
  nock(constants.API.stack.host)
    .get('/2.2/search/advanced')
    .query(true)
    .reply(
      200,
      fixtures.stackQuestionWithAnswer
    )
}

function mockQuestionWithoutAnswer () {
  nock(constants.API.stack.host)
    .get('/2.2/search/advanced')
    .query(true)
    .reply(
      200,
      fixtures.stackQuestionWithoutAnswer
    )
}

function mockAcceptedAnswer () {
  nock(constants.API.stack.host)
    .get(`/2.2/answers/${ACCEPTED_ANSWER_ID}`)
    .query(true)
    .reply(
      200,
      fixtures.stackAcceptedAnswer
    )
}

module.exports = {
  clearNock,
  mockQuestionWithAnswer,
  mockQuestionWithoutAnswer,
  mockAcceptedAnswer
}
