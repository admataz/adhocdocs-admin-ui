import React, {Component} from 'react'
// import logo from './logo.svg';
import './App.css'

import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import ReduxToastr from 'react-redux-toastr'
import 'react-redux-toastr/src/styles/index.scss'
import Dashboard from './components/dashboard'
import ItemsList from './components/items-list'
import ItemEditor from './components/item-editor'
import SchemaList from './components/schema-list'
import SchemaEditor from './components/schema-editor'
import Importer from './components/importer'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <nav className="">
            <ul className="nav navbar-nav nav-pills">
              <li>
                <Link className="nav-link" to="/">
                  Dashboard
                </Link>
              </li>
              <li key={1}>
                <Link className="nav-link" to={`/list/schemaName`}>
                  Schema - type
                </Link>
              </li>
            </ul>
          </nav>
          <div className="mainContent">
            <Route path="/data-importer" component={Importer} />
            <Route path="/list/:schemaName" component={ItemsList} />
            <Route path="/list-schema" component={SchemaList} />
            <Route path="/editor/:schemaName/:itemId?" component={ItemEditor} />
            <Route
              path="/schema-editor/:schemaName?"
              component={SchemaEditor}
            />
            <Route exact path="/" component={Dashboard} />
          </div>
          <div className="containter">
            <ReduxToastr
              timeOut={4000}
              newestOnTop={false}
              preventDuplicates
              position="top-right"
              transitionIn="bounceIn"
              transitionOut="fadeOut"
            />
          </div>
        </div>
      </Router>
    )
  }
}

export default App
