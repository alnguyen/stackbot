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
      host: 'https://api.stackexchange.com',
      site: 'stackoverflow'
    },
    urban: {
      host: 'http://api.urbandictionary.com'
    }
  },

  // -- REGEX
  REGEX: {
    pre_code: /(<pre><code>[^]*?<\/code>{1}?<\/pre>)/igm
  }
}
