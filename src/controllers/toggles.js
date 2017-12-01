import {NOT_FOUND} from 'http-status'
import {evaluate as defaultEvaluate} from '../evaluate'

const get = (applicationService, evaluate = defaultEvaluate) => async (req, res) => {
  const context = req.query
  const applicationId = context.applicationId
  const application = await applicationService.createDocumentById(applicationId)

  if (!application) {
    return res.status(NOT_FOUND).json({
      code: 'ERR_APPLICATION_NOT_FOUND'
    })
  }

  const toggles = evaluate(context, application.features)

  return res.json({toggles})
}

export {get}
