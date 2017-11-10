import {prop, propEq} from 'ramda'

const check = (parameter, context) => {
  const {name, given} = parameter
  const value = prop(name, context)
  const isSatisfied = propEq(name, given)

  return isSatisfied(context)
}

export default {check}
