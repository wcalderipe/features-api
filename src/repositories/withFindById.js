import {mergeDeepRight} from 'ramda'

const findById = (tableName) => (knex, id) =>
  knex(tableName).where({id}).first()

const withFindById = (knex, tableName) => (object) => mergeDeepRight(object, {
  findById: findById(tableName).bind(null, knex)
})

export {withFindById}

