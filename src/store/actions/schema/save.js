import axios from 'axios'
import { toastr } from 'react-redux-toastr'

import { getConfigEndpoint } from '../../selectors'
import { REQUEST_SAVE_SCHEMA, CONFIRM_SAVE_SCHEMA } from '../lib/constants'
import { axiosPermissionedRequestConfig } from '../lib/utils'
import { fetchAllSchema } from './list'

export const requestSaveSchema = schemaBody => ({
  type: REQUEST_SAVE_SCHEMA,
  schemaBody,
})

export const confirmSaveSchema = schemaBody => ({
  type: CONFIRM_SAVE_SCHEMA,
  schemaBody,
})

export const saveSchema = (schemaName = null, payload, history) => (dispatch, getState) => {
  const schemaBody = JSON.parse(payload.schema)
  const uiBody = JSON.parse(payload.ui)
  if (schemaName) {
    return dispatch(updateSchema(schemaName, schemaBody, uiBody))
  }
  return dispatch(createSchema(schemaBody, uiBody, history))
}

export const createSchema = (schema, ui, history) => (dispatch, getState) => {
  const state = getState()
  const path = `${getConfigEndpoint(state)}/schema`
  dispatch(requestSaveSchema(schema))
  return axios
    .post(path, { schema, ui }, axiosPermissionedRequestConfig(state))
    .then(response => response.data)
    .then(data => dispatch(confirmSaveSchema(data)))
    .then(() => dispatch(fetchAllSchema()))
    .then(id => {
      history.push(`/list-schema`)
      return id
    })
    .then(() => toastr.info('Schema created', 'Hooray!'))
}

export const updateSchema = (schemaName, schema, ui) => (dispatch, getState) => {
  const state = getState()
  const path = `${getConfigEndpoint(state)}/schema/${schemaName}`
  dispatch(requestSaveSchema(schema))
  return axios
    .put(path, { schema, ui }, axiosPermissionedRequestConfig(state))
    .then(response => response.data)
    .then(data => dispatch(confirmSaveSchema(data)))
    .then(() => toastr.info('Schema Saved', 'Hooray!'))
    .catch(err => toastr.error(err.response.data.message))
}
