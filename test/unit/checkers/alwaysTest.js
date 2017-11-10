import {expect} from '../../testSetup'
import always from '../../../src/checkers/always'

describe.only('always type', () => {
  it('returns true', () => {
    const parameter = {
      type: 'always',
      returns: true 
    }

    const context = {}

    expect(always.check(parameter, context)).to.equal(true)
  })

  it('returns false', () => {
    const parameter = {
      type: 'always',
      returns: false 
    }

    const context = {}

    expect(always.check(parameter, context)).to.equal(false)
  })
})


