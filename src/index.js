import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import { configLoaded, fetchAllSchema } from './store/actions'

import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

async function init(){
  // await store.dispatch(configLoaded())
  await store.dispatch(fetchAllSchema())
  render(<Provider store={store}>
    <App />
    </Provider>, document.getElementById('root'))
}


init()


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
