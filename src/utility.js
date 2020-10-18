
export const checkValidity = (value, rules) => {
  console.log('checking validity')
  let isValid = true
  if (!rules) {
      return true
  }
  //should not be empty
  if (rules.required) {
      isValid = value.trim() !== '' && isValid
  }
  if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid
  }
  if(rules.alphabeticOnly){
    const pattern = /^[a-zA-Z\s]*$/
    isValid = pattern.test(value) && isValid
  }
  if (rules.isEmail) {
      const pattern = /^[a-zA-Z0-9][a-zA-Z0-9-_.]+@([a-zA-Z]|[a-zA-Z0-9]?[a-zA-Z0-9-]+[a-zA-Z0-9])\.[a-zA-Z0-9]{2,10}(?:\.[a-zA-Z]{2,10})?$/
      isValid = pattern.test(value) && isValid
  }
  return isValid
}


export const checkMatch = (value, valueToCompare) => {
  if (value===valueToCompare) return true
  else return false
}
