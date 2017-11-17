const SAMPLE_APP_ID = 1
const OTHER_APP_ID = 2

exports.seed = (knex) => knex('features')
  .del()
  .then(() => knex('features')
    .insert([
      {
        id: 1,
        application_id: SAMPLE_APP_ID,
        name: 'newHeader'
      },
      {
        id: 2,
        application_id: SAMPLE_APP_ID,
        name: 'callNewAPI'
      },
      {
        id: 3,
        application_id: SAMPLE_APP_ID,
        name: 'appEnable'
      },
      {
        id: 4,
        application_id: OTHER_APP_ID,
        name: 'appEnable'
      }
    ])
  )

