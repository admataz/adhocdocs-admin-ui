import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { compose } from 'recompose'
import { toArray } from 'lodash'
import SchemaList from './SchemaList'

const mapStateToProps = (state, ownprops) => {
  return {
    items: toArray(state.data.schema)
  }
}

const enhance = compose(
  withRouter, 
  connect(
    mapStateToProps,
    null
  )
)

export default enhance(SchemaList)
