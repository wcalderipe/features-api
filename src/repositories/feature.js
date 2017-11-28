const TABLE_NAME = 'features'

const featureRepository = (knex) => ({
  findAll: findAll.bind(null, knex),
  findById: findById.bind(null, knex)
})

const findAll = (knex) => knex(TABLE_NAME)

const findById = (knex, id) => knex(TABLE_NAME).where({id}).first()

export {featureRepository}
