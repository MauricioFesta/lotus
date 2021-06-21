import React from 'react';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/index.css';
import $ from "jquery";
import { postCadastroUser } from "../../stores/login/api"
import { AppToaster } from "../../others/toaster"
import { v4 as uuidv4 } from 'uuid';



export default class Cadastro extends React.Component {

  constructor(props) {
    super(props);
  
  }

   cadastrar = async () => {

    let data = {
      id: uuidv4(),
      nome: $("#nome").val(),
      email: $("#email").val(),
      senha: $("#senha").val(),
      is_empresa: $("#conta-corporativa").prop("checked").toString()

    }

    let res = await postCadastroUser(data)

    if (res.data == "Ok") {

      AppToaster.show({message: "Usuário cadastrado com sucesso", intent: "success" });

    } else {

      AppToaster.show({message: "Não foi possível cadastrar o usuário Erro", intent: "danger" });

    }

  }

  render() {

    return (

      <div className='container mt-4 main'>

        <Form>
      
          <Form.Group>
            <Form.Label>Nome ou Razão Social</Form.Label>
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
          <Form.Group>
            <Form.Check
              type="switch"
              id="conta-corporativa"
              label="Conta corporativa ?"
            />
          </Form.Group>

          <Button onClick={this.cadastrar} variant="primary" type="button">
            Cadastrar
            </Button>

        </Form>

      </div>

    );
  }
}