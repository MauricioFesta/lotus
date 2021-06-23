import React from 'react';
import { Col, Alert } from 'react-bootstrap';
import { getCurriculo, getDownload, postExcluir } from "../../stores/curriculo/api";
import { Link } from 'react-router-dom';
import { AppToaster } from "../../others/toaster"
import * as Mui from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import { Card, Icon, Image } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Figure, Jumbotron, Container, Row, Form } from 'react-bootstrap';
require("./css/style.scss")

const styleButomDelete = {
  color: '#ff5252',

};

const styleButomPrincipal = {
  color: '#ff5252',

};

export default class Curriculo extends React.Component {

  constructor(props) {
    super(props);

    this.state = { showItems: false, dataCurriculo: [], variant: "primary", msg_text: "", msg_title: "", close_msg: false };
  }

  async componentDidMount() {

    let res = await getCurriculo()

    if (res.data.length > 0) {
      this.setState({ showItems: true, dataCurriculo: res.data })
    }


  }


  render() {


    const excluir_Pdf = async (el) => {

      let res = await postExcluir(el)

      if (res.data === "Ok") {

        AppToaster.show({ message: "Curriculo deletado com sucesso", intent: "success" });
        this.componentDidMount()

      }

    }
    async function download_Pdf(el) {

      let res = await getDownload(el)

      window.open(`/pdf_tmp/${res.data}`, false)


    }

    function curriculoPrincipal(id) {
      return (
        <Mui.IconButton style={styleButomPrincipal}   color="primary" aria-label="upload picture" component="span">
          <DoneAllIcon/>
        </Mui.IconButton>

      )
    }

    function  excluirFormatter(id) {
      return (
        <Mui.IconButton style={styleButomDelete} onClick={() => { excluir_Pdf(id) }} color="primary" aria-label="upload picture" component="span">
          <DeleteIcon />
        </Mui.IconButton>

      )
    }


    function downloadFormatter(id) {
      return (
        <Mui.IconButton onClick={() => { download_Pdf(id) }} color="primary" aria-label="upload picture" component="span">
          <GetAppIcon />
        </Mui.IconButton>

      );
    }

    return (

      <>

        <Container className="mt-4">

          <Jumbotron className="mt-4">

            <Link className="mb-6" to="curriculo/cadastro">Cadastrar Currículo</Link>
            <Card.Group>
              {this.state.showItems ?

                this.state.dataCurriculo.map(el => {

                  return (

                    <Card className="mt-4">
                      <Image src='data:image/jpeg;base64,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' wrapped ui={false} />
                      <Card.Content>
                        <Card.Header>{el.descricao}</Card.Header>
                        <Card.Meta>Cadastrado em 2021</Card.Meta>
                        <Card.Description>
                          {el.descricao}
                        </Card.Description>
                      </Card.Content>

                      <Card.Content extra>
                        {downloadFormatter(el.id)}
                       {excluirFormatter(el.id)}
                       {curriculoPrincipal(el.id)}
                      </Card.Content>
                    </Card>



                  )
                })

                :

                <Alert variant="info" className="mt-4">
                  Não há curriculos cadastrados!
                <Link to="curriculo/cadastro"> Clique aqui para cadastrar!</Link> :)
                </Alert>

              }

            </Card.Group>

          </Jumbotron>
        </Container>

      </>

    );
  }
}