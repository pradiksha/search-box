import React, { Component } from 'react'

import "./styles.css"


const headerList = ["Id", "Name"]

export default class Dashboard extends Component {
  render() {
    const { list, onEdit } = this.props
    return (
      <div className="ml-10 mr-10">
        <table className="table mt-5 table-bordered text-center table-sm table-striped mx-auto">
          <thead className="table-header">
            <tr>
              {headerList.map(data => <th>{data}</th>)}
            </tr>
          </thead>
          <tbody>
            {
              list.map(data => (
                <tr>
                  <td onClick={() => onEdit(data)}><a href="#" data-toggle="tooltip" title={"Click here to open activity period"}>{data.id}</a></td>
                  <td>{data.real_name}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    )
  }
}
