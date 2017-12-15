exports.up = (knex, Promise) => Promise.all([
  knex.schema.createTable('applications', (table) => {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.timestamp('createdAt').defaultTo(knex.fn.now())
  }),
  knex.schema.createTable('features', (table) => {
    table.increments('id').primary()
    table.integer('applicationId').references('applications.id')
    table.string('name').notNullable()
    table.timestamp('createdAt').defaultTo(knex.fn.now())
  }),
  knex.schema.createTable('parameters', (table) => {
    table.increments('id').primary()
    table.integer('featureId').references('features.id')
    table.text('ruleJson').notNullable()
    table.timestamp('createdAt').defaultTo(knex.fn.now())
  })
])

exports.down = (knex, Promise) => Promise.all([
  knex.schema.dropTable('applications'),
  knex.schema.dropTable('features'),
  knex.schema.dropTable('parameters')
])

