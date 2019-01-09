import { connect } from 'react-redux'
import { toArray } from 'lodash'
import ItemList from './ItemList'
import { withRouter } from 'react-router'
import { compose } from 'recompose'
import {getCurrentSchema} from '../../store/selectors'

const mapStateToProps = (state, {match: { params: { schemaName }}}) => {
  return {
    items: toArray(state.data.collections[schemaName]),
    schema: getCurrentSchema(state)
  }
}

const enhance = compose(
  withRouter,
  connect(
    mapStateToProps,
    null
  ),
)
export default enhance(ItemList)
