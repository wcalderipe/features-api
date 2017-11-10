import {propEq} from 'ramda'

const check = (parameter, context) => {
  const {name, given} = parameter
  const isSatisfied = propEq(name, given)

  return isSatisfied(context)
}

export default {check}
