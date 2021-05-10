import React from 'react';
import { Form, Button, Alert, Toast, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../navbar/index"
import axios from 'axios'
import $ from "jquery";




export class Cadastro extends React.Component {

  constructor(props) {
    super(props);
    this.state = { close_msg: true, variant: "primary", text: "null" };
    this.cadastrar = this.cadastrar = this.cadastrar.bind(this);

  }

  closeToasts() {
    this.setState({ close_msg: false });
  }

  async cadastrar() {

    let params = {
      desc: $("#curriculotext").val(),
      file: $("#file").file
    }

    let config = {
      headers: { "Content-Type": "multipart/form-data" }
    }

 
    let result = await axios.post("/curriculo/cadastro", params,config);


  }

  getMin() {

    let date = new Date();

    return date.getMinutes()

  }

  render() {

    return (

      <div>

        <Navbar />

        <div className='container mt-4 main'>

          <Col xs={6}>
            <Toast onClose={() => this.closeToasts()} show={this.state.close_msg} delay={4000} autohide>
              <Toast.Header>
                <img
                  src="holder.js/20x20?text=%20"
                  className="rounded mr-2"
                  alt=""
                />
                <strong className="mr-auto">Parabéns</strong>
                <small>{this.getMin()} mins ago</small>
              </Toast.Header>
              <Toast.Body>Curriculo cadastrado com sucesso!</Toast.Body>
            </Toast>
          </Col>

          <Form id="form-curriculo" className="mt-4">

            <Form.Group>
              <Form.File id="file" label="Curriculo" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Descrição</Form.Label>
              <Form.Control id="curriculotext" as="textarea" rows={3} />
            </Form.Group>
            <Button onClick={this.cadastrar} variant="primary" type="button">
              Cadastrar
              </Button>

          </Form>

        </div>

      </div>

    );
  }
}