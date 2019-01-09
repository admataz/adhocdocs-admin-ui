import axios from 'axios'
import { toastr } from 'react-redux-toastr'

import { REQUEST_SAVE_ITEM, CONFIRM_SAVE_ITEM } from '../lib/constants'
import { getConfigEndpoint } from '../../selectors'
import { axiosPermissionedRequestConfig } from '../lib/utils'

import { fetchAllSchema } from '../schema'
import { setAppState } from '../app'

export const requestSaveItem = (schema, id, payload) => ({
  type: REQUEST_SAVE_ITEM,
  schema,
  payload,
})

export const confirmSaveItem = (schema, id, payload, message) => ({
  type: CONFIRM_SAVE_ITEM,
  schema,
  payload,
  id,
  message,
})

export const updateItem = (schema, payload, id) => (dispatch, getState) => {
  const state = getState()
  const path = `${getConfigEndpoint(state)}/documents/${id}`
  dispatch(requestSaveItem(schema, id, payload))
  return axios
    .put(path, payload, axiosPermissionedRequestConfig(state))
    .then(response => response.data)
    .then(data => dispatch(confirmSaveItem(schema, id, data)))
    .then(() => toastr.info('Item Saved', 'Hooray!'))
}

export const createItem = (schema, payload, history) => (dispatch, getState) => {
  const state = getState()
  const path = `${getConfigEndpoint(state)}/documents/${schema}`
  const tosave = { ...payload }
  if (Object.keys(tosave).includes('id')) {
    delete tosave.id
  }
  dispatch(requestSaveItem(schema, tosave))
  return axios
    .post(path, tosave, axiosPermissionedRequestConfig(state))
    .then(response => response.data)
    .then(data => {
      dispatch(confirmSaveItem(schema, data.id, data))
      return data.id
    })
    .then(id => {
      return dispatch(fetchAllSchema()).then(() => id)
    })
    .then(id => {
      history.push(`/editor/${schema}/${id}`)
      return id
    })
    .then(id => dispatch(setAppState('editor', schema, id)))
    .then(() => toastr.info('Item Created', 'Hooray!'))
}
export const saveItem = (schema, payload, id, history) => (dispatch, getState) => {
  if (id) {
    return dispatch(updateItem(schema, payload, id))
  }
  return dispatch(createItem(schema, payload, history))
}
