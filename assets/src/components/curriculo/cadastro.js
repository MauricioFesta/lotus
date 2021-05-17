import React from 'react';
import { Form, Button, Alert, Toast, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../navbar/index"
import {postCurriculo} from "../../model/curriculo/api"
import $ from "jquery";




export class Cadastro extends React.Component {

  constructor(props) {
    super(props);
    this.state = { close_msg: false, variant: "primary", msg_text: "", msg_title: "" };
    this.cadastrar = this.cadastrar.bind(this);

  }

  closeToasts() {
    this.setState({ close_msg: false });
  }

  async cadastrar() {

    let formData = new FormData();

    let file = document.querySelector('#file');

    formData.append("file", file.files[0]);
    formData.append("desc", $("#curriculotext").val());
  

    let config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }

    let json = {
      formData,
      config
    }

     let res = await postCurriculo(json)

    if(res.status === 200){

      this.setState({ close_msg: true, msg_text:"Currículo cadastrado com sucesso!", msg_title: "Parabéns" });

      
    }else{
      this.setState({ close_msg: true, msg_text:"Não foi possível cadastrar o currículo", msg_title: "Error!!" });

    }
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
            <Toast onClose={() => this.closeToasts()} show={this.state.close_msg} delay={6000} autohide>
              <Toast.Header>
                <img
                  src="holder.js/20x20?text=%20"
                  className="rounded mr-2"
                  alt=""
                />
                <strong className="mr-auto">{this.state.msg_title}</strong>
                <small>{this.getMin()} mins ago</small>
              </Toast.Header>
              <Toast.Body>{this.state.msg_text}</Toast.Body>
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