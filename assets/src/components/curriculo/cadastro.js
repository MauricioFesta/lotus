import React from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/index.css';
import axios from 'axios'
import $ from "jquery";



export default class Cadastro extends React.Component {

    constructor(props){
      super(props);
      this.state = {msg: true,variant: "primary", text: "null"};
      this.cadastrar = this.cadastrar = this.cadastrar.bind(this);

    }
    
  cadastrar(){

     
    }

    render() {
      return (

        <div className='container mt-4 main'>

          <Form>
                <Alert id="msg_retorno" hidden={this.state.msg}  variant={this.state.variant}>
                    {this.state.text}
                </Alert>
                  
                <Form.Group>
                 <Form.Label>Nome</Form.Label>
                <Form.Control id="nome" type="text" placeholder="Entre com seu nome" />
                   
                </Form.Group>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control id="email" type="email" placeholder="Entre com seu email" />
                <Form.Text className="text-muted">
                  Forneça a o email para cadastro
                </Form.Text>
              </Form.Group>

            <Form.Group>
                <Form.Label>Senha</Form.Label>
                <Form.Control id="senha" type="password" placeholder="Senha" />
            </Form.Group>
              <Button onClick={this.cadastrar} variant="primary" type="button">
                Cadastrar
              </Button>
             
        </Form>

        </div>

      );
    }
}