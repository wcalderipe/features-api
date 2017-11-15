import {find, propEq} from 'ramda'
import {NOT_FOUND} from 'http-status'
import {evaluate as defaultEvaluate} from '../evaluate'
import data from '../../data.json'

const get = (evaluate = defaultEvaluate) => (req, res) => {
  const context = req.query
  const applicationName = context.application
  const application = find(propEq('name', applicationName), data)

  if (!application) {
    return res.status(NOT_FOUND).json({
      code: 'ERR_APPLICATION_NOT_FOUND'
    })
  }

  const toggles = evaluate(context, application.features)

  return res.json({toggles})
}

export {get}
