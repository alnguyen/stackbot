var constants = require('../constants')
var fixtures = require('./fixtures')
var nock = require('nock')
var clearNock = nock.cleanAll

const ACCEPTED_ANSWER_ID = 30000977

function mockQuestionWithAnswer () {
  nock(constants.API.stack.host)
    .get('/2.2/search/advanced')
    .query(true)
    .reply(
      200,
      fixtures.stackOverflow.questionWithAnswer
    )
}

function mockQuestionWithoutAnswer () {
  nock(constants.API.stack.host)
    .get('/2.2/search/advanced')
    .query(true)
    .reply(
      200,
      fixtures.stackOverflow.questionWithoutAnswer
    )
}

function mockAcceptedAnswer () {
  nock(constants.API.stack.host)
    .get(`/2.2/answers/${ACCEPTED_ANSWER_ID}`)
    .query(true)
    .reply(
      200,
      fixtures.stackOverflow.acceptedAnswer
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

function mockStackUser () {
  nock(constants.API.stack.host)
    .get('/2.2/users/users.info')
    .query(true)
    .reply(
      200,
      fixtures.slack.user
    )
}

module.exports = {
  clearNock,
  mockQuestionWithAnswer,
  mockQuestionWithoutAnswer,
  mockAcceptedAnswer,
  mockDefinitionWithResult,
  mockDefinitionWithoutResult,
  mockStackUser
}
