import { keyBy } from 'lodash'

import {
  REQUEST_ITEMLIST,
  RECEIVE_ITEMLIST,
  RECEIVE_ITEMSCHEMA,
  REQUEST_ITEMSCHEMA,
  RECEIVE_ALLSCHEMA,
  REQUEST_ALLSCHEMA,
  CONFIRM_SAVE_ITEM,
  CONFIRM_DELETE_ITEM,
  RECEIVE_ITEM,
  RECEIVE_PURE_SCHEMA,
} from '../actions/lib/constants'

export const collections = (state = {}, action) => {
  // immutability! - copy the relevant state and collection before operating on it and returning it (or props won't update!)
  const stateCopy = { ...state }
  let collectionCopy = null // will only copy this if we need to
  switch (action.type) {
    case REQUEST_ITEMLIST:
      stateCopy[action.schema] = {}
      return stateCopy
    case RECEIVE_ITEMLIST:
      stateCopy[action.schema] = keyBy(action.payload.data, 'id')
      return stateCopy
    case RECEIVE_ITEM:
    case CONFIRM_SAVE_ITEM:
      collectionCopy = { ...stateCopy[action.schema] }
      collectionCopy[action.id] = action.payload
      stateCopy[action.schema] = collectionCopy
      return stateCopy
    case CONFIRM_DELETE_ITEM:
      collectionCopy = { ...stateCopy[action.schema] }
      delete collectionCopy[action.id]
      stateCopy[action.schema] = collectionCopy
      return stateCopy
    default:
      return state
  }
}

export const schema = (state = {}, action) => {
  let stateCopy = { ...state }
  switch (action.type) {
    case REQUEST_ITEMSCHEMA:
      stateCopy[action.schema] = null
      return stateCopy
    case RECEIVE_ITEMSCHEMA:
      stateCopy[action.schema] = action.payload
      return stateCopy
    case REQUEST_ALLSCHEMA:
      return {}
    case RECEIVE_ALLSCHEMA:
      return keyBy(action.payload.data, 'name')
    default:
      return state
  }
}

export const pureschema = (state = {}, action) => {
  let stateCopy = { ...state }
  switch (action.type) {
    case RECEIVE_PURE_SCHEMA:
      stateCopy[action.schema] = action.payload
      return stateCopy
    default:
      return state
  }
}

export default (state = {}, action) => ({
  collections: collections(state.collections, action),
  schema: schema(state.schema, action),
  pureschema: pureschema(state.pureschema, action),
})
