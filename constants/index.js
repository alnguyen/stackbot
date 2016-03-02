module.exports = {
  // -- COMMANDS
  LOOKUP: 'lookup',
  DEFINE: 'define',

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
    },
    urban: {
      url: 'http://api.urbandictionary.com/v0/define'
    }
  },

  // -- REGEX
  REGEX: {
    pre_code: /(<pre><code>[^]*?<\/code>{1}?<\/pre>)/igm
  }
}
