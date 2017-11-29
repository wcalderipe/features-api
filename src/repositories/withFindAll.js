import {mergeDeepRight} from 'ramda'

const findAll = (tableName) => (knex) => knex(tableName)

const withFindAll = (knex, tableName) => (object) => mergeDeepRight(object, {
  findAll: findAll(tableName).bind(null, knex)
})

export {withFindAll}
