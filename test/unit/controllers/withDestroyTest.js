import {NO_CONTENT} from 'http-status'
import {pipe} from 'ramda'
import td from 'testdouble'
import {withDestroy} from '../../../src/controllers/withDestroy'

describe('controller withDestroy', () => {
  it('calls res.status with 204 status code', async () => {
    const fakeRepository = {
      destroy: td.function()
    }
    const req = {
      params: {id: 999}
    }
    const res = {
      status: td.function(),
      send: td.function()
    }
    const controller = pipe(
      withDestroy(fakeRepository)
    )({})

    td.when(fakeRepository.destroy(999)).thenResolve(1)
    td.when(res.status(NO_CONTENT)).thenReturn(res)

    await controller.destroy(req, res)

    td.verify(res.send())
  })
})


