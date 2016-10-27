import { expect } from 'chai'

import {checkType, getMaxs} from '../src/utils'

describe('utils', () => {
  /********** CHECKTYPE METHOD **********/
  it('checkType return true', () => {
    expect(checkType(0, ['integer'])).to.be.true
    expect(checkType(0, ['integer', 'string'])).to.be.true

    expect(checkType(973, ['integer'])).to.be.true
    expect(checkType(973, ['integer', 'string'])).to.be.true

    expect(checkType('', ['string'])).to.be.true
    expect(checkType('', ['integer', 'string'])).to.be.true

    expect(checkType('test', ['string'])).to.be.true
    expect(checkType('test', ['integer', 'string'])).to.be.true

    expect(checkType([], ['array'])).to.be.true
    expect(checkType([], ['integer', 'array'])).to.be.true

    expect(checkType([1, 2], ['array'])).to.be.true
    expect(checkType([1, 2], ['integer', 'array'])).to.be.true

    expect(checkType({}, ['object'])).to.be.true
    expect(checkType({}, ['integer', 'object'])).to.be.true

    expect(checkType({a: 1, b:2}, ['object'])).to.be.true
    expect(checkType({a: 1, b:2}, ['integer', 'object'])).to.be.true

    expect(checkType(true, ['boolean'])).to.be.true
    expect(checkType(true, ['integer', 'boolean'])).to.be.true

    expect(checkType(false, ['boolean'])).to.be.true
    expect(checkType(false, ['integer', 'boolean'])).to.be.true
  })

  it('checkType return false', () => {
    expect(checkType(0, [])).to.be.false

    expect(checkType(0, ['string'])).to.be.false

    expect(checkType(null, ['string'])).to.be.false

    expect(checkType(undefined, ['string'])).to.be.false
  })

  /********** GETMAXS METHOD **********/
  it('getMaxs with a single max value and without attribut', () => {
    const max = getMaxs([1, 2, 3])
    expect(max).to.have.lengthOf(1)
    expect(max).to.eql([3])
  })

  it('getMaxs with a multiple max value and without attribut', () => {
    const max = getMaxs([3, 1, 2, 3])
    expect(max).to.have.lengthOf(2)
    expect(max).to.eql([3, 3])
  })

  it('getMaxs with a single max value and attribut', () => {
    const max = getMaxs([
      {a: 1, b: 2},
      {a: 1, b: 3},
      {a: 3, b: 2}
    ], 'b')
    expect(max).to.have.lengthOf(1)
    expect(max).to.eql([{a: 1, b: 3}])
  })

  it('getMaxs with a multiple max value and attribut', () => {
    const max = getMaxs([
      {a: 1, b: 3},
      {a: 1, b: 3},
      {a: 3, b: 2}
    ], 'b')
    expect(max).to.have.lengthOf(2)
    expect(max).to.eql([{a: 1, b: 3}, {a: 1, b: 3}])
  })

  it('getMaxs with a single max value and deep attribut', () => {
    const max = getMaxs([
      {a: 1, b: {a: 1, b: 2}},
      {a: 1, b: {a: 4, b: 0}},
      {a: 3, b: {a: 1, b: 5}}
    ], ['b', 'a'])
    expect(max).to.have.lengthOf(1)
    expect(max).to.eql([{a: 1, b: {a: 4, b: 0}}])
  })

  it('getMaxs with a multiple max value and deep attribut', () => {
    const max = getMaxs([
      {a: 1, b: {a: 1, b: 2}},
      {a: 1, b: {a: 4, b: 0}},
      {a: 3, b: {a: 4, b: 5}}
    ], ['b', 'a'])
    expect(max).to.have.lengthOf(2)
    expect(max).to.eql([{a: 1, b: {a: 4, b: 0}}, {a: 3, b: {a: 4, b: 5}}])
  })
})
