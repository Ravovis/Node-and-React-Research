import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class EditDocument extends Component {

  constructor(props) {
    super(props)

    this.onChangeText = this.onChangeText.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // State
    this.state = {
      text: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4000/id?' + this.props.match.params.id)
      .then(res => {
        this.setState({
          text: res.data.text,
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeText(e) {
    this.setState({ text: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()

    const documentObject = {
      text: this.state.text
    };

    axios.put('http://localhost:4000/update?id=' + this.props.match.params.id, documentObject)
      .then((res) => {
        console.log(res.data)
        console.log('Document successfully updated')
      }).catch((error) => {
        console.log(error)
      })

    // Redirect to Document List 
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
          Update Document
        </Button>
      </Form>
    </div>);
  }
}
