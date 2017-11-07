import {prop, propEq, chain, all, equals, pipe, map, fromPairs} from 'ramda'

const evaluate = (context, features) => {
  const toNameAndValue = ({name, parameters}) => [name, checkAll(context, parameters)]

  return pipe(
    map(toNameAndValue),
    fromPairs
  )(features)
}

const checkAll = (context, parameters) => {
  const checkedParameters = chain(invokeCheck(context))
  const isAllSatisfied = all(equals(true))

  return pipe(
    checkedParameters,
    (args) => {
      console.log(args)
      return args
    },
    isAllSatisfied
  )(parameters)
}

const invokeCheck = (context) => (parameter) => checkers[parameter.type](parameter)

const checkers = {
  string: (parameter) => {
    const {name, given} = parameter
    const value = prop(name, context)
    const isSatisfied = propEq(name, given)

    return isSatisfied(context)
  },
  list: (parameter) => {
    return true
  }
}

const check = (context) => (parameter) => {
  const {name, given} = parameter
  const value = prop(name, context)
  const isSatisfied = propEq(name, given)

  return isSatisfied(context)
}

export {evaluate}

