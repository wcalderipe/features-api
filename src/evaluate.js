const {prop} = require('ramda')

const evaluate = (context, features) => {
  let data = {}
  
  features.forEach((feature) => {
    data[feature.name] = check(context, feature.parameters[0])
  })
    
  return data
}

const check = (context, parameter) => {
  const value = prop(parameter.name, context)
  
  return value === parameter.given
}

module.exports = {evaluate}

