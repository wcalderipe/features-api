import {expect} from '../../testSetup'
import string from '../../../src/checkers/string'

describe('string type check', () => {
  const parameter = {
    name: 'country',
    given: 'br'
  }

  it('returns true if context satisfy the feature parameters', () => {
    const context = {country: 'br'}

    expect(string.check(parameter, context)).to.equal(true)
  })

  it('returns false if context does not satisfy the feature parameter', () => {
    const context = {country: 'de'}

    expect(string.check(parameter, context)).to.equal(false)
  })
})
