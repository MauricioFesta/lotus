import React from 'react';
import "@blueprintjs/core/lib/css/blueprint.css"
import "@blueprintjs/icons/lib/css/blueprint-icons.css"
import "./css/index.scss"
import history from "../../others/redirect";
import socket from '../socket';
import Cookies from 'universal-cookie';
import Notificacoes from "./notificacoes/index"
import { Modal } from 'react-bootstrap';
import { idMaster } from '../login/auth';

require("./css/index.scss")

const cookies = new Cookies();

export default class NavbarEmpresa extends React.Component {

  constructor(props) {
    super(props);

    this.state = { open_modal: false }


  }

  componentDidMount() {
    let channel = socket.channel("notify:open");

    channel.join()
      .receive("ok", resp => {

        console.log("Bem vindo", resp)
      })
      .receive("error", resp => {
        console.log("Error", resp)
      })


    channel.on("notify_send:" + idMaster(), payload => {
      console.log("Chegouuu do usuario")
      alert(payload.body)

    })
  }

  handleRedirect(path) {

    history.push(path);

  }

  handleSair() {

    cookies.remove('_A-T');
    cookies.remove('_A-T-T_L');

    this.handleRedirect("/")

  }


  render() {

    return (

      <>

        <Modal show={this.state.open_modal} onHide={() => this.setState({ open_modal: false })}>

          <Modal.Body>

            <Notificacoes />

          </Modal.Body>

        </Modal>


        <nav class="navbar navbar-icon-top navbar-expand-sm navbar-dark bg-color">
          <a class="navbar-brand" href="#">Lotus Empresas</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">

            </ul>

            <ul class="navbar-nav ">

              <li class="nav-item active">
                <a onClick={() => this.handleRedirect("/vagas/cadastradas")} class="nav-link" href="#">
                  <i class="fa fa-list-alt"></i>
                  Vagas cadastradas
                  <span class="sr-only">(current)</span>
                </a>
              </li>
              <li class="nav-item">
                <a onClick={() => this.handleRedirect("/vagas/cadastradas/fechado")} class="nav-link" href="#">
                  <i class="fa fa-list-ul"></i>
                  Vagas fechadas
                  <span class="sr-only">(current)</span>
                </a>
              </li>

              <li class="nav-item">
                <a onClick={() => this.handleRedirect("/vagas/cadastro")} class="nav-link" href="#">
                  <i class="fa fa-plus-square"></i>
                  Cadastrar Vaga
                  <span class="sr-only">(current)</span>
                </a>
              </li>

              <li class="nav-item">
                <a onClick={() => this.handleRedirect("/postagens/view")} class="nav-link" href="#">
                  <i class="fa fa-list-ol"></i>
                  Listar Postagens
                  <span class="sr-only">(current)</span>
                </a>
              </li>

              <li class="nav-item">
                <a onClick={() => this.handleRedirect("/postagens/cadastro")} class="nav-link" href="#">
                  <i class="fa fa-plus"></i>
                  Cadastro Postagem
                  <span class="sr-only">(current)</span>
                </a>
              </li>
              <li class="nav-item">
                <a onClick={() => this.setState({ open_modal: true })} class="nav-link" href="#">
                  <i class="fa fa-bell">
                    <span class="badge badge-info"></span>
                  </i>
                  Notificações
                </a>
              </li>
              <li class="nav-item">
                <a onClick={() => this.handleRedirect("/perfil")} class="nav-link" href="#">
                  <i class="fa fa-address-card">
                    <span class="badge badge-success"></span>
                  </i>

                  Perfil
                </a>
              </li>
              <li class="nav-item">
                <a onClick={() => this.handleSair()} class="nav-link" href="#">
                  <i class="fa fa-close">
                    <span class="badge badge-success"></span>
                  </i>

                  Sair
                </a>
              </li>
            </ul>


          </div>

        </nav>


      </>


    );

  }
}