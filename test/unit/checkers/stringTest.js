import {expect} from '../../testSetup'
import string from '../../../src/checkers/string'

describe('string type check', () => {
  const parameter = {
    name: 'country',
    given: 'br'
  }

  it('returns true if country context satisfy the param given value', () => {
    const context = {country: 'br'}

    expect(string.check(parameter, context)).to.equal(true)
  })

  it('returns false if country context does not satisfy the param given value', () => {
    const context = {country: 'de'}

    expect(string.check(parameter, context)).to.equal(false)
  })
})
