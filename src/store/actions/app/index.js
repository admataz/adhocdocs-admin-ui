import { CONFIG_LOADED, APP_STATE_CHANGED } from '../lib/constants'

export const configLoaded = data => {
  return {
    type: CONFIG_LOADED,
    data: data,
  }
}

export const setAppState = (view, schema, itemId = null) => ({
  type: APP_STATE_CHANGED,
  schema,
  view,
  itemId,
})
