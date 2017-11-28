import td from 'testdouble'
import {expect} from '../../testSetup'
import {applicationRepository} from '../../../src/repositories'

describe('application repository', () => {
  describe('findAll', () => {
    it('resolves with a list of applications', async () => {
      const expectedApplications = [
        {name: 'SampleApp'},
        {name: 'OtherApp'}
      ]
      const fakeKnex = td.function()

      td.when(fakeKnex('applications')).thenResolve(expectedApplications)

      const applications = await applicationRepository(fakeKnex).findAll()

      expect(applications).to.deep.equal(expectedApplications)
    })
  })

  describe('findById', () => {
    it('resolves with a single application', async () => {
      const expectedApplication = {name: 'SampleApp'}
      const fakeKnex = td.function()
      const fakeWhere = td.function()
      const fakeFirst = td.function()

      td.when(fakeKnex('applications')).thenReturn({where: fakeWhere})
      td.when(fakeWhere({id: 1})).thenReturn({first: fakeFirst})
      td.when(fakeFirst()).thenResolve(expectedApplication)

      const application = await applicationRepository(fakeKnex).findById(1)

      expect(application).to.deep.equal(expectedApplication)
    })
  })

  describe('create', () => {
    it('resolves with the created application id', async () => {
      const application = {name: 'SomeApplication'}
      const fakeKnex = td.function()
      const fakeInsert = td.function()
      const fakeReturning = td.function()

      td.when(fakeKnex('applications')).thenReturn({insert: fakeInsert})
      td.when(fakeInsert(application)).thenReturn({returning: fakeReturning})
      td.when(fakeReturning('id')).thenResolve([999])

      const id = await applicationRepository(fakeKnex).create(application)

      expect(id).to.deep.equal(999)
    })
  })

  describe('update', () => {
    it('resolves with the number of applications affected', async () => {
      const application = {name: 'UpdatedApp'}
      const fakeKnex = td.function()
      const fakeWhere = td.function()
      const fakeUpdate = td.function()

      td.when(fakeKnex('applications')).thenReturn({where: fakeWhere})
      td.when(fakeWhere({id: 1})).thenReturn({update: fakeUpdate})
      td.when(fakeUpdate({name: 'UpdatedApp'})).thenResolve(1)

      const affectedRows = await applicationRepository(fakeKnex)
        .update(1, application)

      expect(affectedRows).to.equal(1)
    })
  })

  describe('destroy', () => {
    it('resolves with the number of applications affected', async () => {
      const fakeKnex = td.function()
      const fakeWhere = td.function()
      const fakeDel = td.function()

      td.when(fakeKnex('applications')).thenReturn({where: fakeWhere})
      td.when(fakeWhere({id: 999})).thenReturn({del: fakeDel})
      td.when(fakeDel()).thenResolve(1)

      const affectedRows = await applicationRepository(fakeKnex).destroy(999)

      expect(affectedRows).to.equal(1)
    })
  })
})

