import React from 'react';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/index.css';
import axios from 'axios'
import $ from "jquery";
import {Link} from 'react-router-dom';


export default class Login extends React.Component {

  async validaLogin(){

    debugger
      
      let email = $("#email").val();
      let senha = $("#senha").val();
      
      axios.get('/login_valida')
      .then(function (response) {
        debugger
        console.log(response);
      })
    

      //alert(result);


    }

    render() {
      return (

        <div className='container mt-4 main'>

          <Form onSubmit={this.validaLogin} action="/home">
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control id="email" type="email" placeholder="Entre com seu email" />
                <Form.Text className="text-muted">
                  Forneça a o email cadastrado
                </Form.Text>
              </Form.Group>

            <Form.Group>
                <Form.Label>Senha</Form.Label>
                <Form.Control id="senha" type="password" placeholder="Senha" />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
              <Button onClick={this.validaLogin} variant="primary" type="button">
                Logar
              </Button>
              <Form.Text className="text-muted">
                 Não tem cadastro ainda? <Link to="/cadastro">Cadastrar</Link>
                </Form.Text>
        </Form>

        </div>

      );
    }
}