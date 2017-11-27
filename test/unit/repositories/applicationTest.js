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

  describe('create', () => {
    it('resolves with the created application id', () => {
      const application = {name: 'SomeApplication'}
      const fakeKnex = td.function()
      const fakeInsert = td.function()
      const fakeReturning = td.function()

      td.when(fakeKnex('applications')).thenReturn({insert: fakeInsert})
      td.when(fakeInsert(application)).thenReturn({returning: fakeReturning})
      td.when(fakeReturning('id')).thenResolve(999)

      return applicationRepository(fakeKnex).create(application)
        .then((id) => {
          expect(id).to.deep.equal(999)
        })
    })
  })

  describe('update', () => {
    it('resolves with the number of applications affected', () => {
      const application = {name: 'UpdatedApp'}
      const fakeKnex = td.function()
      const fakeWhere = td.function()
      const fakeUpdate = td.function()

      td.when(fakeKnex('applications')).thenReturn({where: fakeWhere})
      td.when(fakeWhere({id: 1})).thenReturn({update: fakeUpdate})
      td.when(fakeUpdate({name: 'UpdatedApp'})).thenResolve(1)

      return applicationRepository(fakeKnex).update(1, application)
        .then((affectedRows) => {
          expect(affectedRows).to.equal(1)
        })
    })
  })

  describe('destroy', () => {
    it('resolves with the number of applications affected', () => {
      const fakeKnex = td.function()
      const fakeWhere = td.function()
      const fakeDel = td.function()

      td.when(fakeKnex('applications')).thenReturn({where: fakeWhere})
      td.when(fakeWhere({id: 999})).thenReturn({del: fakeDel})
      td.when(fakeDel()).thenResolve(1)

      return applicationRepository(fakeKnex).destroy(999)
        .then((affectedRows) => {
          expect(affectedRows).to.equal(1)
        })
    })
  })
})

