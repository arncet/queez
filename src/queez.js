import Question from './question'
import Result   from './result'
import Category from './category'

import get          from 'lodash.get'
import groupBy      from 'lodash.groupby'

import { checkType, getMaxs } from './utils'

class Queez {
  constructor(config = {}) {
    this.custom = {}
    this.callbacks = {
      onQuestionRespond: [this.checkIfQuizzIsComplete.bind(this)],
      onQuestionUnRespond: [],
      onQuizzComplete: []
    }
    Object.keys(config).forEach(key => {
      switch (key) {
        case 'questions' :
          if (checkType(config.questions, ['array'])) {
            const callbacks = {
              onQuestionRespond: this.onQuestionRespond.bind(this),
              onQuestionUnRespond: this.onQuestionUnRespond.bind(this)
            }
            this.questions = config.questions.map(question => new Question(question, callbacks))
          }
          break
        case 'results' :
          if (checkType(config.results, ['array'])) {
            this.results = config.results.map(result => new Result(result))
          }
          break
        case 'categories' :
          if (checkType(config.categories, ['array'])) {
            this.categories = config.categories.map(category => new Category(category))
          }
          break
        case 'callbacks':
          if (checkType(config.callbacks, ['object'])) {
            Object.keys(config.callbacks).map(event => {
              this.callbacks[event] = [...this.callbacks[event], ...config.callbacks[event]]
            })
          }
          break
        default :
          this.custom[key] = config[key]
          break
      }
    })
    if (!this.questions) this.questions = []
    if (!this.results) this.results = []
    if (!this.categories) this.categories = []
  }

  /******************************** GETTERS ********************************/
  //Question
  getQuestion (questionId) { return this.questions.find(question => question.id === questionId) }

  getQuestionsBy (attribut, value) {
    return this.questions.filter(question => get(question, attribut) === value)
  }

  getQuestionByAnswer (answerId) { return this.questions.find(question => question.getAnswer(answerId)) }

  //Results
  getResult (resultId) { return this.results.find(result => result.id === resultId) }

  getResultsBy (attribut, value) {
    return this.results.filter(result => get(result, attribut) === value)
  }

  //Category
  getCategory (categoryId) { return this.categories.find(category => category.id === categoryId) }

  getCategoriesBy (attribut, value) {
    return this.categories.filter(category => get(category, attribut) === value)
  }

  getMaxCategories () {
    const answeredQuestion = this.questions.filter(question => question.isAnswered())
    const categoriesResult = []

    //For each answered question add the category related to the given answer
    //If the category is already present in the array, increment the count.
    //Else create add this new category
    answeredQuestion.forEach(question => {
      const category = this.getCategory(question.categoryId)
      if (!category) {
        console.error(`No category with id '${question.categoryId}' has been found`)
        return
      }
      const answers = question.answersIds.map(id => question.getAnswer(id))
      answers.forEach(answer => {
        const categoryIndex = categoriesResult.findIndex(cr => cr.id === category.id && cr.value === answer.value)
        if (categoryIndex === -1) {
          categoriesResult.push({ id: category.id, value: answer.value, count: answer.coefficient })
        }
        else {
          categoriesResult[categoryIndex].count = categoriesResult[categoryIndex].count + ( 1 * answer.coefficient )
        }
      })
    })

    //Get higiest categories by their count and extract their value
    const categoriesResultGrouped = groupBy(categoriesResult, 'id')
    const maxsCateogry = {}
    Object.keys(categoriesResultGrouped).forEach(categoryName => {
      const maxs = getMaxs(categoriesResultGrouped[categoryName], 'count')
      if (maxs) maxsCateogry[categoryName] = maxs.map(max => max.value)
    })

    return maxsCateogry
  }

  /******************************** OTHERS ********************************/
  //Queez
  isComplete () { return !this.questions.find(question => !question.isAnswered()) }

  getResponse () {
    if (!this.results.length) return this.questions.reduce((prev, question) => [...prev, question.toPropsLess()], [])

    const maxCategories = this.getMaxCategories()

    //Apply filters on resuluts's quizz
    return this.results.filter(result => applyFilter(result.filter, maxCategories))
  }

  /******************************** CALLBACKS ********************************/

  onQuestionRespond (question, answer, error) {
    this.callbacks.onQuestionRespond.map(callback => {
      if (typeof callback === 'function') callback(question, answer, error)
      else console.error('onQuestionRespond callback is not a function')
    })
  }

  onQuestionUnRespond (question, answer, error) {
    this.callbacks.onQuestionUnRespond.map(callback => {
      if (typeof callback === 'function') callback(question, answer, error)
      else console.error('onQuestionUnRespond callback is not a function')
    })
  }

  onQuizzComplete () {
    this.callbacks.onQuizzComplete.map(callback => {
      if (typeof callback === 'function') callback(this)
      else console.error('onQuizzComplete callback is not a function')
    })
  }

  checkIfQuizzIsComplete () {
    if (this.isComplete()) this.onQuizzComplete()
  }
}

//Apply filters on categories
const applyFilter = (dataFilter, categories) => {
  if (!Object.keys(categories).length) return false
  if (Array.isArray(dataFilter)) {
    return applyFilterArray(dataFilter, categories, applyFilter)
  } else if (typeof dataFilter === 'object') {
    return applyFilterObject(dataFilter, categories, applyFilterValue)
  }
  return false
}

//Apply a filter method (applyFilterMethod) to each category filter (filters)
//And reduce the results with an OR operation
const applyFilterArray = (filters, categories, applyFilterMethod) => {
  return filters.length
    ? filters.map(filter => applyFilterMethod(filter, categories))
             .reduce((prev, current) => current || prev)
    : false
}

//Apply a filter method (applyFilterMethod) to each data's keys
//And reduce the results with an AND operation
const applyFilterObject = (data, categories, applyFilterMethod) => {
  const keys = Object.keys(data)
  return keys.length
    ? keys.map(key => applyFilterMethod(data, key, categories))
          .reduce((prev, current) => current && prev)
    : false
}

//Apply a filter method to a category value
//(eg: '"sexe": "femme"'
//  or '"couleur": ["rouge", "bleu"]'
//  or '"attribut": {"agilite": true, "vitesse": true}')
//
//1. If the category value is and string or number, (eg: '"sexe": "femme"')
//   just check category array contain it
//2. Else if the category value is an array (eg: '"couleur": ["rouge", "bleu"]')
//      A) And the current array element is an object (eg: '"couleur": [{"rouge": false, "bleu": true}]')
//          A') And if the current object value is 'true', check category array contain it
//          B') And if the current object value is 'false', check category array doest contain it
//      B) And the current array element is an string or a number (like 1. case)
//         just check category array contain it
//3. Else if the category value is an object (eg: '"attribut": {"agilite": true, "vitesse": true}')
//      A) And if the current object value is 'true', check category array contain it (like 2AA' case)
//      B) And if the current object value is 'false', check category array doest contain it (like 2AB' case)
//
const applyFilterValue = (filter, categoryName, categories) => {
  const categoryValue = filter[categoryName]
  const category = categories[categoryName]
  if (!category) return false

  if (['string', 'number'].includes(typeof categoryValue)) {
    return category.includes(categoryValue)
  }
  else if (Array.isArray(categoryValue)) {
    return applyFilterArray(categoryValue, categories, thisFilter => {
      if (typeof thisFilter === 'object') {
        return applyFilterObject(thisFilter, categories, (data, key) => {
          return data[key]
            ? category.includes(key)
            : !category.includes(key)
        })
      } else if (['string', 'number'].includes(typeof thisFilter)) {
        return category.includes(thisFilter)
      }
      return false
    })
  } else if (typeof categoryValue === 'object') {
    return applyFilterObject(categoryValue, categories, (data, key) => {
      return data[key]
        ? category.includes(key)
        : !category.includes(key)
    })
  }
  return false
}

export default Queez
