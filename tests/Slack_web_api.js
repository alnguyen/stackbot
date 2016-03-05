var expect = require('chai').expect
var Botkit = require('../')
var path = require('path')
var tmpdir = require('os').tmpdir()
var fs = require('fs')
var winston = require('winston')
require('envc')({})

var token = process.env.token

describe('Test', function () {
  it('should have a token', function (done) {
    expect(token).to.exist
    done()
  })

  it('should have Botkit instance', function (done) {
    expect(Botkit).to.exist
    expect(Botkit.core).to.exist
    expect(Botkit.slackbot).to.exist
    done()
  })
})

describe('Botkit', function () {
  this.timeout(5000)

  it('should start and then stop', function (done) {
    var controller = Botkit.slackbot({debug: false})
    var openIsCalled = false

    controller.on('rtm_open', function (bot) {
      expect(bot).to.exist
      openIsCalled = true
    })

    controller.on('rtm_close', function (bot) {
      expect(bot).to.exist
      expect(openIsCalled).to.equal(true)
      controller.shutdown()
      done()
    })

    controller
      .spawn({
        token: token
      })
      .startRTM(function (err, bot, payload) {
        expect(err).to.be.null
        expect(bot).to.exist
        bot.closeRTM()
      })
  })

  it('should have fail with false token', function (done) {
    this.timeout(5000)

    var controller = Botkit.slackbot({debug: false})

    controller
      .spawn({token: '1234'})
      .startRTM(function (err, bot, payload) {
        expect(err).to.exist
        controller.shutdown()
        done()
      })
  })
})

describe('Log', function () {
  it('should use an external logging provider', function (done) {
    var logFile = path.join(tmpdir, 'botkit.log')
    var logger = new winston.Logger({
      transports: [
        new (winston.transports.File)({ filename: logFile })
      ]
    })

    logger.cli()

    var controller = Botkit.slackbot({
      debug: true,
      logger: logger
    })

    controller
      .spawn({token: '1234'})
      .startRTM(function (err, bot, payload) {
        expect(err).to.exist
        controller.shutdown()

        fs.readFile(logFile, 'utf8', function (err, res) {
          expect(err).to.be.null
          expect(res).to.exist
          done()
        })
      })
  })
})
