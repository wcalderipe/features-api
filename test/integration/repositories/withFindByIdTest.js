import {pipe} from 'ramda'
import {expect, createKnex} from '../../testSetup'
import {withFindById} from '../../../src/repositories'

const TMP_TABLE_NAME = 'withFindById_test_table'

const knex = createKnex()

describe('repository withFindById', () => {
  before(async () => {
    await knex.schema.createTable(TMP_TABLE_NAME, (table) => {
      table.increments()
      table.string('name')
    })

    await knex(TMP_TABLE_NAME).insert([
      {id: 1, name: 'TmpEntity01'},
      {id: 2, name: 'TmpEntity02'}
    ])
  })

  after(async () => {
    await knex.schema.dropTable(TMP_TABLE_NAME)
  })

  it('retrieves a single entity', async () => {
    const repository = pipe(
      withFindById(knex, TMP_TABLE_NAME)
    )({})

    const entity = await repository.findById(1)

    expect(entity.name).to.equal('TmpEntity01')
  })
})

