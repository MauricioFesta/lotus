import React from 'react';
import { Col, Alert } from 'react-bootstrap';
import { getCurriculo, getDownload, postExcluir, setPrincipal } from "../../stores/curriculo/api";
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
import CheckIcon from '@material-ui/icons/Check';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import { data } from 'jquery';
require("./css/style.scss")

const styleButomDelete = {
  color: '#ff5252',

};

const styleButomPrincipal = {
  color: '#32CD32',

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

    const confirmExcluirCurriculo = (id) => {
     
      confirmAlert({
        title: 'Alerta',
        message: 'Deseja excluir este Currículo ?',
        buttons: [
          {
            label: 'Sim',
            onClick: () => excluir_Pdf(id)
          },
          {
            label: 'Não',
            onClick: () => {}
          }
        ]
      });
    };

    const confirmPrincipal = (id) => {
      
      confirmAlert({
        title: 'Currículo',
        message: 'Deseja tornar este como principal ?',
        buttons: [
          {
            label: 'Sim',
            onClick: () => tornar_principal(id, true)
          },
          {
            label: 'Não',
            onClick: () => console.log("No")
          }
        ]
      });
    };


    const confirmNotPrincipal = (id) => {
    
      confirmAlert({
        title: 'Currículo',
        message: 'Deseja remover este como principal ?',
        buttons: [
          {
            label: 'Sim',
            onClick: () => tornar_principal(id, false)
          },
          {
            label: 'Não',
            onClick: () => console.log("No")
          }
        ]
      });
    };


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

   const tornar_principal = async  (id, bol) => {

      let data = {
        boolean: bol,

      }

      let res = await setPrincipal(id, data)

      if(res.data === "Ok"){
        AppToaster.show({ message: "Prioridade alterada com sucesso", intent: "success" });
        this.componentDidMount()
       
      }else{
        AppToaster.show({message: "Não foi possível alterar a prioridade", intent: "warning" });
      }

    


    }


    function tornarPrincipal(id) {
      return (
      
          <Mui.IconButton onClick={() => confirmPrincipal(id)} color="primary" aria-label="upload picture" component="span">
            <CheckIcon />
          </Mui.IconButton>

      )
    }

    function curriculoPrincipal(id) {
      return (
       
          <Mui.IconButton style={styleButomPrincipal} onClick={() => confirmNotPrincipal(id)} color="primary" aria-label="upload picture" component="span">
            <DoneAllIcon />
          </Mui.IconButton>
    
      )
    }

    function excluirFormatter(id) {
      return (

        <Mui.IconButton style={styleButomDelete} onClick={() => { confirmExcluirCurriculo(id) }} color="primary" aria-label="upload picture" component="span">
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

      
          <Jumbotron className="ml-4 mr-4 mt-4">


            <Link className="mb-6" to="curriculo/cadastro">Cadastrar Currículo</Link>
            <Card.Group>
              {this.state.showItems ?

                this.state.dataCurriculo.map(el => {

                  return (

                    <Card className="mt-4">
                      <Image src={'data:image/jpeg;base64,' + el.image_base64} wrapped ui={false} />
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
                        {el.principal ?
                          curriculoPrincipal(el.id) :
                          tornarPrincipal(el.id)}
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


      </>

    );
  }
}