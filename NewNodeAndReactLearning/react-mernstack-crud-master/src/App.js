import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";




import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import CreateDocument from "./components/create-document.component";
import EditDocument from "./components/edit-document.component";
import DocumentList from "./components/document-list.component";

import { useSelector,useDispatch } from 'react-redux'
import { decrement, increment } from './actions'


function App() {
  const counter = useSelector ( state => state.counterReducer );
  const dispatch = useDispatch();

  const socket = new WebSocket('ws://localhost:8080');

  socket.onmessage = ({data}) =>{
    console.log('Message from server', data);
  };

  setInterval(()=>{socket.send('hello')},10000)

  return (<Router>
    <div>
      <h1>Counter {counter}</h1>
      <button onClick={()=>dispatch(increment())}>+</button>
      <button onClick={()=>dispatch(decrement())}>-</button>
      </div>
      <div className="App">
      <header className="App-header">
        <Navbar bg="dark" variant="dark">
          <Container>

            <Navbar.Brand>
              <Link to={"/create-document"} className="nav-link">
                React MERN Stack App
              </Link>
            </Navbar.Brand>

            <Nav className="justify-content-end">
              <Nav>
                <Link to={"/create-document"} className="nav-link">
                  Create document
                </Link>
              </Nav>

              {/* <Nav>
                <Link to={"/edit-document/:id"} className="nav-link">
                  Edit document
                </Link>
              </Nav> */}

              <Nav>
                <Link to={"/document-list"} className="nav-link">
                Document List
                </Link>
              </Nav>
            </Nav>

          </Container>
        </Navbar>
      </header>

      <Container>
        <Row>
          <Col md={12}>
            <div className="wrapper">
              <Switch>
                <Route exact path='/' component={CreateDocument} />
                <Route path="/create-document" component={CreateDocument} />
                <Route path="/edit-document/:id" component={EditDocument} />
                <Route path="/document-list" component={DocumentList} />
              </Switch>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
   
  </Router>);
}

export default App;