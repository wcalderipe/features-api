import {pipe} from 'ramda'
import td from 'testdouble'
import {withShow} from '../../../src/controllers/withShow'

describe('controller withShow', () => {
  const res = {
    json: td.function()
  }
  const req = {
    params: {id: 1}
  }

  it('calls res.json with a single application', async () => {
    const fakeRepository = {
      findById: td.function()
    }
    const controller = pipe(
      withShow(fakeRepository)
    )({})
    const expectedEntity = {name: 'SampleApp'}

    td.when(fakeRepository.findById(1)).thenResolve({name: 'SampleApp'})

    await controller.show(req, res)

    td.verify(res.json(expectedEntity))
  })
})

