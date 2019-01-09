import axios from 'axios'
import { getConfigEndpoint } from '../../selectors'
import { REQUEST_PURE_SCHEMA, RECEIVE_PURE_SCHEMA, REQUEST_ITEMSCHEMA, RECEIVE_ITEMSCHEMA } from '../lib/constants'

export const requestPureSchema = schema => ({
  type: REQUEST_PURE_SCHEMA,
  schema,
})

export const receivePureSchema = (payload, schema) => ({
  type: RECEIVE_PURE_SCHEMA,
  payload,
  schema,
})

export const fetchPureSchema = schemaName => (dispatch, getState) => {
  const state = getState()
  const path = `${getConfigEndpoint(state)}/schema/${schemaName}/pure`
  dispatch(requestPureSchema(schemaName))
  return axios
    .get(path)
    .then(response => response.data)
    .then(data => dispatch(receivePureSchema(data, schemaName)))
}

export const requestItemSchema = schema => ({
  type: REQUEST_ITEMSCHEMA,
  schema,
})

export const receiveItemSchema = (payload, schema) => ({
  type: RECEIVE_ITEMSCHEMA,
  payload,
  schema,
})
/**
 * Get the json-schema for a content type
 *
 */
export const fetchItemSchema = schema => (dispatch, getState) => {
  const state = getState()
  const path = `${getConfigEndpoint(state)}/schema/${schema}`
  dispatch(requestItemSchema(schema))
  return axios
    .get(path)
    .then(response => response.data)
    .then(data => dispatch(receiveItemSchema(data, schema)))
}
