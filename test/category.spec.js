import { expect } from 'chai'

import Category from '../src/category'

const categoryConfig = {
  id: 'category-1',
  illustration: 'illustration.png'
}

describe('category', () => {
  /********** INSTANTIATION **********/
  it('instantiation', () => {
    const category = new Category(categoryConfig)
    expect(category).to.have.property('custom')
    expect(category.custom).to.eql({illustration: 'illustration.png'})

    expect(category).to.have.property('id')
    expect(category.id).to.eql('category-1')
  })
})
