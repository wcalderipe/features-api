import Knex from 'knex'
import {expect} from '../../testSetup'
import {applicationRepository} from '../../../src/repositories'

const knexfile = require('../../../knexfile')
const knex = Knex(knexfile.test)

describe('application repository', () => {
  describe('findById', () => {
    it('retrieves a single application', async () => {
      const application = await applicationRepository(knex).findById(1)

      expect(application).to.have.property('id')
      expect(application).to.have.property('name')
    })
  })

  describe('create', () => {
    it('inserts a new application and returns the ids', async () => {
      const id = await applicationRepository(knex).create({name: 'NewApplication'})

      expect(id).to.be.an('number')
    })
  })

  describe('update', () => {
    it('updates application and returns the number of affected rows', async () => {
      const affectedRows = await applicationRepository(knex).update(1, {name: 'UpdatedApp'})

      expect(affectedRows).to.equal(1)
    })
  })

  describe('destroy', () => {
    let id

    beforeEach(async () => {
      id = await applicationRepository(knex).create({name: 'AppToDelete'})
    })

    it('deletes application and returns the number of affected rows', async () => {
      const affectedRows = await applicationRepository(knex).destroy(id)

      expect(affectedRows).to.equal(1)
    })
  })
})

