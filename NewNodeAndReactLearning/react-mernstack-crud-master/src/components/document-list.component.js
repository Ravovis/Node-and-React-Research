import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import DocumentTableRow from './DocumentTableRow';


export default class DocumentsList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      documents: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:4000/all/')
      .then(res => {
        this.setState({
          documents: res.data
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  DataTable() {
    return this.state.documents.map((res, i) => {
      return <DocumentTableRow obj={res} key={i} />;
    });
  }


  render() {
    return (<div className="table-wrapper">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Text</th>
          </tr>
        </thead>
        <tbody>
          {this.DataTable()}
        </tbody>
      </Table>
    </div>);
  }
}