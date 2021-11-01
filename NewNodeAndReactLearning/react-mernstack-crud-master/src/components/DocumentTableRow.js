import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

export default class DocumentTableRow extends Component {

    constructor(props) {
        super(props);
        this.deleteDocument = this.deleteDocument.bind(this);
    }

    deleteDocument() {
        axios.delete('http://localhost:4000/delete?id=' + this.props.obj._id)
            .then((res) => {
                console.log('Document successfully deleted!')
            }).catch((error) => {
                console.log(error)
            })
            
    }

    render() {
        
        return (
            <tr>
                <td>{this.props.obj.text}</td>
                <td>
                    <Link className="edit-link" to={"/edit-document/" + this.props.obj._id}>
                        Edit
                    </Link>
                    <Button onClick={this.deleteDocument} size="sm" variant="danger">Delete</Button>
                </td>
            </tr>
        );
    }
}