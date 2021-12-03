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
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import PageviewIcon from '@material-ui/icons/Pageview';
import Tooltip from '@material-ui/core/Tooltip';
import { VagasStore } from '../../stores/vagas';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { NotificacoesStore } from '../../stores/notificacoes';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DoNotDisturbOffIcon from '@mui/icons-material/DoNotDisturbOff';
import AddCircleIcon from '@mui/icons-material/AddCircle';

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
          <a class="navbar-brand" href="#">Lotus Empresa</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">

            </ul>

            <ul class="navbar-nav ">

              <Tooltip title="Vagas Abertas" aria-label="Vagas Abertas">

                <IconButton onClick={() => this.handleRedirect("/vagas/cadastradas")}

                  color="#F4F4F4"
                >
                  <Badge badgeContent={0} color="secondary">
                    <span className="name-navs-itens">Vagas Abertas <PageviewIcon style={{ color: "#F4F4F4" }} /></span>
                  </Badge>
                </IconButton>
              </Tooltip>

              <Tooltip title="Cadastrar Vaga" aria-label="Cadastrar Vaga">

                <IconButton onClick={() => this.handleRedirect("/vagas/cadastro")}

                  color="#F4F4F4"
                >
                  <Badge badgeContent={0} color="secondary">
                    <span className="name-navs-itens">Cadastrar Vaga <AddBoxIcon style={{ color: "#F4F4F4" }} /></span>
                  </Badge>
                </IconButton>
              </Tooltip>


              <Tooltip title="Vagas Fechadas" aria-label="Vagas Fechadas">

                <IconButton onClick={() => this.handleRedirect("/vagas/cadastradas/fechado")}

                  color="#F4F4F4"
                >
                  <Badge badgeContent={0} color="secondary">
                    <span className="name-navs-itens">Vagas Fechadas <DoNotDisturbOffIcon style={{ color: "#F4F4F4" }} /></span>
                  </Badge>
                </IconButton>
              </Tooltip>




              <Tooltip title="Meus Posts" aria-label="Meus Posts">

                <IconButton onClick={() => this.handleRedirect("/postagens/view")}
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="#F4F4F4"
                >
                  <span className="name-navs-itens">Meus Posts <SpeakerNotesIcon style={{ color: "#F4F4F4" }} /></span>
                </IconButton>
              </Tooltip>

              <Tooltip title="Cadastrar Post" aria-label="Cadastrar Post">

                <IconButton onClick={() => this.handleRedirect("/postagens/cadastro")}
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="#F4F4F4"
                >
                  <span className="name-navs-itens">Cadastrar Post <AddCircleIcon style={{ color: "#F4F4F4" }} /></span>
                </IconButton>
              </Tooltip>

              <Tooltip title="Ver Notificações" aria-label="Ver Notificações">
                <IconButton onClick={() => this.setState({ open_modal: true })} aria-label="show 11 new notifications" color="inherit">
                  <Badge badgeContent={NotificacoesStore.obs.notificacoes.length} color="secondary">
                    <span className="name-navs-itens">Notificaçoes<NotificationsIcon style={{ color: "#F4F4F4" }} /></span>
                  </Badge>
                </IconButton>
              </Tooltip>

              <Tooltip title="Meu Perfil" aria-label="Meu Perfil">
                <IconButton onClick={() => this.handleRedirect("/perfil")}
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="#F4F4F4"
                >
                  <span className="name-navs-itens">Perfil <AccountCircle style={{ color: "#F4F4F4" }} /></span>
                </IconButton>
              </Tooltip>

              <Tooltip title="Sair" aria-label="Sair">

                <IconButton onClick={() => this.handleSair()}
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="#F4F4F4"
                >
                  <span className="name-navs-itens">Sair <ExitToAppIcon style={{ color: "#F4F4F4" }} /></span>
                </IconButton>

              </Tooltip>


            </ul>


          </div>

        </nav>


        {/* <nav style={{height: 10}} class="navbar navbar-icon-top navbar-expand-sm navbar-dark bg-color">
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

        </nav> */}


      </>


    );

  }
}