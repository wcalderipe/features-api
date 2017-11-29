import {pipe} from 'ramda'
import td from 'testdouble'
import {withList} from '../../../src/controllers/withList'

describe('controller withList', () => {
  const res = {
    json: td.function()
  }
  const req = {}

  it('calls res.json with applications list', async () => {
    const fakeRepository = {
      findAll: td.function()
    }
    const controller = pipe(
      withList(fakeRepository)
    )({})

    td.when(fakeRepository.findAll()).thenResolve([])

    await controller.list(req, res)

    td.verify(res.json([]))
  })
})
