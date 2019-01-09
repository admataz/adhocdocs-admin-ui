import React, { useRef } from 'react'
import T from 'prop-types'

function FileInputReader({ onFileDataLoaded }) {
  const fileInput = useRef(null)
  const reader = new FileReader()

  const onFileLoaded = () => {
    try {
      onFileDataLoaded(reader.result)
    } catch (error) {
      console.error('There was a problem reading the file', error.message)
    }
  }

  const onSelectFile = () => {
    const file = fileInput.current.files[0]
    reader.addEventListener('load', onFileLoaded, false)
    if (file) {
      reader.readAsBinaryString(file)
    }
  }

  return (
    <React.Fragment>
      <input type="file" ref={fileInput} onChange={onSelectFile} />
    </React.Fragment>
  )
}

FileInputReader.propTypes = {
  onFileDataLoaded: T.func,
}

FileInputReader.defaultProps = {
  onFileDataLoaded: fileData => console.log(fileData),
}

export default FileInputReader
