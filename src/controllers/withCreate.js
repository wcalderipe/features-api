import {CREATED} from 'http-status'
import {mergeDeepRight} from 'ramda'

const create = (repository) => async (req, res) => {
  const id = await repository.create(req.body)

  return res.status(CREATED).json({id})
}

const withCreate = (repository) => (object) => mergeDeepRight(object, {
  create: create(repository)
})

export {withCreate}

