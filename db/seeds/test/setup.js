exports.seed = (knex) => knex('applications')
  .del()
  .then(() => knex('applications')
    .insert([
      {id: 1, name: 'SampleApp'},
      {id: 2, name: 'OtherApp'}
    ])
  )

