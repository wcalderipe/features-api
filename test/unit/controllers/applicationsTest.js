import {CREATED, NO_CONTENT} from 'http-status'
import td from 'testdouble'
import {list, show, create, update, destroy} from '../../../src/controllers/applications'

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

  describe('create', () => {
    it('calls res.status with 201 status code', () => {
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
      td.when(fakeRepository.create(req.body)).thenResolve([999])

      return create(fakeRepository)(req, res)
        .then(() => {
          td.verify(res.json({id: 999}))
        })
    })
  })

  describe('update', () => {
    it('calls res.json with updated application', () => {
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

      return update(fakeRepository)(req, res)
        .then(() => {
          td.verify(res.json({
            application: {id: 1, name: 'UpdateApp'}
          }))
        })
    })
  })

  describe('destroy', () => {
    it('calls res.status with 204 status code', () => {
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

      return destroy(fakeRepository)(req, res)
        .then(() => {
          td.verify(res.send())
        })
    })
  })
})

