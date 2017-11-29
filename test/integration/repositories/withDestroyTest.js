import Knex from 'knex'
import {pipe} from 'ramda'
import {expect} from '../../testSetup'
import {withDestroy} from '../../../src/repositories/withDestroy'

const knexfile = require('../../../knexfile')
const knex = Knex(knexfile.test)

const TMP_TABLE_NAME = 'withCreate_test_table'

describe('withDestroy', () => {
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

  it('deletes an entity from database and returns the number of affected rows', async () => {
    const repository = pipe(
      withDestroy(knex, TMP_TABLE_NAME)
    )({})

    const affectedRows = await repository.destroy(1)
    const [countResult] = await knex(TMP_TABLE_NAME).count()
    const count = countResult['count(*)']

    expect(affectedRows).to.equal(1)
    expect(count).to.equal(1)
  })
})

