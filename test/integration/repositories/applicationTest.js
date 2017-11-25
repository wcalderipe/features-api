import Knex from 'knex'
import {expect} from '../../testSetup'
import {applicationRepository} from '../../../src/repositories/application'

const knexfile = require('../../../knexfile')
const knex = Knex(knexfile.test)

describe('application repository', () => {
  describe('findAll', () => {
    it('retrieves a list of applications from database', () => {
      return applicationRepository(knex).findAll()
        .then((applications) => {
          expect(applications.length).to.equal(2)
        })
    })
  })

  describe('findById', () => {
    it('retrieves a single application from database', () => {
      return applicationRepository(knex).findById(1)
        .then((application) => {
          expect(application).to.have.property('id')
          expect(application).to.have.property('name')
        })
    })
  })
})

