import {evaluate} from '../evaluate'
import data from '../../data.json'

const get = (defaultEvaluate = evaluate) => (req, res) => {
  const context = req.query
  const features = defaultEvaluate(context, data.features)

  return res.json({features})
}

export {get}
