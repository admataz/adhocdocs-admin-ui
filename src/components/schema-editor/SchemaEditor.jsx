import Form from 'react-jsonschema-form'
import React from 'react'
import T from 'prop-types'
import { Link } from 'react-router-dom'

const schemaSchema = {
  type: 'object',
  properties: {
    schema: {
      title: 'schema body',
      type: 'string',
      default: ''
    },
    ui: {
      title: 'schema Form UI',
      type: 'string',
      default: ''
    }
  }

}

export default class SchemaEditor extends React.Component {
  static propTypes = {
    schemaName: T.string,
    schema: T.object,
    schemaSaved: T.func,
    itemDeleted: T.func
  }
  static defaultProps = {
    schema: {}
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
    const {schema, schemaSaved, schemaName} = this.props
    const {confirmingDeleteAction} = this.state
    const formData = {
      schema: JSON.stringify(schema.body, null, 2),
      ui: JSON.stringify(schema.ui, null, 2)
    }
    const uiSchema = {
      schema: {
        'ui:widget': 'textarea',
        'ui:options': {
          rows: 15
        }
      },
      ui: {
        'ui:widget': 'textarea',
        'ui:help': 'use https://github.com/mozilla-services/react-jsonschema-form to customise input fields',
        'ui:options': {
          rows: 15
        }
      }
    }
    return (
      <div>
        <Link className="btn btn-primary btn-xs" to={`/schema-list/`}><span className="glyphicon glyphicon-circle-arrow-left" /> Schema List</Link>
        <h2>Edit Schema {schemaName}</h2>
        <Form
          schema={schemaSchema}
          formData={formData}
          uiSchema={uiSchema}
          onSubmit={schemaSaved} />
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
