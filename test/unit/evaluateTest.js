import {expect} from '../testSetup'
import {evaluate} from '../../src/evaluate'

const features = [
  {
    name: 'Brazil',
    parameters: [
      {
        type: 'string',
        name: 'country',
        given: 'br'
      }
    ]
  },
  {
    name: 'Chile',
    parameters: [
      {
        type: 'string',
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
      Brazil: true,
      Chile: false
    }

    expect(actual).to.deep.equal(expected)
  })

  it('applies AND logic operator to all parameters', () => {
    const featuresWithMultipleParams = [
      ...features,
      {
        name: 'AustraliaAndEnglish',
        parameters: [
          {
            type: 'string',
            name: 'country',
            given: 'au'
          },
          {
            type: 'string',
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

  context('list type', () => {
    const features = [
      {
        name: 'forPEorCO',
        parameters: [
          {
            type: 'list',
            name: 'country',
            presentIn: ['pe', 'co']
          },
          {
            type: 'string',
            name: 'language',
            given: 'es'
          }
        ]
      }
    ]

    it('returns true if the context value is included', () => {
      const contextForPE = {country: 'pe', language: 'es'}
      const actualForPe = evaluate(contextForPE, features)
      const contextForCO = {country: 'co', language: 'es'}
      const actualForCO = evaluate(contextForCO, features)
      const expected = {forPEorCO: true}

      expect(actualForPe).to.deep.equal(expected)
      expect(actualForCO).to.deep.equal(expected)
    })
  })
})
