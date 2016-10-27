var quizzConfig = {
  "title": "Super hero quizz",
  "questions": [
    {
      "id": "question-sexe",
      "content": "You are a man or a woman ?",
      "categoryId": "sexe",
      "answers": [
        { "id": "answer-sexe-1", "content": "Man", "value": "man" },
        { "id": "answer-sexe-2", "content": "Woman", "value": "woman" }
      ]
    },
    {
      "id": "question-color",
      "content": "What is your favorite color ?",
      "categoryId": "color",
      "multiple": true,
      "answers": [
        { "id": "answer-color-1", "content": "Red", "value": "red" },
        { "id": "answer-color-2", "content": "Blue", "value": "blue" },
        { "id": "answer-color-3", "content": "Black", "value": "black" },
        { "id": "answer-color-4", "content": "Green", "value": "green" }
      ]
    },
    {
      "id": "question-attribut",
      "content": "What attribute you would like to have ?",
      "categoryId": "attribute",
      "multiple": true,
      "answers": [
        { "id": "answer-attribute-1", "content": "Strength", "value": "strength" },
        { "id": "answer-attribute-2", "content": "Speed", "value": "speed" },
        { "id": "answer-attribute-3", "content": "agility", "value": "agility" },
        { "id": "answer-attribute-4", "content": "Elementary", "value":       "elementary" }
      ]
    }
  ],
  "categories": [
    { "id": "sexe", "title": "Sexe" },
    { "id": "color", "title": "Color" },
    { "id": "attribute", "title": "Attribute" }
  ],
  "results": [
    {
      "id": "result-1",
      "content": "Superman",
      "filter": {
        "sexe": "man",
        "color": {"red": true, "blue": true},
        "attribute": "strength"
      }
    },
    {
      "id": "result-2",
      "content": "Batman",
      "filter": [
        {
          "sexe": "man",
          "color": "black",
          "attribute": "agility"
        },
        {
          "sexe": "man",
          "color": "black",
          "attribute": "strength"
        }
      ]
    },
    {
      "id": "result-3",
      "content": "Hulk",
      "filter": {
        "sexe": "man",
        "color": "green",
        "attribute": "strength"
      }
    },
    {
      "id": "result-4",
      "content": "Flash",
      "filter": {
        "sexe": "man",
        "color": "red",
        "attribute": {"agility": true, "speed": true}
      }
    },
    {
      "id": "result-5",
      "content": "Wonder Woman",
      "filter": {
        "sexe": "woman",
        "color": ["red", "blue"],
        "attribute": "strength"
      }
    },
    {
      "id": "result-6",
      "content": "Spider-man",
      "filter": {
        "sexe": "man",
        "color": {"red": true, "blue": true},
        "attribute": "agility"
      }
    },
    {
      "id": "result-7",
      "content": "Thor",
      "filter": {
        "sexe": "man",
        "color": ["red", "black"],
        "attribute": {"strength": true, "elementary": true}
      }
    },
    {
      "id": "result-8",
      "content": "Tornade",
      "filter": {
        "sexe": "woman",
        "color": "black",
        "attribute": "elementary"
      }
    },
    {
      "id": "result-9",
      "content": "Iron-man",
      "filter": {
        "sexe": "man",
        "color": "red",
        "attribute": "strength"
      }
    },
    {
      "id": "result-10",
      "content": "Green Lantern",
      "filter": {
        "sexe": "man",
        "color": "green",
        "attribute": {"strength": true, "elementary": true}
      }
    }
  ],
  "callbacks": {
    onQuestionRespond: [function() {}],
    onQuestionUnRespond: [function() {}],
    onQuizzComplete: [function() {}]
  }
}

module.exports = quizzConfig
