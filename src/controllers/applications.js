const list = (repository) => (req, res) => {
  return repository.findAll()
    .then((applications) => {
      return res.json({applications})
    })
}

export {list}
