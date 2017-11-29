import {NO_CONTENT} from 'http-status'
import {mergeDeepRight} from 'ramda'

const destroy = (repository) => async (req, res) => {
  const {id} = req.params
  await repository.destroy(id)

  return res.status(NO_CONTENT).send()
}

const withDestroy = (repository) => (object) => mergeDeepRight(object, {
  destroy: destroy(repository)
})

export {withDestroy}

