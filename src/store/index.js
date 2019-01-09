import { createStore, applyMiddleware, compose } from 'redux'
import reducers from './reducers'
import thunk from 'redux-thunk'

let middleWare = compose(applyMiddleware(thunk))

if (window.devToolsExtension) {
  middleWare = compose(
    middleWare,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
}
const reduxStore = createStore(reducers, middleWare)
export default reduxStore
