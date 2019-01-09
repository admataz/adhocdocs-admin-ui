/**
 * List the items  -
 *
 * TODO: check a way to validate the types for arrays
 */
import React from 'react'
import T from 'prop-types'
import {Link} from 'react-router-dom'
import Form from 'react-jsonschema-form'
import {reduce, intersection} from 'lodash'

// import * as uiSchema from '../lib/form-ui-schema'

export default class ItemList extends React.Component {
  static propTypes = {
    schemaName: T.string,
    items: T.array,
    schema: T.object
  }

  constructor () {
    super()

    this.state = {
      showFilters: false,
      listFilter: {},
      searchFilter: ''
    }
  }

  toggleFilter = (evt) => {
    evt.preventDefault()
    const showFilters = !this.state.showFilters
    this.setState({showFilters})
  }

  onFilterChange = (evt) => {
    this.setState({listFilter: {...evt.formData}})
  }

  setFilteredListItems = () => {
    const filterInput = reduce(this.state.listFilter, (result, value, key) => [...result, ...value], [])
    return this.props.items.filter((itm) => {
      if (this.state.searchFilter.length) {
        if (!itm.content.title.toLowerCase().includes(this.state.searchFilter.toLowerCase())) {
          return false
        }
      }

      if (!filterInput.length) {
        return true
      }
      const itemRelated = reduce(itm.related, (result, value, key) => [...result, ...value], [])
      return intersection(filterInput, itemRelated).length === filterInput.length
    })
  }

  onSearchFilter = (evt) => {
    this.setState({
      searchFilter: evt.target.value
    })
  }

  render () {
    const {schemaName} = this.props
    const filteredList = this.setFilteredListItems()

    return <div className="items-list">
      <div className="row">
        <div className="col-md-12">
          <Link to={`/editor/${schemaName}`} className="btn btn-primary btn-xs"><span className="glyphicon glyphicon-plus" aria-hidden="true" /> New item</Link>
          <h2>{schemaName}</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          {this.props.schema && this.props.schema.body.properties.related &&
          <button className="btn btn-secondry btn-xs" onClick={this.toggleFilter}><span className="glyphicon glyphicon-plus" aria-hidden="true" /> Filter</button>
          }
        </div>
      </div>
      
      <div className="row">
        <div className="col-md-6">

          {this.props.schema && this.state.showFilters &&
          <div className="filterList">
            <Form
              schema={this.props.schema.body.properties.related}
              uiSchema={this.props.schema.ui}
              formData={this.state.listFilter}
              onChange={this.onFilterChange}>
              <button ref={(btn) => { this.submitButton = btn }} className="hidden" />
            </Form>
          </div>
          }

        </div>

        <div className="col-md-6">
          <input type="text" onChange={this.onSearchFilter} defaultValue={this.state.searchFilter} placeholder="Search..." />
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <table className="table table-hover"><tbody>
            {filteredList &&
        filteredList.map((item, index) => <tr className="item" key={index}>
          <td>
            <Link to={`/editor/${schemaName}/${item.id}`} >
              <span className="glyphicon glyphicon-pencil" />
              <span> {item.content.title}</span>
            </Link></td>
        </tr>)
            }
          </tbody>
          </table>
        </div>
      </div>
    </div>
  }
}
