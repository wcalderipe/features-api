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
  let featureId, parameterId

  before(async () => {
    await cleanTable(PARAMETERS_TABLE_NAME)
    await cleanTable(FEATURES_TABLE_NAME)

    featureId = await featureRepository(knex).create({
      application_id: 999,
      name: 'feature01'
    })

    parameterId = await parameterRepository(knex).create({
      feature_id: featureId,
      rule_json: JSON.stringify({
        type: 'list',
        name: 'country',
        presentIn: ['br', 'us']
      })
    })
  })

  after(async () => {
    await cleanTable(PARAMETERS_TABLE_NAME)
    await cleanTable(FEATURES_TABLE_NAME)
  })

  describe('findById', () => {
    it('deserializes rule_json after select', async () => {
      const parameter = await repository.findById(parameterId)
      const expectedRule = {
        type: 'list',
        name: 'country',
        presentIn: ['br', 'us']
      }

      expect(parameter.rule).to.deep.equal(expectedRule)
    })
  })

  describe('findByFeatureId', () => {
    it('returns a list of parameters', async () => {
      const parameters = await repository.findByFeatureId(featureId)

      expect(parameters.length).to.equal(1)
    })

    it('deserializes rule_json after select', async () => {
      const [parameter] = await repository.findByFeatureId(featureId)
      const expectedRule = {
        type: 'list',
        name: 'country',
        presentIn: ['br', 'us']
      }

      expect(parameter.rule).to.deep.equal(expectedRule)
    })
  })
})

