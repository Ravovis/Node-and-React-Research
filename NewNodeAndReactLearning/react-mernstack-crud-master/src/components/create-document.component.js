import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class CreateDocument extends Component {

  constructor(props) {
    super(props)

    // Setting up functions
    this.onChangeText = this.onChangeText.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      text: ''
    }
  }

  onChangeText(e) {
    this.setState({ text: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()

    const documentObject = {
      text: this.state.text
    };

    axios.post('http://localhost:4000/create', documentObject)
      .then(res => console.log(res.data));

    this.setState({
      text: ''
    });

    this.props.history.push('/document-list')
  }

  render() {
    return (<div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="Text">
          <Form.Label>Text</Form.Label>
          <Form.Control type="text" value={this.state.text} onChange={this.onChangeText} />
        </Form.Group>

        <Button variant="danger" size="lg" block="block" type="submit">
          Create document
        </Button>
      </Form>
    </div>);
  }
}
