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
import NotificationsIcon from '@material-ui/icons/Notifications';
import { NotificacoesStore } from '../../stores/notificacoes';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import { isMobile } from 'react-device-detect';
import { Widget, addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import logo from '../../others/imagens/logo-icon.png';
import { v4 as uuidv4 } from 'uuid';
import { insert_message } from '../../stores/nav/api'
import { getPerfil } from '../../stores/perfil/api'


require("./css/index.scss")

const cookies = new Cookies();


export default class NavbarEmpresa extends React.Component {



  constructor(props) {
    super(props);

    this.state = {
      open_modal: false, auth: true, anchorEl: null, anchorElPost: null, anchorElMobile: null,
      channel_chat: null, messages: "", id_user: "", foto_base64: "",
    }

    // setInterval(() => {

    //   addResponseMessage('Oi enviei meu curriculo agora');

    // }, 5000)

  }

  async componentDidMount() {


    let resp = await getPerfil()

    this.setState({ foto_base64: resp.data[0].foto_base64 })


    let channel = socket.channel("notify:open");
    let channel_chat_open = socket.channel("chat:open");


    channel.join()
      .receive("ok", resp => {

        console.log("Bem vindo", resp)
      })
      .receive("error", resp => {
        console.log("Error", resp)
      })

    channel_chat_open.join()
      .receive("ok", resp => {

        console.log("Bem vindo ao Chat", resp)
      })
      .receive("error", resp => {
        console.log("Error Chat", resp)
      })



    channel.on("notify_send:" + idMaster(), payload => {

      alert(payload.body)

    })

    channel_chat_open.on("chat_send:" + idMaster(), payload => {

      console.log(payload.id)

      this.setState({ id_user: payload.id, logo: "data:image/png;base64," + payload.avatar })
      addResponseMessage(payload.body);

      //channel_chat_open.push("chat_send:" + "1111111111", { body: "verdade", id: "ddd" })

    })

    this.setState({ channel_chat: channel_chat_open })
  }

  handleRedirect(path) {

    this.setState({ anchorEl: null, anchorElPost: null })
    history.push(path);

  }

  handleSair() {

    cookies.remove('_A-T');
    cookies.remove('_A-T-T_L');

    this.handleRedirect("/")

  }


  handleChange = (event) => {
    this.setState({ auth: event.target.checked });
  };


  handleMenu = (event) => {

    this.setState({ anchorEl: event.currentTarget })
  };

  handleMenuPost = (event) => {

    this.setState({ anchorElPost: event.currentTarget })
  };

  handleClose = () => {

    this.setState({ anchorEl: null, anchorElMobile: null, anchorElPost: null })
  };

  handleMenuMobile = (event) => {

    this.setState({ anchorElMobile: event.currentTarget })
  };

  handleNewUserMessage = async (msg) => {

    const message =
    {

      "message": {
        "_id": uuidv4(), "createdAt": new Date(), "text": msg,
        "user": { "_id": 2 },

      },
      "user_id": this.state.id_user
    }

    let message_send = {
      _id: uuidv4(),
      text: msg,
      createdAt: new Date(),
      user: {
        _id: uuidv4(),
        name: 'Teste',
        avatar: "data:image/png;base64," + this.state.foto_base64
      }
    }

    insert_message(message).then(res => {




    }).catch((err => {

      console.log(err)

    }))


    console.log(this.state.id_user, "sender")

    this.state.channel_chat.push("chat_send:" + this.state.id_user, { body: message_send, id:  this.state.id_user, avatar: ""})


  }


  render() {

    return (

      <>

        <Widget
          profileAvatar={this.state.logo}
          title="Chat Empresas"
          subtitle="Esclarecimentos de dúvidas"
          handleNewUserMessage={this.handleNewUserMessage}
          emojis={true}

        />


        <Modal show={this.state.open_modal} onHide={() => this.setState({ open_modal: false })}>

          <Modal.Body>

            <Notificacoes />

          </Modal.Body>

        </Modal>

        <nav class="navbar navbar-icon-top navbar-expand-sm navbar-dark bg-color">
          <a class="navbar-brand" href="#">Lotus Empresa</a>

          {isMobile &&

            <>

              <Tooltip title="Vagas" aria-label="Vagas">

                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  color="#F4F4F4"
                  onClick={this.handleMenuMobile}
                >
                  <MenuIcon style={{ color: "#F4F4F4" }} />
                </IconButton>


              </Tooltip>

              <Menu
                id="menu-appbar"
                anchorEl={this.state.anchorElMobile}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(this.state.anchorElMobile)}
                onClose={this.handleClose}
              >
                <MenuItem onClick={() => this.handleRedirect("/vagas/cadastradas")}>Vagas Abertas</MenuItem>
                <MenuItem onClick={() => this.handleRedirect("/vagas/cadastro")}>Cadastrar Vaga</MenuItem>
                <MenuItem onClick={() => this.handleRedirect("/vagas/cadastradas/fechado")}>Vagas Fechadas</MenuItem>
                <MenuItem onClick={() => this.handleRedirect("/postagens/view")}>Posts Abertos</MenuItem>
                <MenuItem onClick={() => this.handleRedirect("/postagens/cadastro")}>Cadastrar Post</MenuItem>
                <MenuItem onClick={() => this.handleRedirect("/perfil")}>Perfil</MenuItem>
                {/* <MenuItem onClick={() => this.setState({ open_modal: true })} >Notificações</MenuItem> */}
                <MenuItem onClick={() => this.handleSair()}>Sair</MenuItem>
              </Menu>
            </>

          }



          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">


            </ul>



            <ul class="navbar-nav ">


              <div>
                <Tooltip title="Vagas" aria-label="Vagas">

                  <IconButton

                    color="#F4F4F4"
                    onClick={this.handleMenu}
                  >
                    <Badge badgeContent={0} color="secondary">
                      <span className="name-navs-itens">Vagas <PageviewIcon style={{ color: "#F4F4F4" }} /></span>
                    </Badge>
                  </IconButton>
                </Tooltip>

                <Menu
                  id="menu-appbar"
                  anchorEl={this.state.anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(this.state.anchorEl)}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={() => this.handleRedirect("/vagas/cadastradas")}>Vagas Abertas</MenuItem>
                  <MenuItem onClick={() => this.handleRedirect("/vagas/cadastro")}>Cadastrar Vaga</MenuItem>
                  <MenuItem onClick={() => this.handleRedirect("/vagas/cadastradas/fechado")}>Vagas Fechadas</MenuItem>
                </Menu>
              </div>






              <div>

                <Tooltip title="Meus Posts" aria-label="Meus Posts">

                  <IconButton onClick={this.handleMenuPost}
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="#F4F4F4"
                  >
                    <span className="name-navs-itens">Meus Posts <SpeakerNotesIcon style={{ color: "#F4F4F4" }} /></span>
                  </IconButton>
                </Tooltip>


                <Menu
                  id="menu-appbar"
                  anchorEl={this.state.anchorElPost}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(this.state.anchorElPost)}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={() => this.handleRedirect("/postagens/view")}>Posts Abertos</MenuItem>
                  <MenuItem onClick={() => this.handleRedirect("/postagens/cadastro")}>Cadastrar Post</MenuItem>

                </Menu>
              </div>


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