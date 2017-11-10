import {expect} from '../../testSetup'
import list from '../../../src/checkers/list'

describe('list type check', () => {
  const parameter = {
    name: 'country',
    presentIn: ['br', 'uy']
  }

  it('returns true if country context is in the params given list', () => {
    const context = {country: 'uy'}

    expect(list.check(parameter, context)).to.equal(true)
  })

  it('returns false if country context is not in the params given list', () => {
    const context = {country: 'de'}

    expect(list.check(parameter, context)).to.equal(false)
  })
})

