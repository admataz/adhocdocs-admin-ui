import axios from 'axios'

import { REQUEST_ITEMLIST, RECEIVE_ITEMLIST } from '../lib/constants'
import { getConfigEndpoint } from '../../selectors'

export const requestItemList = (path, schema) => ({
  type: REQUEST_ITEMLIST,
  path,
  schema,
})

export const receiveItemList = (payload, schema) => ({
  type: RECEIVE_ITEMLIST,
  payload,
  schema,
})

/**
 *
 * @param {String} path  - the URL that contains the data being loaded
 */
export const fetchListContent = schema => (dispatch, getState) => {
  const state = getState()
  const path = `${getConfigEndpoint(state)}/documents/${schema}`
  dispatch(requestItemList(path, schema))
  return axios
    .get(path)
    .then(response => response.data)
    .then(data => dispatch(receiveItemList(data, schema)))
}
