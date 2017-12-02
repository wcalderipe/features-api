import {pipe} from 'ramda'
import {withList} from './withList'
import {withShow} from './withShow'
import {withCreate} from './withCreate'
import {withUpdate} from './withUpdate'
import {withDestroy} from './withDestroy'

const specificFunctions = (repositories) => ({
  features: features.bind(null, repositories.feature)
})

const features = async (repository, req, res) => {
  const {id} = req.params
  const applicationFeatures = await repository.findByApplicationId(id)

  return res.json(applicationFeatures)
}

const applicationsController = (repositories) => pipe(
  withList(repositories.application),
  withShow(repositories.application),
  withCreate(repositories.application),
  withUpdate(repositories.application),
  withDestroy(repositories.application)
)(specificFunctions(repositories))

export {applicationsController}

