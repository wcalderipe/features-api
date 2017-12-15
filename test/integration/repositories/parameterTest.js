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
      applicationId: 999,
      name: 'feature01'
    })

    parameterId = await parameterRepository(knex).create({
      featureId: featureId,
      rule: {
        type: 'list',
        name: 'country',
        presentIn: ['br', 'us']
      }
    })
  })

  after(async () => {
    await cleanTable(PARAMETERS_TABLE_NAME)
    await cleanTable(FEATURES_TABLE_NAME)
  })

  describe('findById', () => {
    it('deserializes ruleJson after select', async () => {
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

    it('deserializes ruleJson after select', async () => {
      const [parameter] = await repository.findByFeatureId(featureId)
      const expectedRule = {
        type: 'list',
        name: 'country',
        presentIn: ['br', 'us']
      }

      expect(parameter.rule).to.deep.equal(expectedRule)
    })
  })

  describe('create', () => {
    it('creates a new parameter and returns the id', async () => {
      const data = {
        featureId: featureId,
        rule: {
          type: 'list',
          name: 'country',
          presentIn: ['br', 'us']
        }
      }
      const id = await repository.create(data)

      expect(id).to.be.an('number')
    })
  })

  describe('update', () => {
    it('updates parameter and returns number of affected rows', async () => {
      const affectedRows = await repository.update(parameterId, {
        rule: {
          update: 'myRule'
        }
      })

      expect(affectedRows).to.equal(1)
    })
  })
})

