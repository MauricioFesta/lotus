import React from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { AppToaster } from "../../others/toaster"
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../navbar/index"
import { postCurriculo } from "../../stores/curriculo/api"
import $ from "jquery";
import { v4 as uuidv4 } from 'uuid';



export class Cadastro extends React.Component {

  constructor(props) {
    super(props);
   
  }

  cadastrar = async () => {

    let formData = new FormData();

    let file = document.querySelector('#file');

    formData.append("id", uuidv4());
    formData.append("principal", true);
    formData.append("file", file.files[0]);
    formData.append("descricao", $("#curriculotext").val());


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

    if (res.status === 200) {

      AppToaster.show({message: "Currículo cadastrada com sucesso!", intent: "success" });

    } else {
      AppToaster.show({message: "Não foi possível cadastrar o currículo", intent: "danger" });
    }
  }

  getMin() {

    let date = new Date();

    return date.getMinutes()

  }

  render() {

    return (

      <>

        <div className='container mt-4 main'>

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

      </>

    );
  }
}