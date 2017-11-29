import Knex from 'knex'
import {pipe} from 'ramda'
import {expect} from '../../testSetup'
import {withUpdate} from '../../../src/repositories'

const knexfile = require('../../../knexfile')
const knex = Knex(knexfile.test)

const TMP_TABLE_NAME = 'withUpdate_test_table'

describe('repository withUpdate', () => {
  before(async () => {
    await knex.schema.createTable(TMP_TABLE_NAME, (table) => {
      table.increments()
      table.string('name')
    })

    await knex(TMP_TABLE_NAME).insert({id: 1, name: 'TmpEntity01'})
  })

  after(async () => {
    await knex.schema.dropTable(TMP_TABLE_NAME)
  })

  it('updates an entity and returns the number of affect rows', async () => {
    const repository = pipe(
      withUpdate(knex, TMP_TABLE_NAME)
    )({})

    const affectedRows = await repository.update(1, {name: 'UpdatedName'})
    const entity = await knex(TMP_TABLE_NAME).where({id: 1}).first()

    expect(affectedRows).to.equal(1)
    expect(entity.name).to.equal('UpdatedName')
  })
})

