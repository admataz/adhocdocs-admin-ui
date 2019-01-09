import axios from 'axios'
import { toastr } from 'react-redux-toastr'

import { REQUEST_DELETE_ITEM, CONFIRM_DELETE_ITEM } from '../lib/constants'
import { axiosPermissionedRequestConfig } from '../lib/utils'
import { getConfigEndpoint } from '../../selectors'

import { fetchAllSchema } from '../schema'
import { setAppState } from '../app'

export const requestDeleteItem = (schema, id) => ({
  type: REQUEST_DELETE_ITEM,
  schema,
  id,
})

export const confirmDeleteItem = (schema, id, message) => ({
  type: CONFIRM_DELETE_ITEM,
  schema,
  id,
  message,
})

export const deleteItem = (schema, id, history) => (dispatch, getState) => {
  const state = getState()
  const path = `${getConfigEndpoint(state)}/documents/${id}`
  dispatch(requestDeleteItem(schema, id))
  return axios
    .delete(path, axiosPermissionedRequestConfig(state))
    .then(response => response.data)
    .then(data => dispatch(confirmDeleteItem(schema, id)))
    .then(() => dispatch(fetchAllSchema()))
    .then(() => history.push(`/list/${schema}`))
    .then(() => dispatch(setAppState('list', schema)))
    .then(() => toastr.info('Item Deleted', 'Hooray!'))
}
