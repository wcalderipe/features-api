import {evaluate} from '../evaluate'
import data from '../../data.json'
import {find, propEq} from 'ramda'

const get = (defaultEvaluate = evaluate) => (req, res) => {
  const context = req.query
  const applicationName = context.application
  const application = find(propEq('name', applicationName), data)

  if (!application) {
    return res.status(404).json({
      code: 'ERR_APPLICATION_NOT_FOUND'
    })
  }

  const features = defaultEvaluate(context, application.features)

  return res.json({features})
}

export {get}
