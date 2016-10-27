var quizzConfig = {
  "title": "Un titre de Quizz :)",
  "questions": [
    {
      "id": "question-1",
      "content": "Choisissez un chiffre",
      "categoryId": "number",
      "answers": [
        { "id": "answer-1", "content": "1", "value": "1" },
        { "id": "answer-2", "content": "2", "value": "2" },
        { "id": "answer-3", "content": "3", "value": "3" },
        { "id": "answer-4", "content": "4", "value": "4" }
      ]
    },
    {
      "id": "question-1.2",
      "content": "Choisissez un chiffre",
      "categoryId": "number",
      "answers": [
        { "id": "answer-1.2", "content": "1", "value": "1" },
        { "id": "answer-2.2", "content": "2", "value": "2" },
        { "id": "answer-3.2", "content": "3", "value": "3" },
        { "id": "answer-4.2", "content": "4", "value": "4" }
      ]
    },
    {
      "id": "question-1.3",
      "content": "Choisissez un chiffre",
      "categoryId": "number",
      "answers": [
        { "id": "answer-1.3", "content": "1", "value": "1" },
        { "id": "answer-2.3", "content": "2", "value": "2" },
        { "id": "answer-3.3", "content": "3", "value": "3" },
        { "id": "answer-4.3", "content": "4", "value": "4" }
      ]
    },
    {
      "id": "question-2",
      "content": "Choisissez une lettre",
      "categoryId": "character",
      "title": "lol",
      "answers": [
        { "id": "answer-5", "content": "A" , "value": "A" },
        { "id": "answer-6", "content": "B" , "value": "B" },
        { "id": "answer-7", "content": "C" , "value": "C" },
        { "id": "answer-8", "content": "D" , "value": "D" }
      ]
    },
    {
      "id": "question-2.1",
      "content": "Choisissez une lettre",
      "categoryId": "character",
      "title": "lol",
      "answers": [
        { "id": "answer-5.1", "content": "A", "value": "A" },
        { "id": "answer-6.1", "content": "B", "value": "B" },
        { "id": "answer-7.1", "content": "C", "value": "C" },
        { "id": "answer-8.1", "content": "D", "value": "D" }
      ]
    },
    {
      "id": "question-2.2",
      "content": "Choisissez une lettre",
      "categoryId": "character",
      "title": "lol",
      "answers": [
        { "id": "answer-5.2", "content": "A", "value": "A" },
        { "id": "answer-6.2", "content": "B", "value": "B" },
        { "id": "answer-7.2", "content": "C", "value": "C" },
        { "id": "answer-8.2", "content": "D", "value": "D", coefficient: 2 }
      ]
    }
  ],
  "categories": [
    { "id": "number", 'lol': 'lol' },
    { "id": "character" }
  ],
  "results": [
    {
      "id": "result-1",
      "filter": { "number": "2" }
    },
    {
      "id": "result-2",
      "filter": { "character": "C" }
    },
    {
      "id": "result-3"
    },
    {
      "id": "result-4",
      "filter": { "number": ["1", "2"] }
    },
    {
      "id": "result-5",
      "filter": [ { "number": ["1", "2"], "character": "B" }, { "number": "3", character: "D" } ]
    }
  ],
  "callbacks": {
    onQuestionRespond: [function(question, answer, error) {
      console.log('onQuestionRespond', question, answer, error)
    }],
    onQuestionUnRespond: [function(question, answer, error) {
      console.log('onQuestionUnRespond', question, answer, error)
    }],
    onQuizzComplete: [function(quizz) {
      console.log('onQuizzComplete', quizz)
    }]
  }
}
