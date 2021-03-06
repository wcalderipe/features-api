import {pipe} from 'ramda'
import {expect, createKnex} from '../../testSetup'
import {withCreate} from '../../../src/repositories'

const TMP_TABLE_NAME = 'withCreate_test_table'

const knex = createKnex()

describe('repository withCreate', () => {
  before(async () => {
    await knex.schema.createTable(TMP_TABLE_NAME, (table) => {
      table.increments()
      table.string('name')
    })
  })

  after(async () => {
    await knex.schema.dropTable(TMP_TABLE_NAME)
  })

  it('inserts a new entity and returns the id', async () => {
    const repository = pipe(
      withCreate(knex, TMP_TABLE_NAME)
    )({})

    const id = await repository.create({name: 'Entity'})

    expect(id).to.equal(1)
  })
})

