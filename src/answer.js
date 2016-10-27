import { getRandomId, checkType } from './utils'

class Answer {
  constructor(answer) {
    this.custom = {}
    Object.keys(answer).forEach(key => {
      switch (key) {
        case 'id' :
          if (checkType(answer.id, ['integer', 'string'])) {
            this.id = answer.id
          }
          break
        case 'content' :
          if (checkType(answer.content, ['integer', 'string'])) {
            this.content = answer.content
          }
          break
        case 'value' :
          if (checkType(answer.value, ['integer', 'string'])) {
            this.value = answer.value
          }
          break
        case 'coefficient' :
          if (checkType(answer.coefficient, ['integer'])) {
            this.coefficient = answer.coefficient
          }
          break
        default :
          this.custom[key] = answer[key]
          break
      }
    })
    if (!this.id) this.id = getRandomId()
    if (!this.coefficient) this.coefficient = 1
    if (!this.value) this.value = ""
  }

  toPropsLess () {
    return {
      id: this.id,
      content: this.content,
      custom: this.custom
    }
  }
}

export default Answer
