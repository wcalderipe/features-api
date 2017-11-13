import td from 'testdouble'
import {get} from '../../../src/controllers/features'

describe('features controller', () => {
  it('calls res.json with features', () => {
    const req = {}
    const res = {
      json: td.function()
    }
    const expectedFeatures = {
      someFeature: true,
      otherFeature: false
    }
    const fakeEvaluate = () => expectedFeatures

    get(fakeEvaluate)(req, res)

    td.verify(res.json({features: expectedFeatures}))
  })
})

