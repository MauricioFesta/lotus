import React from 'react';
import { Link } from 'react-router-dom';
import { Classes, Button, Menu, MenuDivider, MenuItem } from "@blueprintjs/core";
import { Example } from "@blueprintjs/docs-theme";
import { Popover2 } from "@blueprintjs/popover2";
import "./css/index.scss"
import "@blueprintjs/core/lib/css/blueprint.css"
import "@blueprintjs/icons/lib/css/blueprint-icons.css"
import history from "../../others/redirect";
import Notificacoes from "./notificacoes/index"
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import BusinessIcon from '@material-ui/icons/Business';
import MarkunreadMailboxIcon from '@material-ui/icons/MarkunreadMailbox';
import socket from '../socket';
import Cookies from 'universal-cookie';
import {idMaster} from '../login/auth'
const cookies = new Cookies();
require("./css/index.scss")

export default class Navbar extends React.Component {

  constructor(props) {
    super(props)

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


    channel.on("notify_send:"+ idMaster(), payload => {
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


      <nav className="bp3-navbar bp3-dark layout-default">


        <div styles="margin: 0 auto; width: 480px;">
          <div className="bp3-navbar-group bp3-align-left">
            <div className="bp3-navbar-heading">Lotus</div>
            <input className="bp3-input" placeholder="Search files..." type="text" />
          </div>
          <div className="bp3-navbar-group bp3-align-right">
            <button onClick={() => this.handleRedirect("/curriculo")} className="bp3-button bp3-minimal"> <AssignmentIndIcon />&nbsp;Meus Curriculos</button>
            <button onClick={() => this.handleRedirect("/vagas")} className="bp3-button bp3-minimal "><BusinessIcon />&nbsp; Vagas</button>
            <button onClick={() => this.handleRedirect("/postagens")} className="bp3-button bp3-minimal"><MarkunreadMailboxIcon />&nbsp; Postagens</button>
            <span className="bp3-navbar-divider"></span>

            <Popover2
              autoFocus={false}
              usePortal={false}
              content={

                <Example className={Classes.POPOVER2_DISMISS} options={true} {...this.props}>

                  <Menu className={Classes.ELEVATION_1 + " layout-default"} >
                    <MenuDivider title="Conta" />
                    <MenuItem  onClick={() => this.handleRedirect("/perfil")} icon="align-left" text="Perfil" />
                  </Menu>
                </Example>

              }

              renderTarget={({ isOpen, ref, ...p }) => (
                <Button minimal={true} icon="user" checked={false} {...p} active={isOpen} elementRef={ref} />
              )}


            />
            <Popover2
              autoFocus={false}
              usePortal={false}
              content={

                <Example className={Classes.POPOVER2_DISMISS} className="docs-menu-example" options={true} {...this.props}>

                  <Menu className={Classes.ELEVATION_1} className="layout-default">
                    <MenuDivider title="Notificações" />

                    <Notificacoes />

                  </Menu>
                </Example>

              }

              renderTarget={({ isOpen, ref, ...p }) => (
                <Button minimal={true} icon="notifications" checked={false} {...p} active={isOpen} elementRef={ref} />
              )}


            />

            <Popover2
              autoFocus={false}
              usePortal={false}
              content={

                <Example className={Classes.POPOVER2_DISMISS} className="docs-menu-example" options={true} {...this.props}>

                  <Menu className={Classes.ELEVATION_1} className="layout-default">
                    <MenuDivider title="Configurações" />
                    <MenuItem onClick={() => this.handleSair()} icon="align-left" text="Sair" />
                    {/* <MenuItem icon="align-left" text="Status">
                      <MenuItem icon="align-left" text="Online" />
                      <MenuItem icon="align-left" text="Offline" />
                      <MenuItem icon="align-left" text="Ausente" />
                    </MenuItem> */}
                  </Menu>
                </Example>

              }

              renderTarget={({ isOpen, ref, ...p }) => (
                <Button minimal={true} icon="cog" checked={false} {...p} active={isOpen} elementRef={ref} />
              )}


            />

          </div>
        </div>
      </nav>


    );

  }
}