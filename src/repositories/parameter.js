import {pipe} from 'ramda'
import {withFindAll} from './composition'

const TABLE_NAME = 'parameters'

const parameterRepository = (knex) => pipe(
  withFindAll(knex, TABLE_NAME)
)({})

export {parameterRepository}

