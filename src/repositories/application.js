import {pipe} from 'ramda'
import {
  withFindAll,
  withFindById,
  withCreate,
  withUpdate,
  withDestroy
} from './composition'

const TABLE_NAME = 'applications'

const applicationRepository = (knex) => pipe(
  withFindAll(knex, TABLE_NAME),
  withFindById(knex, TABLE_NAME),
  withCreate(knex, TABLE_NAME),
  withUpdate(knex, TABLE_NAME),
  withDestroy(knex, TABLE_NAME)
)({})

export {applicationRepository}

