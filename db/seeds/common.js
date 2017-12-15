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
      {
        id: 1,
        application_id: 1,
        name: 'newHeader'
      },
      {
        id: 2,
        application_id: 1,
        name: 'callNewAPI'
      },
      {
        id: 3,
        application_id: 1,
        name: 'appEnable'
      },
      {
        id: 4,
        application_id: 2,
        name: 'appEnable'
      }
    ])
  )

const parameters = (knex) => knex('parameters')
  .del()
  .then(() => knex('parameters')
    .insert([
      {
        id: 1,
        feature_id: 1,
        rule_json: JSON.stringify({
          type: 'list',
          name: 'country',
          presentIn: ['cl', 'br', 'uy', 'ar']
        })
      },
      {
        id: 2,
        feature_id: 2,
        rule_json: JSON.stringify({
          type: 'string',
          name: 'tripType',
          given: 'oneway'
        })
      },
      {
        id: 3,
        feature_id: 3,
        rule_json: JSON.stringify({
          type: 'always',
          returns: true
        })
      },
      {
        id: 4,
        feature_id: 4,
        rule_json: JSON.stringify({
          type: 'always',
          returns: false
        })
      }
    ])
  )

module.exports = {
  applications,
  features,
  parameters
}
