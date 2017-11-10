import {chain, all, equals, pipe, map, fromPairs} from 'ramda'
import checkers from './checkers'

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
    isAllSatisfied
  )(parameters)
}

const invokeCheck = (context) => (parameter) =>
  checkers[parameter.type].check(parameter, context)

export {evaluate}

