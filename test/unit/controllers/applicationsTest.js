import {CREATED, NO_CONTENT} from 'http-status'
import td from 'testdouble'
import {list, show, create, update, destroy} from '../../../src/controllers/applications'

describe('applications controller', () => {
  const res = {
    json: td.function()
  }
  const req = {}

  describe('list', () => {
    it('calls res.json with applications list', async () => {
      const fakeRepository = {
        findAll: td.function()
      }

      td.when(fakeRepository.findAll()).thenResolve([])

      await list(fakeRepository)(req, res)

      td.verify(res.json([]))
    })
  })

  describe('show', () => {
    it('calls res.json with a single application', async () => {
      const fakeRepository = {
        findById: td.function()
      }
      const req = {
        params: {id: 1}
      }
      const expectedApplication = {name: 'SampleApp'}

      td.when(fakeRepository.findById(1)).thenResolve({name: 'SampleApp'})

      await show(fakeRepository)(req, res)

      td.verify(res.json(expectedApplication))
    })
  })

  describe('create', () => {
    it('calls res.status with 201 status code', async () => {
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

      td.when(res.status(CREATED)).thenReturn(res)
      td.when(fakeRepository.create(req.body)).thenResolve(999)

      await create(fakeRepository)(req, res)

      td.verify(res.json({id: 999}))
    })
  })

  describe('update', () => {
    it('calls res.json with updated application', async () => {
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

      td.when(fakeRepository.update(1, req.body)).thenResolve(1)
      td.when(fakeRepository.findById(1)).thenResolve({id: 1, name: 'UpdateApp'})

      await update(fakeRepository)(req, res)

      td.verify(res.json({id: 1, name: 'UpdateApp'}))
    })
  })

  describe('destroy', () => {
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

      td.when(fakeRepository.destroy(999)).thenResolve(1)
      td.when(res.status(NO_CONTENT)).thenReturn(res)

      await destroy(fakeRepository)(req, res)

      td.verify(res.send())
    })
  })
})

