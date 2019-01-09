import axios from 'axios'
import { toastr } from 'react-redux-toastr'

import { axiosPermissionedRequestConfig } from '../lib/utils'
import { getConfigEndpoint } from '../../selectors'

export const importData = uploadedJSON => (dispatch, getState) => {
  const state = getState()
  const documents = uploadedJSON
  const path = `${getConfigEndpoint(state)}/import/documents`
  return (
    axios
      .post(path, documents, axiosPermissionedRequestConfig(state))
      .then(response => response.data)
      // .then(data => dispatch(confirmSaveSchema(data)))
      .then(data => toastr.info('Bulk items saved', `${data.length} items created`))
      .catch(err => toastr.error(err.response.data.message))
  )
}
