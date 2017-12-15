import {expect, createKnex, cleanTable} from '../../testSetup'
import {
  applicationRepository,
  TABLE_NAME as APPLICATIONS_TABLE_NAME
} from '../../../src/repositories/application'
import {
  featureRepository,
  TABLE_NAME as FEATURES_TABLE_NAME
} from '../../../src/repositories/feature'

const knex = createKnex()
const repository = featureRepository(knex)

describe('repository feature', () => {
  let applicationId

  before(async () => {
    await cleanTable(FEATURES_TABLE_NAME)
    await cleanTable(APPLICATIONS_TABLE_NAME)

    applicationId = await applicationRepository(knex).create({
      name: 'application01'
    })

    await featureRepository(knex).create({
      applicationId: applicationId,
      name: 'feature01'
    })
  })

  after(async () => {
    await cleanTable(FEATURES_TABLE_NAME)
    await cleanTable(APPLICATIONS_TABLE_NAME)
  })

  it('findByApplicationId', async () => {
    const features = await repository.findByApplicationId(applicationId)

    expect(features.length).to.equal(1)
  })
})
