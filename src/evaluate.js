const {prop, propEq, chain, all, equals, pipe, map, fromPairs} = require('ramda')

const evaluate = (context, features) => {
  const toNameAndValue = ({name, parameters}) => [name, checkAll(context, parameters)]

  return pipe(
    map(toNameAndValue),
    fromPairs
  )(features)
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

