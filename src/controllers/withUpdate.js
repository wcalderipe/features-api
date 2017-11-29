import {mergeDeepRight} from 'ramda'

const update = (repository) => async (req, res) => {
  const {id} = req.params
  const payload = req.body

  await repository.update(id, payload)
  const entity = await repository.findById(id)

  return res.json(entity)
}

const withUpdate = (repository) => (object) => mergeDeepRight(object, {
  update: update(repository)
})

export {withUpdate}

