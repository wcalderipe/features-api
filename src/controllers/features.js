import {pipe} from 'ramda'
import {withShow} from './withShow'
import {withCreate} from './withCreate'
import {withUpdate} from './withUpdate'
import {withDestroy} from './withDestroy'

const featuresController = (repository) => pipe(
  withShow(repository),
  withCreate(repository),
  withUpdate(repository),
  withDestroy(repository)
)({})

export {featuresController}

