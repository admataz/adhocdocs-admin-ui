import Form from 'react-jsonschema-form'
import React from 'react'
import T from 'prop-types'
import { Link } from 'react-router-dom'

export default class ItemEditor extends React.Component {
  static propTypes = {
    schemaName: T.string,
    schema: T.object,
    formData: T.object,
    itemSaved: T.func,
    itemDeleted: T.func
  }
  static defaultProps = {
    formData: {}
  }
  constructor (props) {
    super(props)
    this.state = {
      confirmingDeleteAction: false
    }
    this.confirmDeleteCheckbox = null
  }

  onTriggerDeleteItem = (evt) => {
    evt.preventDefault()
    this.setState({
      confirmingDeleteAction: true
    })
  }

  onConfirmDeleteItem = (evt) => {
    evt.preventDefault()
    if (this.confirmDeleteCheckbox.checked) {
      this.props.itemDeleted()
    }
  }

  render () {
    const {formData, schema, itemSaved, schemaName} = this.props
    const {confirmingDeleteAction} = this.state
    formData.related = formData.related || {}
    return (
      <div>
        <Link className="btn btn-primary btn-xs" to={`/list/${schemaName}`}><span className="glyphicon glyphicon-circle-arrow-left" /> {schemaName}</Link>
        <Link to={`/editor/${schemaName}`} className="btn btn-primary btn-xs"><span className="glyphicon glyphicon-plus" aria-hidden="true" /> New item</Link>
        {schema &&
        <Form
          schema={schema.body}
          formData={formData || {}}
          uiSchema={schema.ui}
          onSubmit={itemSaved} />
        }
        {confirmingDeleteAction
          ? <div>
            <input ref={ref => { this.confirmDeleteCheckbox = ref }} type="checkbox" />
            <button className="btn btn-secondary" onClick={this.onConfirmDeleteItem}>Confirm delete</button>
          </div>
          : <button className="btn btn-secondary" onClick={this.onTriggerDeleteItem}>Delete</button>
        }
      </div>
    )
  }
}
