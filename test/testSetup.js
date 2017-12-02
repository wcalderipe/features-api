import chai from 'chai'
import Knex from 'knex'

const knexfile = require('../knexfile')

const {expect} = chai

const createKnex = () => Knex(knexfile.test)
const cleanTable = async (tableName) => {
  const knex = createKnex()
  const affectedRows = await knex(tableName).whereRaw('1 = 1').del()

  return affectedRows
}

chai.config.includeStack = true

export {chai, expect, createKnex, cleanTable}

