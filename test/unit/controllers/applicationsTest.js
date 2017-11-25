import td from 'testdouble'
import {list} from '../../../src/controllers/applications'

describe('applications controller', () => {
  const res = {
    json: td.function()
  }
  const req = {}

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

