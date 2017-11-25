const TABLE_NAME = 'parameters'

const parameterRepository = (knex) => ({
  findAll: findAll.bind(null, knex)
})

const findAll = (knex) => knex(TABLE_NAME)

export {parameterRepository}
