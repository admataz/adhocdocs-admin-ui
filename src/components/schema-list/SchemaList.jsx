/**
 * List the items  - 
 * 
 * TODO: check a way to validate the types for arrays
 */
import React from 'react'
import T from 'prop-types'
import {Link} from 'react-router-dom'

export default class SchemaList extends React.Component {
  static propTypes = {
    items: T.array
  }

  render () {
    const {items} = this.props

    return <div className="items-list">
      <div className="row">
        <div className="col-md-12">
          <Link to={`/schema-editor/`} className="btn btn-primary btn-xs"><span className="glyphicon glyphicon-plus" aria-hidden="true" /> New Schema</Link>
          <h2>Schema</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <table className="table table-hover"><tbody>
            {items &&
            items.map((item, index) => <tr className="item" key={index}>
              <td>
                <Link to={`/schema-editor/${item.name}`} >
                  <span className="glyphicon glyphicon-pencil" />
                  <span> {item.name}</span>
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
