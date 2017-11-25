const applications = (knex) => knex('applications')
  .del()
  .then(() => knex('applications')
    .insert([
      {id: 1, name: 'SampleApp'},
      {id: 2, name: 'OtherApp'}
    ])
  )

const features = (knex) => knex('features')
  .del()
  .then(() => knex('features')
    .insert([
      {id: 1, application_id: 1, name: 'callNewAPI'},
      {id: 2, application_id: 1, name: 'newHeader'},
      {id: 3, application_id: 2, name: 'newCheckoutForm'}
    ])
  )

exports.seed = (knex) => Promise.all([
  applications(knex),
  features(knex)
])

