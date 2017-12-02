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

const stringRule = {
  type: 'string',
  name: 'tripType',
  given: 'oneway'
}
const listRule = {
  type: 'list',
  name: 'country',
  presentIn: ['cl', 'br', 'uy', 'ar']
}
const alwaysRule = {
  type: 'always',
  returns: true
}
const parameters = (knex) => knex('parameters')
  .del()
  .then(() => knex('parameters')
    .insert([
      {id: 1, feature_id: 1, rule_json: JSON.stringify(stringRule)},
      {id: 2, feature_id: 2, rule_json: JSON.stringify(listRule)},
      {id: 3, feature_id: 3, rule_json: JSON.stringify(alwaysRule)}
    ])
  )

exports.seed = (knex) => Promise.all([
  applications(knex),
  features(knex),
  parameters(knex)
])

