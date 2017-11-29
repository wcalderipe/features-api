import {pipe} from 'ramda'
import {withFindAll} from './withFindAll'
import {withFindById} from './withFindById'

const TABLE_NAME = 'features'

const featureRepository = (knex) => pipe(
  withFindAll(knex, TABLE_NAME),
  withFindById(knex, TABLE_NAME)
)({})

export {featureRepository}
