import {CREATED} from 'http-status'
import {pipe} from 'ramda'
import td from 'testdouble'
import {withCreate} from '../../../src/controllers/withCreate'

describe('controller withCreate', () => {
  it('calls res.status with 201 status code and returns id', async () => {
    const fakeRepository = {
      create: td.function()
    }
    const req = {
      body: {name: 'NewApplication'}
    }
    const res = {
      status: td.function(),
      json: td.function()
    }
    const controller = pipe(
      withCreate(fakeRepository)
    )({})

    td.when(res.status(CREATED)).thenReturn(res)
    td.when(fakeRepository.create(req.body)).thenResolve(999)

    await controller.create(req, res)

    td.verify(res.json({id: 999}))
  })
})

