import React from 'react';
import { Col, Alert } from 'react-bootstrap';
import { getCurriculo, getDownload, postExcluir } from "../../stores/curriculo/api";
import { Link } from 'react-router-dom';
import { AppToaster } from "../../others/toaster"
import * as Mui from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import DeleteIcon from '@material-ui/icons/Delete';
import { Card, Icon, Image } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Figure, Jumbotron, Container, Row, Form } from 'react-bootstrap';
require("./css/style.scss")

const styleButomDelete = {
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

    function excluirFormatter(id) {
      return (
        <Mui.IconButton size="small" style={styleButomDelete} onClick={() => { excluir_Pdf(id) }} color="primary" aria-label="upload picture" component="span">
          <DeleteIcon />
        </Mui.IconButton>

      )
    }

    function downloadFormatter(id) {
      return (
        <Mui.IconButton size="small" onClick={() => { download_Pdf(id) }} color="primary" aria-label="upload picture" component="span">
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
                      <Image src='https://react.semantic-ui.com/images/avatar/large/daniel.jpg' wrapped ui={false} />
                      <Card.Content>
                        <Card.Header>{el.descricao}</Card.Header>
                        <Card.Meta>Cadastrado em 2021</Card.Meta>
                        <Card.Description>
                          {el.descricao}
                        </Card.Description>
                      </Card.Content>

                      <Card.Content extra>
                        {downloadFormatter(el.id)}&nbsp;&nbsp;&nbsp;
                    {excluirFormatter(el.id)}
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