import React from 'react';

import { Link } from 'react-router-dom';

import "./css/index.css"

import "@blueprintjs/core/lib/css/blueprint.css"
import "@blueprintjs/icons/lib/css/blueprint-icons.css"

export default class Navbar extends React.Component {
  render() {

    return (

      <nav className="bp3-navbar bp3-dark">
        <div styles="margin: 0 auto; width: 480px;">
          <div className="bp3-navbar-group bp3-align-left">
            <div className="bp3-navbar-heading">Blueprint</div>
            <input className="bp3-input" placeholder="Search files..." type="text" />
          </div>
          <div className="bp3-navbar-group bp3-align-right">
            <button className="bp3-button bp3-minimal bp3-icon-home"><Link className="linkDefault" style={{ textDecoration: 'none' }} to="/curriculo">Meus Curriculos</Link></button>
            <button className="bp3-button bp3-minimal bp3-icon-home">Vagas</button>
            <button className="bp3-button bp3-minimal bp3-icon-document">Files</button>
            <span className="bp3-navbar-divider"></span>
            <button className="bp3-button bp3-minimal bp3-icon-user"></button>
            <button className="bp3-button bp3-minimal bp3-icon-notifications"></button>
            <button className="bp3-button bp3-minimal bp3-icon-cog"></button>
          </div>
        </div>
      </nav>
    );
  }
}