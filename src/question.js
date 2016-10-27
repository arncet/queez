import { getRandomId, checkType } from './utils'
import Answer from './answer'
import get from 'lodash.get'

class Question {
  constructor(question = {}, callbacks = {}) {
    this.custom = {}
    this.answersIds = []
    Object.keys(question).forEach(key => {
      switch (key) {
        case 'id' :
          if (checkType(question.id, ['integer', 'string'])) {
            this.id = question.id
          }
          break
        case 'answers' :
          if (checkType(question.answers, ['array'])) {
            this.answers = question.answers.map(answer => new Answer(answer))
          }
          break
        case 'content' :
          if (checkType(question.content, ['integer', 'string'])) {
            this.content = question.content
          }
          break
        case 'categoryId' :
          if (checkType(question.categoryId, ['integer', 'string'])) {
            this.categoryId = question.categoryId
          }
          break
        case 'multiple' :
          if (checkType(question.multiple, ['boolean'])) {
            this.multiple = question.multiple
          }
          break
        default :
          this.custom[key] = question[key]
          break
      }
    })
    if (!this.id) this.id = getRandomId()
    if (!this.answers) this.answers = []
    if (!this.categoryId) this.categoryId = ""
    if (!this.multiple) this.multiple = false
    this.callbacks = Object.keys(callbacks).reduce((prev, event) => ({...prev, [event]: callbacks[event]}), {})
  }

  /******************************** GETTERS ********************************/
  //Answer
  getAnswer (answerId) { return this.answers.find(answer => answer.id === answerId) }

  getAnswersBy (attribut, value) {
    return this.answers.filter(answer => get(answer, attribut) === value)
  }

  isAnswered () { return !!this.answersIds.length }

  /******************************** ACTIONS ********************************/
  //Question
  respond (answerId) {
    let error = null
    if (this.answers.find(answer => answer.id === answerId)) {
      if (this.multiple) {
        if (!this.answersIds.includes(answerId)) this.answersIds.push(answerId)
        else return
      }
      else this.answersIds = [answerId]
    } else {
      error = `Cannot find answer with id ${answerId}.`
      console.error(error)
    }
    this.callbacks.onQuestionRespond(this, this.getAnswer(answerId), error)
  }

  unRespond (answerId) {
    let error = null
    const answerIndex = this.answersIds.indexOf(answerId)
    if (answerIndex !== -1) {
      this.answersIds = [
        ...this.answersIds.slice(0, answerIndex),
        ...this.answersIds.slice(answerIndex + 1)
      ]
    } else {
      error = `Cannot find the answer with id ${answerId} in question's (${this.id}) answered answers`
      console.error(error)
    }
    this.callbacks.onQuestionUnRespond(this, this.getAnswer(answerId), error)
  }

  toPropsLess () {
    return {
      id: this.id,
      content: this.content,
      custom: this.custom,
      answers: this.answersIds.map(answerId => {
        return this.getAnswer(answerId).toPropsLess()
      })
    }
  }
}

export default Question
