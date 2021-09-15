import React from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { AppToaster } from "../../others/toaster"
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../navbar/index"
import { postCurriculo,postCurriculoForm } from "../../stores/curriculo/api"
import $ from "jquery";
import { v4 as uuidv4 } from 'uuid';
import * as Mui from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CadastroNotPDF from './cadastro_not_pdf'




export class Cadastro extends React.Component {

  constructor(props) {
    super(props);
    this.cadastrar = this.cadastrar.bind(this);

  }

  cadastrar = async (form) => {

   

    let res;

    let formData = new FormData();

    let file = document.querySelector('#file');

    if (file.files.length > 0) {

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

      res = await postCurriculo(json)

    }else{
    
      res = await postCurriculoForm(form)
    }

    if (res.status === 200) {

      AppToaster.show({ message: "Currículo cadastrada com sucesso!", intent: "success" });

    } else {
      AppToaster.show({ message: "Não foi possível cadastrar o currículo", intent: "danger" });
    }
  }

  getMin() {

    let date = new Date();

    return date.getMinutes()

  }

  render() {

    return (

      <>



        <Form id="form-curriculo" className="container mt-4 mb-4">

          <Form.Group>
            <Form.File id="file" label="Curriculo" style={{ display: "none" }} />
          </Form.Group>

          <Form.Group>
            <Mui.Button
              size="small"
              variant="contained"
              color="primary"
              endIcon={<CloudUploadIcon />}
              onClick={() => { $('#file').trigger('click') }}

            >
              Currículo
            </Mui.Button>
          </Form.Group>

          <CadastroNotPDF cadastrar={this.cadastrar} />

        </Form>



      </>

    );
  }
}