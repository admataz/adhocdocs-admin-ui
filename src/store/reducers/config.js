import { CONFIG_LOADED } from '../actions/lib/constants'
const defaultState = {
  apiBaseUrl: '/api',
  settings: {
    endpoint: '/'
  }
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case CONFIG_LOADED:
      return { ...action.data }
    default:
      return state
  }
}
