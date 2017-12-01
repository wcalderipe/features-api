import {map, pick} from 'ramda'

const applicationService = ({applicationRepository, featureRepository, parameterRepository}) => ({
  createDocumentById: createDocumentById.bind(null, {
    applicationRepository,
    featureRepository,
    parameterRepository
  })
})

const createDocumentById = async (repositories, id) => {
  const application = await repositories.applicationRepository.findById(id)
  const features = await repositories.featureRepository.findByApplicationId(id)
  const featureWithParameters = await Promise.all(
    map(addParameters(repositories.parameterRepository), features)
  )

  return {
    ...pick(['name'], application),
    features: featureWithParameters
  }
}

const addParameters = (parameterRepository) => async (feature) => {
  const parameters = await parameterRepository.findByFeatureId(feature.id)

  return {
    ...pick(['name'], feature),
    parameters: map(parseRuleJSON, parameters)
  }
}

const parseRuleJSON = ({rule_json}) => JSON.parse(rule_json)

export {applicationService}
