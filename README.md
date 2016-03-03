StackBot
========

Your new favorite informational bot!

Features
--------

* Urban Dictionary Definitions

`define <word or phrase>`

* Stack Overflow Answers

`lookup [tag] <question>`

Getting Started
---------------

1. Check out the repo

`git clone git@github.com:alnguyen/stackbot.git`

1. Enter the directory and install the dependencies

`npm install`

1. [Setup the bot integration on slack](https://my.slack.com/services/new/bot)

  * Copy the API token slack gives you

1. Create a .env (can just copy `.env.sample` and remove `.sample`)

  * Paste the token in place of the `1234567...`

1. Run it! `node bot.js`

_Note:_ the bot needs to be invited into any chat room before it can respond to you

Additional Information
----------------------

Built off of [howdyai's botkit](https://github.com/howdyai/botkit).  Please visit this repo to find out more!