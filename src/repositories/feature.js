const TABLE_NAME = 'features'

const featureRepository = (knex) => ({
  findAll: findAll.bind(null, knex)
})

const findAll = (knex) => knex(TABLE_NAME)

export {featureRepository}
