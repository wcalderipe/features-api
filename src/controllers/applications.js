import {pipe} from 'ramda'
import {withList} from './withList'
import {withShow} from './withShow'
import {withCreate} from './withCreate'
import {withUpdate} from './withUpdate'
import {withDestroy} from './withDestroy'

const applicationsController = (repository) => pipe(
  withList(repository),
  withShow(repository),
  withCreate(repository),
  withUpdate(repository),
  withDestroy(repository)
)({})

export {applicationsController}

