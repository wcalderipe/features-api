const {applications, features, parameters} = require('../common')

exports.seed = (knex) => Promise.all([
  applications(knex),
  features(knex),
  parameters(knex)
])
