import React from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/index.css';
import $ from "jquery";
import { Link } from 'react-router-dom';
import { getUser } from "../../model/login/api"


export default class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = { msg: true, variant: "warning", text: "null" };
    this.validaLogin = this.validaLogin = this.validaLogin.bind(this);

  }

  async validaLogin() {

    let data = {

      email: $("#email").val(),
      senha: $("#senha").val()

    }

    let res = await getUser(data)

    if (res.data == "Ok") {
      window.location.href = "/home";
    } else {

      this.setState({
        msg: false,
        text: "Usuário ou senha inválidos"

      })

    }

  }

  render() {
    return (

      <div className='container mt-4 main'>


        <Alert id="msg_retorno" hidden={this.state.msg} variant={this.state.variant}>
          {this.state.text}
        </Alert>

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