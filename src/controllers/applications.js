import {head} from 'ramda'
import {CREATED} from 'http-status'

const list = (repository) => (req, res) => {
  return repository.findAll()
    .then((applications) => {
      return res.json({applications})
    })
}

const show = (repository) => (req, res) => {
  const {id} = req.params

  return repository.findById(id)
    .then((application) => {
      return res.json({application})
    })
}

const create = (repository) => (req, res) => {
  return repository.create(req.body)
    .then((ids) => {
      const id = head(ids)
      return res.status(CREATED).json({id})
    })
}

export {list, show, create}

