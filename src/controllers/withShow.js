import {mergeDeepRight} from 'ramda'

const show = (repository) => async (req, res) => {
  const {id} = req.params
  const entity = await repository.findById(id)

  return res.json(entity)
}

const withShow = (repository) => (object) => mergeDeepRight(object, {
  show: show(repository)
})

export {withShow}

