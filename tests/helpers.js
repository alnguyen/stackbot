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
      fixtures.stackOverflow.stackQuestionWithoutAnswer
    )
}

function mockAcceptedAnswer () {
  nock(constants.API.stack.host)
    .get(`/2.2/answers/${ACCEPTED_ANSWER_ID}`)
    .query(true)
    .reply(
      200,
      fixtures.stackOverflowstackOverflowstackAcceptedAnswer
    )
}

function mockDefinitionWithResult () {
  nock(constants.API.urban.host)
    .get('/v0/define')
    .query(true)
    .reply(
      200,
      fixtures.urbanDictionary.definitionWithResult
    )
}

function mockDefinitionWithoutResult () {
  nock(constants.API.urban.host)
    .get('/v0/define')
    .query(true)
    .reply(
      200,
      fixtures.urbanDictionary.definitionWithoutResult
    )
}

module.exports = {
  clearNock,
  mockQuestionWithAnswer,
  mockQuestionWithoutAnswer,
  mockAcceptedAnswer,
  mockDefinitionWithResult,
  mockDefinitionWithoutResult

}
