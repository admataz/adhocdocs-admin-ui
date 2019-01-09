import axios from 'axios'
import { getConfigEndpoint } from '../../selectors'
import { REQUEST_ALLSCHEMA, RECEIVE_ALLSCHEMA } from '../lib/constants'

export const requestAllSchema = () => ({
  type: REQUEST_ALLSCHEMA,
})

export const receiveAllSchema = payload => ({
  type: RECEIVE_ALLSCHEMA,
  payload,
})

export const fetchAllSchema = () => (dispatch, getState) => {
  const state = getState()
  const path = `${getConfigEndpoint(state)}/schema`
  dispatch(requestAllSchema())
  return axios
    .get(path)
    .then(response => response.data)
    .then(data => dispatch(receiveAllSchema(data)))
}
