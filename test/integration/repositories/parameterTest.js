import Knex from 'knex'
import {expect} from '../../testSetup'
import {parameterRepository} from '../../../src/repositories'

const knexfile = require('../../../knexfile')
const knex = Knex(knexfile.test)
const repository = parameterRepository(knex)

describe('repository parameter', () => {
  it('findByFeatureId', async () => {
    const features = await repository.findByFeatureId(1)

    expect(features.length).to.equal(3)
  })
})

