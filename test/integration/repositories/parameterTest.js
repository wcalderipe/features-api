import {expect, createKnex, cleanTable} from '../../testSetup'
import {
  featureRepository,
  TABLE_NAME as FEATURES_TABLE_NAME
} from '../../../src/repositories/feature'
import {
  parameterRepository,
  TABLE_NAME as PARAMETERS_TABLE_NAME
} from '../../../src/repositories/parameter'

const knex = createKnex()
const repository = parameterRepository(knex)

describe('repository parameter', () => {
  let featureId

  before(async () => {
    await cleanTable(PARAMETERS_TABLE_NAME)
    await cleanTable(FEATURES_TABLE_NAME)

    featureId = await featureRepository(knex).create({
      application_id: 999,
      name: 'feature01'
    })

    await parameterRepository(knex).create({
      feature_id: featureId,
      rule_json: '{}'
    })
  })

  after(async () => {
    await cleanTable(PARAMETERS_TABLE_NAME)
    await cleanTable(FEATURES_TABLE_NAME)
  })

  it('findByFeatureId', async () => {
    const features = await repository.findByFeatureId(featureId)

    expect(features.length).to.equal(1)
  })
})

