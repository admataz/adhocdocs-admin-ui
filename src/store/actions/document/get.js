import axios from 'axios'
import { REQUEST_ITEM, RECEIVE_ITEM } from '../lib/constants'
import { getConfigEndpoint } from '../../selectors'

import { fetchItemSchema } from '../schema'

export const requestItemContent = (schema, id) => ({
  type: REQUEST_ITEM,
  schema,
  id,
})

export const receiveItemContent = (schema, id, payload) => ({
  type: RECEIVE_ITEM,
  schema,
  id,
  payload,
})

// do a find in the collection to return the item data
export const fetchItemContent = (schema, id) => (dispatch, getState) => {
  const state = getState()
  const path = `${getConfigEndpoint(state)}/documents/${id}`
  dispatch(requestItemContent(schema, id))
  return dispatch(fetchItemSchema(schema)).then(() => {
    if (id) {
      return axios.get(path).then(data => dispatch(receiveItemContent(schema, id, data.data)))
    }
  })
}
