import Knex from 'knex'
import {expect} from '../../testSetup'
import {featureRepository} from '../../../src/repositories'

const knexfile = require('../../../knexfile')
const knex = Knex(knexfile.test)

describe('feature repository', () => {
  describe('findAll', () => {
    it('retrieves a list of features', async () => {
      const features = await featureRepository(knex).findAll()

      expect(features.length).to.equal(3)
    })
  })

  describe('findById', () => {
    it('retrieves a single feature', async () => {
      const feature = await featureRepository(knex).findById(1)

      expect(feature).to.have.property('id')
      expect(feature).to.have.property('application_id')
      expect(feature).to.have.property('name')
    })
  })
})

