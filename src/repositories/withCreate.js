import {mergeDeepRight} from 'ramda'

const create = (tableName) => async (knex, data) => {
  const [id] = await knex(tableName).insert(data).returning('id')

  return id
}

const withCreate = (knex, tableName) => (object) => mergeDeepRight(object, {
  create: create(tableName).bind(null, knex)
})

export {withCreate}

