import td from 'testdouble'
import {expect} from '../../testSetup'
import {parameterRepository} from '../../../src/repositories'

describe('paramete repository', () => {
  describe('findAll', () => {
    it('resolves with a list of parameters', async () => {
      const expectedParameters = [
        {feature_id: 1, rule_json: '{}'},
        {feature_id: 2, rule_json: '{}'}
      ]
      const fakeKnex = td.function()

      td.when(fakeKnex('parameters')).thenResolve(expectedParameters)

      const parameters = await parameterRepository(fakeKnex).findAll()

      expect(parameters).to.deep.equal(expectedParameters)
    })
  })
})
