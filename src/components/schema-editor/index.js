import React from 'react'
import T from 'prop-types'
import { connect } from 'react-redux'

import SchemaEditor from './SchemaEditor'

import {setAppState, saveSchema, fetchPureSchema} from '../../store/actions'
import {getPureSchema} from '../../store/selectors'

const mapStateToProps = (state, ownprops) => {
  return {
    schema: getPureSchema(state)
  }
}

const mapDispatchToProps = (dispatch, ownprops) => {
  return {
    initContent (schemaName) {
      return dispatch(fetchPureSchema(schemaName))
    },
    initState (schemaName) {
      dispatch(setAppState('schema-editor', schemaName))
    },
    schemaSaved ({formData}) {
      dispatch(saveSchema(ownprops.schemaName, formData, ownprops.history))
    },
    // schemaDeleted () {
    //   dispatch(deleteSchema(ownprops.schemaName, ownprops.history))
    // }

  }
}

class SchemaEditorContainer extends React.Component {
  static propTypes = {
    schemaName: T.string,
    initContent: T.func,
    initState: T.func,
    schemaSaved: T.func,
    schemaDeleted: T.func,
    schema: T.object,
    currentAppView: T.string,
    history: T.object
  }

  componentWillMount () {
    this.props.initState(this.props.schemaName)
  }

  componentDidMount () {
    this.props.initContent(this.props.schemaName)
  }

  render () {
    return (<SchemaEditor {...this.props} />)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SchemaEditorContainer)
