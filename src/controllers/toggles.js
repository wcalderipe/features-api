import {NOT_FOUND} from 'http-status'
import {evaluate as defaultEvaluate} from '../evaluate'

const get = (applicationService, evaluate = defaultEvaluate) => async (req, res) => {
  try {
    const context = req.query
    const applicationId = context.applicationId
    const application = await applicationService.createDocumentById(applicationId)
    const toggles = evaluate(context, application.features)

    return res.json({toggles})
  } catch (err) {
    return res.status(NOT_FOUND).json({
      code: 'ERR_APPLICATION_NOT_FOUND'
    })
  }
}

export {get}
