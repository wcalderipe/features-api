const {expect} = require('testSetup')
const {evaluate} = require('evaluate')

const features = [
  {
    name: 'featureForBrazil',
    parameters: [
      {
	name: 'country',
	given: 'br'
      }
    ]
  },
  {
    name: 'featureForChile',
    parameters: [
      {
	name: 'country',
	given: 'cl'
      }
    ]
  }
]

describe('evaluate', () => {
  it('returns brazil feature enable', () => {
    const context = {country: 'br'}
    const actual = evaluate(context, features)
    const expected = {
      featureForBrazil: true,
      featureForChile: false
    }

    expect(actual).to.deep.equal(expected)
  })
})
