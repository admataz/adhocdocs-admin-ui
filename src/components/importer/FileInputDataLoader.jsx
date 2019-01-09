// import React from 'react'
// export default () => <div>Hey?</div>

import React, { useState } from 'react'
import T from 'prop-types'
import { noop } from 'lodash'
import FileInputReader from './FileInputReader'


function FileInputDataLoader({ dispatchFileData }) {
  const [fileContents, setFileContents] = useState(null)

  const onClickGo = () => {
    if (fileContents) {
      dispatchFileData(fileContents)
    }
  }

  const onFileSelected = fileData => {
    setFileContents(fileData)
  }

  return (
    <React.Fragment>
      <FileInputReader onFileDataLoaded={onFileSelected} />
      <button className="btn" onClick={onClickGo}>
        Go!
      </button>
    </React.Fragment>
  )
}

FileInputDataLoader.propTypes = {
  dispatchFileData: T.func,
}

FileInputDataLoader.defaultProps = {
  dispatchFileData: noop,
}

export default FileInputDataLoader

