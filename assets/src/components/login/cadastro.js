import React from 'react';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/index.css';
import axios from 'axios'
import $ from "jquery";


export default class Cadastro extends React.Component {

  async cadastrar(){
      
      let email = $("#email").val();
      let senha = $("#senha").val();
      let nome = $("#nome").val();
      
      axios.post('/cadastro_login', {
        nome: 'teste',
        email: 'Fred',
        senha: 'Flintstone'
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    }

    render() {
      return (

        <div className='container mt-4 main'>

          <Form>
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
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
              <Button onClick={this.cadastrar} variant="primary" type="button">
                Cadastrar
              </Button>
             
        </Form>

        </div>

      );
    }
}