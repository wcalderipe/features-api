const TABLE_NAME = 'applications'

const applicationRepository = (knex) => ({
  findAll: findAll.bind(null, knex)
})

const findAll = (knex) => knex(TABLE_NAME)

export {applicationRepository}
