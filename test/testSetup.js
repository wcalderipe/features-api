import chai from 'chai'
import Knex from 'knex'

const {expect} = chai
const knexfile = require('../knexfile')
const createKnex = () => Knex(knexfile.test)

chai.config.includeStack = true

export {chai, expect, createKnex}

