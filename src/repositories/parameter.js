import {pipe, pick, map} from 'ramda'
import {withFindAll} from './withFindAll'
import {withCreate} from './withCreate'
import {withUpdate} from './withUpdate'
import {withDestroy} from './withDestroy'

export const TABLE_NAME = 'parameters'

const specificFunctions = (knex) => ({
  findById: findById.bind(null, knex),
  findByFeatureId: findByFeatureId.bind(null, knex)
})

const findByFeatureId = async (knex, featureId) => {
  const parameters = await knex(TABLE_NAME).where({feature_id: featureId})

  return map(serialize, parameters)
}

const findById = async (knex, id) => {
  const parameter = await knex(TABLE_NAME).where({id}).first()

  return serialize(parameter)
}

const serialize = (parameter) => ({
  ...pick(['id', 'feature_id', 'created_at'], parameter),
  rule: JSON.parse(parameter.rule_json)
})

const parameterRepository = (knex) => pipe(
  withFindAll(knex, TABLE_NAME),
  withCreate(knex, TABLE_NAME),
  withUpdate(knex, TABLE_NAME),
  withDestroy(knex, TABLE_NAME)
)(specificFunctions(knex))

export {parameterRepository}

