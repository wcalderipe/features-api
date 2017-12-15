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
        applicationId: 1,
        name: 'newHeader'
      },
      {
        id: 2,
        applicationId: 1,
        name: 'callNewAPI'
      },
      {
        id: 3,
        applicationId: 1,
        name: 'appEnable'
      },
      {
        id: 4,
        applicationId: 2,
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
        featureId: 1,
        rule_json: JSON.stringify({
          type: 'list',
          name: 'country',
          presentIn: ['cl', 'br', 'uy', 'ar']
        })
      },
      {
        id: 2,
        featureId: 2,
        rule_json: JSON.stringify({
          type: 'string',
          name: 'tripType',
          given: 'oneway'
        })
      },
      {
        id: 3,
        featureId: 3,
        rule_json: JSON.stringify({
          type: 'always',
          returns: true
        })
      },
      {
        id: 4,
        featureId: 4,
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
