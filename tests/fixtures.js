var stackQuestionWithAnswer = {
  'items': [
    {
      'is_answered': false,
      'title': 'Typed.js &quot;blink&quot; not working in placeholder'
    },
    {
      'is_answered': true,
      'accepted_answer_id': 30000977,
      'title': 'how can i replace the string between the two indexes'
    }
  ],
  'has_more': false
}

var stackQuestionWithoutAnswer = {
  'items': [
    {
      'is_answered': false,
      'title': 'Make stop my shoutbox down when message is send pressing enter key'
    }
  ],
  'has_more': false
}

var stackAcceptedAnswer = {
  'items': [
    {
      'is_accepted': true,
      'answer_id': 30000977,
      'question_id': 30000671,
      'body': '<p>Try:</p>\n\n<pre><code> tb.value = strval.slice(0, thisMatchStart) + strval.slice(thisMatchEnd);\n</code></pre>\n'
    }
  ],
  'has_more': false
}

module.exports = {
  stackAcceptedAnswer,
  stackQuestionWithAnswer,
  stackQuestionWithoutAnswer
}
