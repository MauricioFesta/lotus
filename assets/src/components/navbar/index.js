import React from 'react';
import "./css/index.scss"
import "@blueprintjs/core/lib/css/blueprint.css"
import "@blueprintjs/icons/lib/css/blueprint-icons.css"
import history from "../../others/redirect";
import Notificacoes from "./notificacoes/index"
import socket from '../socket';
import Cookies from 'universal-cookie';
import { idMaster } from '../login/auth'
import { Modal } from 'react-bootstrap';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import PageviewIcon from '@material-ui/icons/Pageview';
import Tooltip from '@material-ui/core/Tooltip';
import { VagasStore } from '../../stores/vagas';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { NotificacoesStore } from '../../stores/notificacoes';



const cookies = new Cookies();
require("./css/index.scss")

export default class Navbar extends React.Component {

  constructor(props) {
    super(props)

    this.state = { open_modal: false, vagas_length: 0 }

  }

  async componentDidMount() {

    let channel = socket.channel("notify:open");

    channel.join()
      .receive("ok", resp => {

        console.log("Bem vindo", resp)
      })
      .receive("error", resp => {
        console.log("Error", resp)
      })

    channel.on("notify_send:" + idMaster(), payload => {
      console.log("Chegouuu das empresa")
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
          <a class="navbar-brand" href="#">Lotus</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">

            </ul>

            <ul class="navbar-nav ">

              <Tooltip title="Vagas em Aberto" aria-label="Vagas em Aberto">

                <IconButton onClick={() => this.handleRedirect("/vagas")}

                  color="#F4F4F4"
                >
                  <Badge badgeContent={VagasStore.obs.vagas.length} color="secondary">
                    <span className="name-navs-itens">Vagas <PageviewIcon style={{ color: "#F4F4F4" }} /></span>
                  </Badge>
                </IconButton>
              </Tooltip>


              <Tooltip title="Meus Curriculos" aria-label="Meus Curriculos">
                <IconButton onClick={() => this.handleRedirect("/curriculo")}
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="#F4F4F4"
                >
                  <span className="name-navs-itens">Curriculos <InsertDriveFileIcon style={{ color: "#F4F4F4" }} /></span>

                </IconButton>
              </Tooltip>

              <Tooltip title="Ver Postagens" aria-label="Ver Postagens">

                <IconButton onClick={() => this.handleRedirect("/postagens")}
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="#F4F4F4"
                >
                  <span className="name-navs-itens">Posts <SpeakerNotesIcon style={{ color: "#F4F4F4" }} /></span>
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
      </>


    );

  }
}