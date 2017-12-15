import {pipe} from 'ramda'
import {withFindById} from './withFindById'
import {withCreate} from './withCreate'
import {withUpdate} from './withUpdate'
import {withDestroy} from './withDestroy'

export const TABLE_NAME = 'features'

const specificFunctions = (knex) => ({
  findByApplicationId: findByApplicationId.bind(null, knex)
})

const findByApplicationId = (knex, applicationId) =>
  knex(TABLE_NAME).where({applicationId: applicationId})

const featureRepository = (knex) => pipe(
  withFindById(knex, TABLE_NAME),
  withCreate(knex, TABLE_NAME),
  withUpdate(knex, TABLE_NAME),
  withDestroy(knex, TABLE_NAME)
)(specificFunctions(knex))

export {featureRepository}

