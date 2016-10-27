var quizzConfig = {
  "title": "Preference Survey",
  "questions": [
    {
      "id": "favorite-color",
      "content": "Parmis les couleurs suivantes, laquelle preferez-vous ?",
      "answers": [
        { "id": "c-answer-1", "content": "Vert", "value": "vert" },
        { "id": "c-answer-2", "content": "Jaune", "value": "jaune" },
        { "id": "c-answer-3", "content": "Rouge", "value": "rouge" },
        { "id": "c-answer-4", "content": "Jaune", "value": "bleu" }
      ]
    },
    {
      "id": "favorite-food",
      "content": "Parmis les aliments suivantes, laquel preferez-vous ?",
      "answers": [
        { "id": "f-answer-1", "content": "Burger", "value": "burger" },
        { "id": "f-answer-2", "content": "Salade", "value": "salade" },
        { "id": "f-answer-3", "content": "Pizza", "value": "pizza" },
        { "id": "f-answer-4", "content": "Riz", "value": "riz" }
      ]
    },
    {
      "id": "favorite-car-brand",
      "content": "Parmis les marque de voiture suivantes, laquelle preferez-vous ?",
      "answers": [
        { "id": "c-b-answer-1", "content": "Audi", "value": "audi" },
        { "id": "c-b-answer-2", "content": "BMW", "value": "bmw" },
        { "id": "c-b-answer-3", "content": "Aston Martin", "value": "aston-martin" },
        { "id": "c-b-answer-4", "content": "Chevrolet", "value": "chevrolet" }
      ]
    },
    {
      "id": "favorite-os",
      "content": "Parmis les marque de voiture suivantes, laquelle preferez-vous ?",
      "answers": [
        { "id": "os-answer-1", "content": "Mac OS", "value": "mac-os" },
        { "id": "os-answer-2", "content": "Windows", "value": "windows" },
        { "id": "os-answer-3", "content": "Linux", "value": "linux" }
      ]
    }
  ],
  "callbacks": {
    onQuizzComplete: [function(quizz) {
      console.log('onQuizzComplete', quizz.getResponse())
    }]
  }
}

module.exports = quizzConfig
