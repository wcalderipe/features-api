const {evaluate} = require('evaluate')
const data = require('../../data.json')

const get = (req, res) => {
  const context = req.query
  const features = evaluate(context, data.features)

  return res.json({features})
}

module.exports = {get}
