import {pipe} from 'ramda'
import {expect, createKnex} from '../../testSetup'
import {withFindAll} from '../../../src/repositories'

const TMP_TABLE_NAME = 'withFindAll_test_table'

const knex = createKnex()

describe('repository withFindAll', () => {
  before(async () => {
    await knex.schema.createTable(TMP_TABLE_NAME, (table) => {
      table.increments()
      table.string('name')
    })

    await knex(TMP_TABLE_NAME).insert([
      {name: 'TmpEntity01'},
      {name: 'TmpEntity02'}
    ])
  })

  after(async () => {
    await knex.schema.dropTable(TMP_TABLE_NAME)
  })

  it('retrieves a list of entities', async () => {
    const repository = pipe(
      withFindAll(knex, TMP_TABLE_NAME)
    )({})

    const entities = await repository.findAll()

    expect(entities.length).to.equal(2)
  })
})

