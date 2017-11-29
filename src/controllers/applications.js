import {CREATED, NO_CONTENT} from 'http-status'

const list = (repository) => async (req, res) => {
  const applications = await repository.findAll()

  return res.json(applications)
}

const show = (repository) => async (req, res) => {
  const {id} = req.params
  const application = await repository.findById(id)

  return res.json(application)
}

const create = (repository) => async (req, res) => {
  const id = await repository.create(req.body)

  return res.status(CREATED).json({id})
}

const update = (repository) => async (req, res) => {
  const {id} = req.params
  const payload = req.body

  await repository.update(id, payload)
  const application = await repository.findById(id)

  return res.json(application)
}

const destroy = (repository) => async (req, res) => {
  const {id} = req.params
  await repository.destroy(id)

  return res.status(NO_CONTENT).send()
}

export {list, show, create, update, destroy}

