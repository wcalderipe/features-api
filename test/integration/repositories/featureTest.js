import {expect, createKnex} from '../../testSetup'
import {featureRepository} from '../../../src/repositories'

const knex = createKnex()
const repository = featureRepository(knex)

describe('repository feature', () => {
  it('findByApplicationId', async () => {
    const features = await repository.findByApplicationId(1)

    expect(features.length).to.equal(4)
  })
})
