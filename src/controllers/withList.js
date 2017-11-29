import {mergeDeepRight} from 'ramda'

const list = (repository) => async (req, res) => {
  const entities = await repository.findAll()

  return res.json(entities)
}

const withList = (repository) => (object) => mergeDeepRight(object, {
  list: list(repository)
})

export {withList}

