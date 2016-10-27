import { expect } from 'chai'

import Queez from '../src/queez'
import Question from '../src/question'
import Result from '../src/result'
import Category from '../src/category'
import queezConfigSuperHero from '../example/quizz-config-super-hero'
import queezConfigSurvey from '../example/quizz-config-survey'

describe('queez', () => {
  /********** INSTANTIATION **********/
  it('instantiation without params', () => {
    const queez = new Queez({})
    expect(queez).to.have.property('custom')
    expect(queez.custom).to.eql({})

    expect(queez).to.have.property('questions')
    expect(queez.questions).to.eql([])

    expect(queez).to.have.property('results')
    expect(queez.results).to.eql([])

    expect(queez).to.have.property('categories')
    expect(queez.categories).to.eql([])

    expect(queez).to.have.property('callbacks')

    expect(queez.isComplete()).to.be.true

    expect(queez.getResponse()).to.eql([])
  })

  it('instantiation with params', () => {
    const queez = new Queez(queezConfigSuperHero)
    expect(queez).to.have.property('custom')
    expect(queez.custom).to.eql({title: 'Super hero quizz'})

    expect(queez).to.have.property('questions')
    expect(queez.questions).to.have.lengthOf(3)
    expect(queez.questions[0]).to.be.an.instanceof(Question)

    expect(queez).to.have.property('results')
    expect(queez.results).to.have.lengthOf(10)
    expect(queez.results[0]).to.be.an.instanceof(Result)

    expect(queez).to.have.property('categories')
    expect(queez.categories).to.have.lengthOf(3)
    expect(queez.categories[0]).to.be.an.instanceof(Category)

    expect(queez).to.have.property('callbacks')

    expect(queez.isComplete()).to.be.false

    expect(queez.getResponse()).to.eql([])
  })

  /********** GETQUESTION METHOD **********/
  it('getQuestion return good question', () => {
    const queez = new Queez(queezConfigSuperHero)
    const question = queez.getQuestion('question-sexe')
    expect(question).to.not.be.undefined
    expect(question).to.be.an.instanceof(Question)
    expect(question.content).to.equal('You are a man or a woman ?')
  })

  it('getQuestion return nothing', () => {
    const queez = new Queez(queezConfigSuperHero)
    const question = queez.getQuestion('wrong-question-id')
    expect(question).to.be.undefined
  })

  /********** GETQUESTIONBY METHOD **********/
  it('getQuestionsBy return good question array', () => {
    const queez = new Queez(queezConfigSuperHero)
    const questions = queez.getQuestionsBy('categoryId', 'color')
    expect(questions).to.have.lengthOf(1)
    expect(questions[0]).to.be.an.instanceof(Question)
    expect(questions[0].id).to.equal('question-color')
  })

  it('getQuestionsBy return empty array', () => {
    const queez = new Queez(queezConfigSuperHero)
    const questions = queez.getQuestionsBy('categoryId', 'wrong-category')
    expect(questions).to.have.lengthOf(0)
  })

  /********** GETQUESTIONBYANSWER METHOD **********/
  it('getQuestionByAnswer return good question', () => {
    const queez = new Queez(queezConfigSuperHero)
    const question = queez.getQuestionByAnswer('answer-attribute-3')
    expect(question).to.not.be.undefined
    expect(question).to.be.an.instanceof(Question)
    expect(question.content).to.equal('What attribute you would like to have ?')
  })

  it('getQuestionByAnswer return nothing', () => {
    const queez = new Queez(queezConfigSuperHero)
    const question = queez.getQuestionByAnswer('wrong-answer-id')
    expect(question).to.be.undefined
  })

  /********** GETRESULT METHOD **********/
  it('getResult return good result', () => {
    const queez = new Queez(queezConfigSuperHero)
    const result = queez.getResult('result-5')
    expect(result).to.not.be.undefined
    expect(result).to.be.an.instanceof(Result)
    expect(result.content).to.equal('Wonder Woman')
  })

  it('getResult return nothing', () => {
    const queez = new Queez(queezConfigSuperHero)
    const result = queez.getResult('wrong-result-id')
    expect(result).to.be.undefined
  })

  /********** GETRESULTSBY METHOD **********/
  it('getResultsBy return good result array', () => {
    const queez = new Queez(queezConfigSuperHero)
    const results = queez.getResultsBy('content', 'Spider-man')
    expect(results).to.have.lengthOf(1)
    expect(results[0]).to.be.an.instanceof(Result)
    expect(results[0].id).to.equal('result-6')
  })

  it('getResultsBy return empty array', () => {
    const queez = new Queez(queezConfigSuperHero)
    const results = queez.getResultsBy('content', 'Captain America')
    expect(results).to.have.lengthOf(0)
  })

  /********** GETCATEGORY METHOD **********/
  it('getCategory return good category', () => {
    const queez = new Queez(queezConfigSuperHero)
    const category = queez.getCategory('sexe')
    expect(category).to.not.be.undefined
    expect(category).to.be.an.instanceof(Category)
    expect(category.id).to.equal('sexe')
  })

  it('getCategory return nothing', () => {
    const queez = new Queez(queezConfigSuperHero)
    const category = queez.getCategory('wrong-category-id')
    expect(category).to.be.undefined
  })

  /********** GETCATEGORIESBY METHOD **********/
  it('getCategoriesBy return good category array', () => {
    const queez = new Queez(queezConfigSuperHero)
    const categories = queez.getCategoriesBy(['custom', 'title'], 'Color')
    expect(categories).to.have.lengthOf(1)
    expect(categories[0]).to.be.an.instanceof(Category)
    expect(categories[0].id).to.equal('color')
  })

  it('getCategoriesBy return empty array', () => {
    const queez = new Queez(queezConfigSuperHero)
    const categories = queez.getCategoriesBy(['custom', 'title'], 'Age')
    expect(categories).to.have.lengthOf(0)
  })

  /********** ISCOMPLETE METHOD **********/
  it('isComplete return true', () => {
    const queez = new Queez(queezConfigSuperHero)
    queez.questions[0].respond('answer-sexe-1')
    queez.questions[1].respond('answer-color-1')
    queez.questions[2].respond('answer-attribute-1')
    expect(queez.isComplete()).to.be.true
  })

  /********** GETRESPONSE METHOD **********/
  it('1. getResponse return empty array (no questions answered)', () => {
    const queez = new Queez(queezConfigSuperHero)
    expect(queez.getResponse()).to.eql([])
  })

  it('1.1. getResponse return empty array (one question answered)', () => {
    const queez = new Queez(queezConfigSuperHero)
    queez.questions[0].respond('answer-sexe-2')
    expect(queez.getResponse()).to.eql([])
  })

  it('2. getResponse (sexe: Man, color: Red, attribute: Strength => Iron-man)', () => {
    const queez = new Queez(queezConfigSuperHero)
    queez.questions[0].respond('answer-sexe-1')
    queez.questions[1].respond('answer-color-1')
    queez.questions[2].respond('answer-attribute-1')
    const response = queez.getResponse()
    expect(response).to.have.lengthOf(1)
    expect(response[0]).to.be.an.instanceof(Result)
    expect(response[0].content).to.eql('Iron-man')
  })

  it('3. getResponse (sexe: Man, color: Red && Blue, attribute: Strength => Superman && Iron-man)', () => {
    const queez = new Queez(queezConfigSuperHero)
    queez.questions[0].respond('answer-sexe-1')
    queez.questions[1].respond('answer-color-1')
    queez.questions[1].respond('answer-color-2')
    queez.questions[2].respond('answer-attribute-1')
    const response = queez.getResponse()
    expect(response).to.have.lengthOf(2)
    expect(response[0].content).to.eql('Superman')
    expect(response[1].content).to.eql('Iron-man')
  })

  it('3.1. getResponse (same as 4. but re-respond to sexe: Woman) => Wonder Woman', () => {
    const queez = new Queez(queezConfigSuperHero)
    queez.questions[0].respond('answer-sexe-1')
    queez.questions[1].respond('answer-color-1')
    queez.questions[1].respond('answer-color-2')
    queez.questions[2].respond('answer-attribute-1')
    queez.questions[0].respond('answer-sexe-2')
    const response = queez.getResponse()
    expect(response).to.have.lengthOf(1)
    expect(response[0].content).to.eql('Wonder Woman')
  })

  it('4. getResponse (sexe: Man, color: Black, attribute: Agility => Batman)', () => {
    const queez = new Queez(queezConfigSuperHero)
    queez.questions[0].respond('answer-sexe-1')
    queez.questions[1].respond('answer-color-3')
    queez.questions[2].respond('answer-attribute-3')
    const response = queez.getResponse()
    expect(response).to.have.lengthOf(1)
    expect(response[0].content).to.eql('Batman')
  })

  it('4.1 getResponse (sexe: Man, color: Black, attribute: Agility => Batman)', () => {
    const queez = new Queez(queezConfigSuperHero)
    queez.questions[0].respond('answer-sexe-1')
    queez.questions[1].respond('answer-color-3')
    queez.questions[2].respond('answer-attribute-1')
    const response = queez.getResponse()
    expect(response).to.have.lengthOf(1)
    expect(response[0].content).to.eql('Batman')
  })

  it('5 getResponse (survey)', () => {
    const queezConfig = {...queezConfigSurvey, callbacks: {}}
    const queez = new Queez(queezConfig)
    queez.questions[0].respond('c-answer-1')
    queez.questions[1].respond('f-answer-2')
    queez.questions[2].respond('c-b-answer-4')
    queez.questions[3].respond('os-answer-3')
    const response = queez.getResponse()
    expect(response).to.have.lengthOf(4)

    expect(response[0].id).to.eql('favorite-color')
    expect(response[0].answers[0].content).to.eql('Vert')

    expect(response[1].id).to.eql('favorite-food')
    expect(response[1].answers[0].content).to.eql('Salade')

    expect(response[2].id).to.eql('favorite-car-brand')
    expect(response[2].answers[0].content).to.eql('Chevrolet')

    expect(response[3].id).to.eql('favorite-os')
    expect(response[3].answers[0].content).to.eql('Linux')
  })
})
