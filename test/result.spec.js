import { expect } from 'chai'

import Result from '../src/result'

const resultConfig = {
  id: 'result-1',
  filter: {filter1: 'filter-1-value', filter2: 'filter-2-value'},
  content: 'Result 1',
  illustration: 'illustration.png'
}

describe('result', () => {
  /********** INSTANTIATION **********/
  it('instantiation without params', () => {
    const result = new Result({})
    expect(result).to.have.property('custom')
    expect(result.custom).to.eql({})

    expect(result).to.have.property('id')

    expect(result).to.have.property('filter')
    expect(result.filter).to.eql({})
  })

  it('instantiation with params', () => {
    const result = new Result(resultConfig)
    expect(result).to.have.property('custom')
    expect(result.custom).to.eql({illustration: 'illustration.png'})

    expect(result).to.have.property('id')
    expect(result.id).to.eql('result-1')

    expect(result).to.have.property('filter')
    expect(result.filter).to.eql({filter1: 'filter-1-value', filter2: 'filter-2-value'})

    expect(result).to.have.property('content')
    expect(result.content).to.eql('Result 1')
  })
})
