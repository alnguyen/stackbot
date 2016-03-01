module.exports = {
  // -- COMMANDS
  LOOKUP: 'lookup',

  // -- EVENTS
  ADDRESSED: [
    'direct_message',
    'direct_mention',
    'mention'
  ],

  // -- APIs
  API: {
    stack: {
      url: 'https://api.stackexchange.com/2.2',
      site: 'stackoverflow'
    }
  },

  // -- REGEX
  REGEX: {
    pre_code: /(<pre><code>[^]*<\/code><\/pre>)/igm
  }
}
