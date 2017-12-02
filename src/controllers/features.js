import {pipe} from 'ramda'
import {withShow} from './withShow'
import {withCreate} from './withCreate'
import {withUpdate} from './withUpdate'
import {withDestroy} from './withDestroy'

const specificFunctions = (repositories) => ({
  parameters: parameters.bind(null, repositories.parameter)
})

const parameters = async (repository, req, res) => {
  const {id} = req.params
  const featureParameters = await repository.findByFeatureId(id)

  return res.json(featureParameters)
}

const featuresController = (repositories) => pipe(
  withShow(repositories.feature),
  withCreate(repositories.feature),
  withUpdate(repositories.feature),
  withDestroy(repositories.feature)
)(specificFunctions(repositories))

export {featuresController}

