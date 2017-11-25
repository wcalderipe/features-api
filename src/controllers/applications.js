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

export {list, show}
