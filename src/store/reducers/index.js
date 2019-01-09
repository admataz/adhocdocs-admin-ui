import appState from './appState'
import appData from './appData'
import config from './config'
import { reducer as toastr } from 'react-redux-toastr'

export default (state = {}, action) => ({
  config: config(state.config, action),
  app: appState(state.app, action),
  data: appData(state.data, action),
  toastr: toastr(state.toastr, action),
})
