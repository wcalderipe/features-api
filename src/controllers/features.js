import {evaluate} from '../evaluate'
import data from '../../data.json'

const get = (req, res) => {
  const context = req.query
  const features = evaluate(context, data.features)

  return res.json({features})
}

export {get}
