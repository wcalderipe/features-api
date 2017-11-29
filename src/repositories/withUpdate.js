import {mergeDeepRight} from 'ramda'

const update = (tableName) => (knex, id, data) =>
  knex(tableName).where({id}).update(data)

const withUpdate = (knex, tableName) => (object) => mergeDeepRight(object, {
  update: update(tableName).bind(null, knex)
})

export {withUpdate}

