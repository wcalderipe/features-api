import {OK} from 'http-status'

const healthRouter = (app) => {
  app.get('/health', (req, res) => {
    return res.status(OK).json({ok: true})
  })
}

export default healthRouter
