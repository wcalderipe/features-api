import Knex from 'knex'

const env = process.env.NODE_ENV || 'development'
const knexfile = require('../../knexfile')
const knex = Knex(knexfile[env])

export default knex

