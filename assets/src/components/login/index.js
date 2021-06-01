import React from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/index.css';
import $ from "jquery";
import { Link } from 'react-router-dom';
import { getUser } from "../../model/login/api"
import {Redirect } from 'react-router-dom';



import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginIsEmpresa, loginAuth } from '../../actions';

class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = { msg: true, variant: "warning", text: "null", logged: false };
    this.validaLogin = this.validaLogin = this.validaLogin.bind(this);


  }

  async validaLogin() {


    let data = {

      email: $("#email").val(),
      senha: $("#senha").val()

    }

    let res = await getUser(data)

    if (res.data.Ok) {

      if(res.data.is_empresa ===  "true"){
        this.props.loginIsEmpresa(true)
      }

      this.props.loginAuth(true)

      this.setState({ logged: true })

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

        {this.state.logged &&
          <Redirect to={{ pathname: "/home" }} />
        }

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

const mapStateToProps = store => ({
  permissao: store.loginState.permissao
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ loginIsEmpresa, loginAuth }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);

