const {expect} = require('../testSetup')
const {evaluate} = require('../../src/evaluate')

const features = [
  {
    name: 'Brazil',
    parameters: [
      {
	name: 'country',
	given: 'br'
      }
    ]
  },
  {
    name: 'Chile',
    parameters: [
      {
	name: 'country',
	given: 'cl'
      }
    ]
  }
]

describe.only('evaluate', () => {
  it('returns brazil feature enable', () => {
    const context = {country: 'br'}
    const actual = evaluate(context, features)
    const expected = {
      Brazil: true,
      Chile: false
    }

    expect(actual).to.deep.equal(expected)
  })

  it('applies and logic operator to all parameters', () => {
    const featuresWithMultipleParams = [
      ...features,
      {
	name: 'AustraliaAndEnglish',
	parameters: [
	  {
	    name: 'country',
	    given: 'au'
	  },
	  {
	    name: 'language',
	    given: 'en'
	  }
	]
      }
    ]
    const context = {country: 'au', language: 'es'}
    const actual = evaluate(context, featuresWithMultipleParams)
    const expected = {
      Brazil: false,
      Chile: false,
      AustraliaAndEnglish: false 
    }

    expect(actual).to.deep.equal(expected)
  })
})
