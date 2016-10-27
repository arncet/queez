import get from 'lodash.get'

export const getRandomId = () => Math.random().toString(36).substr(2, 9)

export const checkType = (element, types) => {
  if (element === undefined || element === null) return false
  const result = types.reduce((prev, type) => {
    switch (type) {
      case 'integer':
        return prev || Number.isInteger(element)
      case 'string':
        return prev || typeof element === 'string'
      case 'array':
        return prev || Array.isArray(element)
      case 'object':
        return prev || typeof element === 'object'
      case 'boolean':
        return prev || typeof element === 'boolean'
      default:
        return prev
    }
  }, false)
  return result
}

export const getMaxs = (elements, attribut = '') => {
  if (!elements.length) return null
  return elements.slice(1).reduce((prev, element) => {
    const value = attribut ? get(element, attribut) : element
    const firstResult = attribut ? get(prev[0], attribut) : prev[0]
    if (value > firstResult) return [element]
    else if (value === firstResult) return [...prev, element]
    return prev
  }, [elements[0]])
}
