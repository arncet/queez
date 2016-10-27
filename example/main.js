var quizz = new Queez(quizzConfig);

function displayQuizz(quizz) {
  return  '<h1>' + quizz.custom.title + '</h1>'
          + '<ul>'
            + quizz.questions.map(function(question) { return displayQuestion(question, quizz); }).join('')
          + '</ul>'
          + '<button onclick="getResponse()">VOIR LES RESULTATS</button>';
}

function displayQuestion(question, quizz) {
  return  '<li class="question" style="display: inline-block; margin-right: 20px;">'
            + question.content
            + '<ul>'
              + question.answers.map(function(answer) { return displayAnswer(answer, question.id); }).join('')
            + '</ul>'
          + '</li>';
}

function displayAnswer(answer, questionId) {
  return '<li class="answer">'
          + answer.content
          + '(' + answer.coefficient + ')'
          + '<button onclick="vote(\'' + questionId +'\',\'' + answer.id + '\')">VOTER</button>'
          + '<button onclick="unVote(\'' + questionId +'\',\'' + answer.id + '\')">UNVOTE</button>'
         + '<li/>';
}

function vote(questionId, answerId) {
  var question = quizz.getQuestion(questionId);
  if (question) question.respond(answerId);
}

function unVote(questionId, answerId) {
  var question = quizz.getQuestion(questionId);
  if (question) {
    console.log(quizz)
    question.unRespond(answerId);
  }
}

function getResponse() {
  console.log(quizz.getResponse())
}

document.querySelector('.quizz_container').innerHTML = displayQuizz(quizz);
console.log(quizz);
