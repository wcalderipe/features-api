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
})
