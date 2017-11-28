import {pipe} from 'ramda'
import {withFindAll, withFindById} from './composition'

const TABLE_NAME = 'features'

const featureRepository = (knex) => pipe(
  withFindAll(knex, TABLE_NAME),
  withFindById(knex, TABLE_NAME)
)({})

export {featureRepository}
