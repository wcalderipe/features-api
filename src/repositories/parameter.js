import {pipe, pick, map} from 'ramda'
import {withDestroy} from './withDestroy'

export const TABLE_NAME = 'parameters'

const specificFunctions = (knex) => ({
  findById: findById.bind(null, knex),
  findByFeatureId: findByFeatureId.bind(null, knex),
  create: create.bind(null, knex),
  update: update.bind(null, knex)
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
  ...pick(['id', 'feature_id', 'createdAt'], parameter),
  rule: JSON.parse(parameter.rule_json)
})

const create = async (knex, data) => {
  const parameter = deserialize(data)
  const [id] = await knex(TABLE_NAME).insert(parameter).returning('id')

  return id
}

const update = (knex, id, data) => {
  const parameter = deserialize(data)

  return knex(TABLE_NAME).where({id}).update(parameter)
}

const deserialize = (data) => ({
  ...pick(['feature_id'], data),
  rule_json: JSON.stringify(data.rule)
})

const parameterRepository = (knex) => pipe(
  withDestroy(knex, TABLE_NAME)
)(specificFunctions(knex))

export {parameterRepository}

