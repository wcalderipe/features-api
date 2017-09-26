const {prop, propEq, chain, all, equals, pipe} = require('ramda')

const evaluate = (context, features) => {
  let data = {}
  
  features.forEach((feature) => {
   data[feature.name] = checkAll(context, feature.parameters) 
  })

  return data
}

const checkAll = (context, parameters) => {
  const checkedParameters = chain(check(context))
  const isAllSatisfied = all(equals(true))

  return pipe(
    checkedParameters,
    isAllSatisfied
  )(parameters)
}

const check = (context) => (parameter) => {
  const {name, given} = parameter
  const value = prop(name, context)
  const isSatisfied = propEq(name, given)

  return isSatisfied(context)
}

module.exports = {evaluate}

