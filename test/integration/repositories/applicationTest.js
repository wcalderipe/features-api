import Knex from 'knex'
import {expect} from '../../testSetup'
import {applicationRepository} from '../../../src/repositories/application'

const knexfile = require('../../../knexfile')
const knex = Knex(knexfile.test)

describe('application repository', () => {
  it('retrieves a list of applications from database', () => {
    return applicationRepository(knex).findAll()
      .then((applications) => {
        expect(applications.length).to.equal(2)
      })
  })
})

