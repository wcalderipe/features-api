const TABLE_NAME = 'applications'

const applicationRepository = (knex) => ({
  findAll: findAll.bind(null, knex),
  findById: findById.bind(null, knex),
  create: create.bind(null, knex),
  update: update.bind(null, knex),
  destroy: destroy.bind(null, knex)
})

const findAll = (knex) => knex(TABLE_NAME)

const findById = (knex, id) => knex(TABLE_NAME).where({id}).first()

const create = (knex, data) => knex(TABLE_NAME).insert(data).returning('id')

const update = (knex, id, data) => knex(TABLE_NAME).where({id}).update(data)

const destroy = (knex, id) => knex(TABLE_NAME).where({id}).del()

export {applicationRepository}

