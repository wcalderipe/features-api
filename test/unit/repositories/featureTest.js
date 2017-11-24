import td from 'testdouble'
import {expect} from '../../testSetup'
import {featureRepository} from '../../../src/repositories/feature'

describe('feature repository', () => {
  describe('findAll', () => {
    it('resolves with a list of features', () => {
      const expectedFeatures = [
        {name: 'callNewAPI', application_id: 1},
        {name: 'newHeader', application_id: 2}
      ]
      const fakeKnex = td.function()

      td.when(fakeKnex('features')).thenResolve(expectedFeatures)

      return featureRepository(fakeKnex).findAll()
        .then((features) => {
          expect(features).to.deep.equal(expectedFeatures)
        })
    })
  })
})
