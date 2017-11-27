import td from 'testdouble'
import {expect} from '../../testSetup'
import {parameterRepository} from '../../../src/repositories'

describe('paramete repository', () => {
  describe('findAll', () => {
    it('resolves with a list of parameters', () => {
      const expectedParameters = [
        {feature_id: 1, rule_json: '{}'},
        {feature_id: 2, rule_json: '{}'}
      ]
      const fakeKnex = td.function()

      td.when(fakeKnex('parameters')).thenResolve(expectedParameters)

      return parameterRepository(fakeKnex).findAll()
        .then((parameters) => {
          expect(parameters).to.deep.equal(expectedParameters)
        })
    })
  })
})
