import React from 'react'
import { Link } from 'react-router-dom'

export default props => (
  <div>
    <h1>Dashboard</h1>
    <ul>
      <li>
        <Link className="nav-link" to="/data-importer">
          Data importer (JSON)
        </Link>
      </li>
    </ul>
  </div>
)
