import {pipe} from 'ramda'
import td from 'testdouble'
import {withUpdate} from '../../../src/controllers/withUpdate'

describe('controller withUpdate', () => {
  it('calls res.json with updated entity', async () => {
    const fakeRepository = {
      update: td.function(),
      findById: td.function()
    }
    const req = {
      params: {id: 1},
      body: {name: 'UpdateApp'}
    }
    const res = {
      json: td.function()
    }
    const controller = pipe(
      withUpdate(fakeRepository)
    )({})

    td.when(fakeRepository.update(1, req.body)).thenResolve(1)
    td.when(fakeRepository.findById(1)).thenResolve({id: 1, name: 'UpdateApp'})

    await controller.update(req, res)

    td.verify(res.json({id: 1, name: 'UpdateApp'}))
  })
})

