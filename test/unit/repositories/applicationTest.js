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

  describe('findById', () => {
    it('resolves with a single application', () => {
      const expectedApplication = {name: 'SampleApp'}
      const fakeKnex = td.function()
      const fakeWhere = td.function()
      const fakeFirst = td.function()

      td.when(fakeKnex('applications')).thenReturn({where: fakeWhere})
      td.when(fakeWhere({id: 1})).thenReturn({first: fakeFirst})
      td.when(fakeFirst()).thenResolve(expectedApplication)

      return applicationRepository(fakeKnex).findById(1)
        .then((application) => {
          expect(application).to.deep.equal(expectedApplication)
        })
    })
  })
})
