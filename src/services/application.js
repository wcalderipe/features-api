import {map, pick, prop} from 'ramda'

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
    parameters: map(prop('rule'), parameters)
  }
}

export {applicationService}

