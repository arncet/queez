import { getRandomId, checkType } from './utils'

class Category {
  constructor(category) {
    if (!category.id) throw 'An id is required for each category'
    this.custom = {}
    Object.keys(category).forEach(key => {
      switch (key) {
        case 'id' :
          if (checkType(category.id, ['integer', 'string'])) {
            this.id = category.id
          }
          break
        default :
          this.custom[key] = category[key]
          break
      }
    })
    if (!this.id) this.id = getRandomId()
  }
}

export default Category
