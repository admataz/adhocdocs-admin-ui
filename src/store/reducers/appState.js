import { APP_STATE_CHANGED } from '../actions/lib/constants'
const defaultAppState = {
  schema: null,
  view: null,
  itemId: null,
}

const makeAppState = (state = defaultAppState, action) => {
  const stateCopy = { ...state }
  switch (action.type) {
    case APP_STATE_CHANGED:
      stateCopy.schema = action.schema || null
      stateCopy.view = action.view || null
      stateCopy.itemId = action.itemId || null
      return stateCopy
    default:
      return state
  }
}

export default makeAppState
