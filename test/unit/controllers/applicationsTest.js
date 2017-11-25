import td from 'testdouble'
import {list, show} from '../../../src/controllers/applications'

describe('applications controller', () => {
  const res = {
    json: td.function()
  }
  const req = {}

  describe('list', () => {
    it('calls res.json with applications list', () => {
      const fakeRepository = {
        findAll: td.function()
      }

      td.when(fakeRepository.findAll()).thenResolve([])

      return list(fakeRepository)(req, res)
        .then(() => {
          td.verify(res.json({applications: []}))
        })
    })
  })

  describe('show', () => {
    it('calls res.json with a single application', () => {
      const fakeRepository = {
        findById: td.function()
      }
      const req = {
        params: {id: 1}
      }
      const expectedApplication = {name: 'SampleApp'}

      td.when(fakeRepository.findById(1)).thenResolve({name: 'SampleApp'})

      return show(fakeRepository)(req, res)
        .then(() => {
          td.verify(res.json({application: expectedApplication}))
        })
    })
  })
})

