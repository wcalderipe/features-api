import {expect, createKnex} from '../../testSetup'
import {parameterRepository} from '../../../src/repositories'

const knex = createKnex()
const repository = parameterRepository(knex)

describe('repository parameter', () => {
  it('findByFeatureId', async () => {
    const features = await repository.findByFeatureId(1)

    expect(features.length).to.equal(3)
  })
})

