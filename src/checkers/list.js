import {prop} from 'ramda'

const check = (parameter, context) => {
  const {name, presentIn} = parameter
  const value = prop(name, context)
  const isPresent = presentIn.includes(value)

  return isPresent 
}

export default {check}
