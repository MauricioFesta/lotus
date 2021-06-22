import React from 'react';
import { Link } from 'react-router-dom';
import "./css/index.sass"
import { Classes, Button, Menu, MenuDivider, MenuItem } from "@blueprintjs/core";
import { Example } from "@blueprintjs/docs-theme";
import { Popover2 } from "@blueprintjs/popover2";
import { Redirect } from 'react-router-dom';


import "@blueprintjs/core/lib/css/blueprint.css"
import "@blueprintjs/icons/lib/css/blueprint-icons.css"


export default class Navbar extends React.Component {

  constructor(props) {
    super(props)
    this.state = { to_redirect: '', is_redirect: false }
  }


  render() {

    return (



      <nav className="bp3-navbar bp3-dark">

        {this.state.is_redirect &&

          <Redirect to={{ pathname: this.state.to_redirect }} />

        }

        <div styles="margin: 0 auto; width: 480px;">
          <div className="bp3-navbar-group bp3-align-left">
            <div className="bp3-navbar-heading">Lotus</div>
            <input className="bp3-input" placeholder="Search files..." type="text" />
          </div>
          <div className="bp3-navbar-group bp3-align-right">
            <button className="bp3-button bp3-minimal bp3-icon-home"><Link className="linkDefault" style={{ textDecoration: 'none' }} to="/curriculo">Meus Curriculos</Link></button>
            <button className="bp3-button bp3-minimal bp3-icon-home"><Link className="linkDefault" style={{ textDecoration: 'none' }} to="/vagas">Vagas</Link></button>
            <button className="bp3-button bp3-minimal bp3-icon-document"><Link className="linkDefault" style={{ textDecoration: 'none' }} to="/postagens">Postagens</Link></button>
            <span className="bp3-navbar-divider"></span>

            <Popover2
              autoFocus={false}
              usePortal={false}
              content={

                <Example className={Classes.POPOVER2_DISMISS} className="docs-menu-example" options={true} {...this.props}>

                  <Menu className={Classes.ELEVATION_1}>
                    <MenuDivider title="Conta" />
                    <MenuItem onClick={() => this.setState({to_redirect: "perfil", is_redirect: true})} icon="align-left" text="Perfil" />
                    <MenuItem icon="align-left" text="Config">
                      <MenuItem icon="align-left" text="Bloquear" />
                      <MenuItem icon="align-center" text="Excluir" />
                      <MenuItem onClick={() => this.setState({to_redirect: "perfil", is_redirect: true})} icon="clipboard" text="Alaterar foto" />
                    </MenuItem>
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

                  <Menu className={Classes.ELEVATION_1}>
                    <MenuDivider title="Notificações" />
                    <MenuItem icon="align-left" text="Visualizar" />
                    <MenuItem icon="align-left" text="Config">
                      <MenuItem icon="align-left" text="Desabilitar" />
                      <MenuItem icon="align-center" text="Programar" />
                    </MenuItem>
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

                  <Menu className={Classes.ELEVATION_1}>
                    <MenuDivider title="Configurações" />
                    <MenuItem icon="align-left" text="Sair" />
                    <MenuItem icon="align-left" text="Status">
                      <MenuItem icon="align-left" text="Online" />
                      <MenuItem icon="align-left" text="Offline" />
                      <MenuItem icon="align-left" text="Ausente" />
                    </MenuItem>
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