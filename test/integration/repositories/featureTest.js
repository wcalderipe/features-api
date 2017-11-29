import Knex from 'knex'
import {expect} from '../../testSetup'
import {featureRepository} from '../../../src/repositories'

const knexfile = require('../../../knexfile')
const knex = Knex(knexfile.test)
const repository = featureRepository(knex)

describe('repository feature', () => {
  it('findByApplicationId', async () => {
    const features = await repository.findByApplicationId(1)

    expect(features.length).to.equal(4)
  })
})
