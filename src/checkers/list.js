import {prop, indexOf} from 'ramda'

const check = (parameter, context) => {
  const {name, presentIn} = parameter
  const value = prop(name, context)
  const isPresent = indexOf(value, presentIn) !== -1

  return isPresent 
}

export default {check}
