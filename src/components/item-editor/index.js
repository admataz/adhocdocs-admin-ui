import React from 'react'
import T from 'prop-types'
import { connect } from 'react-redux'
import ItemEditor from './ItemEditor'

import {setAppState, fetchItemContent, saveItem, deleteItem} from '../../store/actions'
import {getCurrentItem, getCurrentSchema, getCurrentView} from '../../store/selectors'

const mapStateToProps = (state, ownprops) => {
  return {
    formData: getCurrentItem(state),
    schema: getCurrentSchema(state),
    currentAppView: getCurrentView(state)
  }
}

const mapDispatchToProps = (dispatch, ownprops) => {
  return {
    initContent (schema, id) {
      return dispatch(fetchItemContent(schema, id))
    },
    initState (schema, id) {
      dispatch(setAppState('editor', schema, id))
    },
    itemSaved ({formData}) {
      dispatch(saveItem(ownprops.schemaName, formData, ownprops.id, ownprops.history))
    },
    itemDeleted () {
      dispatch(deleteItem(ownprops.schemaName, ownprops.id, ownprops.history))
    }
  }
}

class ItemEditorContainer extends React.Component {
  static propTypes = {
    schemaName: T.string,
    id: T.string,
    initContent: T.func,
    initState: T.func,
    itemSaved: T.func,
    itemDeleted: T.func,
    schema: T.object,
    formData: T.object,
    currentAppView: T.string,
    history: T.object
  }

  componentWillMount () {
    this.props.initState(this.props.schemaName, this.props.id)
    this.props.initContent(this.props.schemaName, this.props.id)
  }

  render () {
    return (this.props.schema ? <ItemEditor {...this.props} /> : <div />)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemEditorContainer)
