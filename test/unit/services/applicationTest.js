import td from 'testdouble'
import {expect} from '../../testSetup'
import {applicationService} from '../../../src/services/application'

describe('services application', () => {
  it('returns application document with feeatures and parameters', async () => {
    const fakeApplicationRepository = {
      findById: td.function()
    }
    const fakeFeatureRepository = {
      findByApplicationId: td.function()
    }
    const fakeParamaterRepository = {
      findByFeatureId: td.function()
    }

    td.when(fakeApplicationRepository.findById(99))
      .thenResolve({name: 'SomeApp'})
    td.when(fakeFeatureRepository.findByApplicationId(99))
      .thenResolve([
        {id: 1, name: 'coolFeature'},
        {id: 2, name: 'callNewAPI'}
      ])
    td.when(fakeParamaterRepository.findByFeatureId(1))
      .thenResolve([
        {
          rule_json: JSON.stringify({
            type: 'string',
            name: 'tripType',
            given: 'oneway'
          })
        }
      ])
    td.when(fakeParamaterRepository.findByFeatureId(2))
      .thenResolve([
        {
          rule_json: JSON.stringify({
            type: 'list',
            name: 'country',
            presentIn: ['cl', 'br', 'ar']
          })
        }
      ])

    const fakeRepositories = {
      applicationRepository: fakeApplicationRepository,
      featureRepository: fakeFeatureRepository,
      parameterRepository: fakeParamaterRepository
    }

    const document = await applicationService(fakeRepositories)
      .createDocumentById(99)

    const expecedDocument = {
      name: 'SomeApp',
      features: [
        {
          name: 'coolFeature',
          parameters: [
            {
              type: 'string',
              name: 'tripType',
              given: 'oneway'
            }
          ]
        },
        {
          name: 'callNewAPI',
          parameters: [
            {
              type: 'list',
              name: 'country',
              presentIn: ['cl', 'br', 'ar']
            }
          ]
        }
      ]
    }

    expect(document).to.deep.equal(expecedDocument)
  })
})
