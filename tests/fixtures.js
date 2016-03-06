var stackQuestionWithAnswer = {
  'items': [
    {
      'is_answered': false,
      'title': 'random title'
    },
    {
      'is_answered': true,
      'accepted_answer_id': 30000977,
      'title': 'answered title'
    }
  ],
  'has_more': false
}

var stackQuestionWithoutAnswer = {
  'items': [
    {
      'is_answered': false,
      'title': 'the cake is a lie'
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
      'body': '<p>meatloaf</p> <pre><code>pizza</code></pre>'
    }
  ],
  'has_more': false
}

module.exports = {
  stackAcceptedAnswer,
  stackQuestionWithAnswer,
  stackQuestionWithoutAnswer
}
