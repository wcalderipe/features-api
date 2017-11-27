import Knex from 'knex'
import {expect} from '../../testSetup'
import {applicationRepository} from '../../../src/repositories'

const knexfile = require('../../../knexfile')
const knex = Knex(knexfile.test)

describe('application repository', () => {
  describe('findAll', () => {
    it('retrieves a list of applications', () => {
      return applicationRepository(knex).findAll()
        .then((applications) => {
          expect(applications).to.be.an('array')
        })
    })
  })

  describe('findById', () => {
    it('retrieves a single application', () => {
      return applicationRepository(knex).findById(1)
        .then((application) => {
          expect(application).to.have.property('id')
          expect(application).to.have.property('name')
        })
    })
  })

  describe('create', () => {
    it('inserts a new application and returns the ids', () => {
      return applicationRepository(knex).create({name: 'NewApplication'})
        .then((id) => {
          expect(id).to.be.an('number')
        })
    })
  })

  describe('update', () => {
    it('updates application and returns the number of affected rows', () => {
      return applicationRepository(knex).update(1, {name: 'UpdatedApp'})
        .then((affectedRows) => {
          expect(affectedRows).to.equal(1)
        })
    })
  })

  describe('destroy', () => {
    let idToDelete

    beforeEach(() => {
      return applicationRepository(knex).create({name: 'AppToDelete'})
        .then((id) => {
          idToDelete = id
        })
    })

    it('deletes application and returns the number of affected rows', () => {
      return applicationRepository(knex).destroy(idToDelete)
        .then((affectedRows) => {
          expect(affectedRows).to.equal(1)
        })
    })
  })
})

