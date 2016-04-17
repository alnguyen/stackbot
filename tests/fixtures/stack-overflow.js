var questionWithAnswer = {
  'items': [
    {
      'is_answered': false,
      'title': 'random title'
    },
    {
      'is_answered': true,
      'accepted_answer_id': 30000977,
      'title': 'question'
    }
  ],
  'has_more': false
}

var questionWithoutAnswer = {
  'items': [
    {
      'is_answered': false,
      'title': 'the cake is a lie'
    }
  ],
  'has_more': false
}

var acceptedAnswer = {
  'items': [
    {
      'is_accepted': true,
      'answer_id': 30000977,
      'question_id': 30000671,
      'body': '<p>answer</p> <pre><code>a</code></pre>',
      'link': 'http://test'
    }
  ],
  'has_more': false
}

module.exports = {
  acceptedAnswer,
  questionWithAnswer,
  questionWithoutAnswer
}
