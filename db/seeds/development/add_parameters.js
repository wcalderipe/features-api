const SAMPLE_APP = {
  NEW_HEADER_ID: 1,
  CALL_NEW_API_ID: 2,
  APP_ENABLE_ID: 3
}

const OTHER_APP = {
  APP_ENABLE_ID: 4
}

exports.seed = (knex) => knex('parameters')
  .del()
  .then(() => knex('parameters')
    .insert([
      {
        id: 1,
        feature_id: SAMPLE_APP.NEW_HEADER_ID,
        rule_json: JSON.stringify({
          type: 'list',
          name: 'tripType',
          presentIn: ['roundtrip', 'oneway']
        })
      },
      {
        id: 2,
        feature_id: SAMPLE_APP.CALL_NEW_API_ID,
        rule_json: JSON.stringify({
          type: 'string',
          name: 'tripType',
          given: 'oneway'
        })
      },
      {
        id: 3,
        feature_id: SAMPLE_APP.APP_ENABLE_ID,
        rule_json: JSON.stringify({
          type: 'always',
          returns: true
        })
      },
      {
        id: 4,
        feature_id: OTHER_APP.APP_ENABLE_ID,
        rule_json: JSON.stringify({
          type: 'always',
          returns: false
        })
      }
    ])
  )
