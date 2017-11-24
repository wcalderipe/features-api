import td from 'testdouble'
import {expect} from '../../testSetup'
import {applicationRepository} from '../../../src/repositories/application'

describe('application repository', () => {
  describe('findAll', () => {
    it('resolves with a list of applications', () => {
      const expectedApplications = [
        {name: 'SampleApp'},
        {name: 'OtherApp'}
      ]
      const fakeKnex = td.function()

      td.when(fakeKnex('applications')).thenResolve(expectedApplications)

      return applicationRepository(fakeKnex).findAll()
        .then((applications) => {
          expect(applications).to.deep.equal(expectedApplications)
        })
    })
  })
})
