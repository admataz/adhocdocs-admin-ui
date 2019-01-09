import {compose} from 'recompose'


import { connect } from 'react-redux'
import FileInputDataLoader from './FileInputDataLoader'
import { importData } from '../../store/actions'

const mapDispatchToProps = {
  importData,
}

const enhanced = compose(
  connect(null, mapDispatchToProps)
)

export default enhanced(FileInputDataLoader)
