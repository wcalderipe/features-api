import td from 'testdouble'
import {expect} from '../../testSetup'
import {featureRepository} from '../../../src/repositories'

describe('feature repository', () => {
  describe('findAll', () => {
    it('resolves with a list of features', async () => {
      const expectedFeatures = [
        {name: 'callNewAPI', application_id: 1},
        {name: 'newHeader', application_id: 2}
      ]
      const fakeKnex = td.function()

      td.when(fakeKnex('features')).thenResolve(expectedFeatures)

      const features = await featureRepository(fakeKnex).findAll()

      expect(features).to.deep.equal(expectedFeatures)
    })
  })

  describe('findById', () => {
    it('resolves with a single feature', async () => {
      const knexInterface = {
        where: td.function(),
        first: td.function()
      }
      const fakeKnex = td.function()
      const expectedFeature = {
        name: 'callNewAPI',
        application_id: 999
      }

      td.when(fakeKnex('features')).thenReturn(knexInterface)
      td.when(knexInterface.where({id: 999})).thenReturn(knexInterface)
      td.when(knexInterface.first()).thenResolve(expectedFeature)

      const feature = await featureRepository(fakeKnex).findById(999)

      expect(feature).to.deep.equal(expectedFeature)
    })
  })
})
