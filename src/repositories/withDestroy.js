import {mergeDeepRight} from 'ramda'

const destroy = (tableName) => (knex, id) =>
  knex(tableName).where({id}).del()

const withDestroy = (knex, tableName) => (object) => mergeDeepRight(object, {
  destroy: destroy(tableName).bind(null, knex)
})

export {withDestroy}

