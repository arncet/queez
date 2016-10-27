import { expect } from 'chai'

import Answer from '../src/answer'

const answerConfig = {
  id: 'answer-1',
  value: 'Answer value 1',
  content: 'Answer 1',
  illustration: 'illustration.png',
  coefficient: 10
}

describe('answer', () => {
  /********** INSTANTIATION **********/
  it('instantiation without params', () => {
    const answer = new Answer({})
    expect(answer).to.have.property('custom')
    expect(answer.custom).to.eql({})

    expect(answer).to.have.property('id')

    expect(answer).to.have.property('coefficient')
    expect(answer.coefficient).to.eql(1)

    expect(answer).to.have.property('value')
    expect(answer.value).to.eql('')
  })

  it('instantiation with params', () => {
    const answer = new Answer(answerConfig)
    expect(answer).to.have.property('custom')
    expect(answer.custom).to.eql({illustration: 'illustration.png'})

    expect(answer).to.have.property('id')
    expect(answer.id).to.eql('answer-1')

    expect(answer).to.have.property('coefficient')
    expect(answer.coefficient).to.eql(10)

    expect(answer).to.have.property('value')
    expect(answer.value).to.eql('Answer value 1')

    expect(answer).to.have.property('content')
    expect(answer.content).to.eql('Answer 1')
  })
})
