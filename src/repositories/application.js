const TABLE_NAME = 'applications'

const applicationRepository = (knex) => ({
  findAll: findAll.bind(null, knex),
  findById: findById.bind(null, knex)
})

const findAll = (knex) => knex(TABLE_NAME)

const findById = (knex, id) => knex(TABLE_NAME).where({id}).first()

export {applicationRepository}
