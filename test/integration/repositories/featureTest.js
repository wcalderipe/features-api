import Knex from 'knex'
import {expect} from '../../testSetup'
import {featureRepository} from '../../../src/repositories/feature'

const knexfile = require('../../../knexfile')
const knex = Knex(knexfile.test)

describe('feature repository', () => {
  it('retrieves a list of features from database', () => {
    return featureRepository(knex).findAll()
      .then((features) => {
        expect(features.length).to.equal(3)
      })
  })
})

