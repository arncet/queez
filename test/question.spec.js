import { expect } from 'chai'

import Question from '../src/question'
import Answer from '../src/answer'

const questionConfig = {
  id: 'question-1',
  answers: [
    { "id": "answer-1", "content": "Answer 1", "value": "Answer Value 1" },
    { "id": "answer-2", "content": "Answer 2", "value": "Answer Value 2" }
  ],
  categoryId: 'category-id',
  multiple: true,
  content: 'Question 1',
  illustration: 'illustration.png'
}

const questionCallbacks = {
  onQuestionRespond: () => 'onQuestionRespond',
  onQuestionUnRespond: () => 'onQuestionUnRespond',
}

describe('question', () => {
  /********** INSTANTIATION **********/
  it('instantiation without params', () => {
    const question = new Question({}, {})
    expect(question).to.have.property('custom')
    expect(question.custom).to.eql({})

    expect(question).to.have.property('answersIds')
    expect(question.answersIds).to.eql([])

    expect(question).to.have.property('id')

    expect(question).to.have.property('answers')
    expect(question.answers).to.eql([])

    expect(question).to.have.property('categoryId')
    expect(question.categoryId).to.eql('')

    expect(question).to.have.property('multiple')
    expect(question.multiple).to.eql(false)

    expect(question.isAnswered()).to.be.false
  })

  it('instantiation with params', () => {
    const question = new Question(questionConfig, questionCallbacks)
    expect(question).to.have.property('custom')
    expect(question.custom).to.eql({illustration: 'illustration.png'})

    expect(question).to.have.property('answersIds')
    expect(question.answersIds).to.eql([])

    expect(question).to.have.property('id')
    expect(question.id).to.eql('question-1')

    expect(question).to.have.property('answers')
    expect(question.answers[0]).to.be.an.instanceof(Answer)

    expect(question).to.have.property('content')
    expect(question.content).to.eql('Question 1')

    expect(question).to.have.property('categoryId')
    expect(question.categoryId).to.eql('category-id')

    expect(question).to.have.property('multiple')
    expect(question.multiple).to.eql(true)

    expect(question.isAnswered()).to.be.false

    expect(question.toPropsLess()).to.have.property('id')
    expect(question.toPropsLess().id).to.eql('question-1')

    expect(question.toPropsLess()).to.have.property('content')
    expect(question.toPropsLess().content).to.eql('Question 1')

    expect(question.toPropsLess()).to.have.property('answers')

    expect(question.toPropsLess()).to.have.property('custom')
    expect(question.toPropsLess().custom).to.eql({illustration: 'illustration.png'})
  })

  /********** GETANSWER METHOD **********/
  it('getAnswer return good answer', () => {
    const question = new Question(questionConfig, questionCallbacks)
    const answer = question.getAnswer('answer-1')
    expect(answer).to.not.be.undefined
    expect(answer).to.be.an.instanceof(Answer)
    expect(answer.id).to.eql('answer-1')
  })

  it('getAnswer return nothing', () => {
    const question = new Question(questionConfig, questionCallbacks)
    const answer = question.getAnswer('answer-3')
    expect(answer).to.be.undefined
  })

  /********** GETANSWERSBY METHOD **********/
  it('getAnswersBy return good answer array', () => {
    const question = new Question(questionConfig, questionCallbacks)
    const answers = question.getAnswersBy('content', 'Answer 1')
    expect(answers).to.have.lengthOf(1)
    expect(answers[0]).to.be.an.instanceof(Answer)
    expect(answers[0].id).to.eql('answer-1')
  })

  it('getAnswersBy return empty array', () => {
    const question = new Question(questionConfig, questionCallbacks)
    const answers = question.getAnswersBy('content', 'Answer 3')
    expect(answers).to.have.lengthOf(0)
  })

  /********** RESPOND METHOD **********/
  it('respond correctly add answer id to answersIds', () => {
    const question = new Question(questionConfig, questionCallbacks)
    question.respond('answer-1')
    expect(question.answersIds).to.have.lengthOf(1)
    expect(question.answersIds[0]).to.eql('answer-1')
  })

  it('respond failed to add answer id to answersIds', () => {
    const question = new Question(questionConfig, questionCallbacks)
    question.respond('answer-3')
    expect(question.answersIds).to.have.lengthOf(0)
  })

  it('respond two times with multiple atrribut to true', () => {
    const question = new Question(questionConfig, questionCallbacks)
    question.respond('answer-1')
    question.respond('answer-2')
    expect(question.answersIds).to.have.lengthOf(2)
    expect(question.answersIds[0]).to.eql('answer-1')
    expect(question.answersIds[1]).to.eql('answer-2')
  })

  it('respond two times with multiple atrribut to false', () => {
    const question = new Question({
      id: 'question-1',
      answers: [
        { "id": "answer-1", "content": "Answer 1", "value": "Answer Value 1" },
        { "id": "answer-2", "content": "Answer 2", "value": "Answer Value 2" }
      ],
      categoryId: 'category-id',
      multiple: false,
      illustration: 'illustration.png'
    }, questionCallbacks)
    question.respond('answer-1')
    question.respond('answer-2')
    expect(question.answersIds).to.have.lengthOf(1)
    expect(question.answersIds[0]).to.eql('answer-2')
  })

  it('respond two times with the same answer and with multiple atrribut to true', () => {
    const question = new Question(questionConfig, questionCallbacks)
    question.respond('answer-1')
    question.respond('answer-1')
    expect(question.answersIds).to.have.lengthOf(1)
    expect(question.answersIds[0]).to.eql('answer-1')
  })

  /********** UNRESPOND METHOD **********/
  it('unRespond correctly remove answer id to answersIds', () => {
    const question = new Question(questionConfig, questionCallbacks)
    question.respond('answer-1')
    question.unRespond('answer-1')
    expect(question.answersIds).to.have.lengthOf(0)
  })

  it('unRespond failed to remove answer id to answersIds', () => {
    const question = new Question(questionConfig, questionCallbacks)
    question.respond('answer-1')
    question.unRespond('answer-3')
    expect(question.answersIds).to.have.lengthOf(1)
  })

  /********** ISANSWERED METHOD **********/
  it('isAnswered return true', () => {
    const question = new Question(questionConfig, questionCallbacks)
    question.respond('answer-1')
    expect(question.isAnswered()).to.be.true
  })

  it('isAnswered return false', () => {
    const question = new Question(questionConfig, questionCallbacks)
    question.respond('answer-3')
    expect(question.isAnswered()).to.be.false
  })
})
