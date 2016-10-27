import { checkType, getRandomId } from './utils'

class Result {
  constructor(result) {
    this.custom = {}
    Object.keys(result).forEach(key => {
      switch (key) {
        case 'id' :
          if (checkType(result.id, ['integer', 'string'])) {
            this.id = result.id
          }
          break
        case 'filter' :
          if (checkType(result.filter, ['object', 'array'])) {
            this.filter = result.filter
          }
          break
        case 'content' :
          if (checkType(result.content, ['integer', 'string'])) {
            this.content = result.content
          }
          break
        default :
          this.custom[key] = result[key]
          break
      }
    })
    if (!this.id) this.id = getRandomId()
    if (!this.filter) this.filter = {}
  }
}

export default Result
