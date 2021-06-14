import React from 'react';
import Navbar from "../navbar/index"
import NavbarEmpresa from "../navbar/index.empresa"
import { Store } from "../../store"


import "@blueprintjs/core/lib/css/blueprint.css"
import "@blueprintjs/icons/lib/css/blueprint-icons.css"

export default class Home extends React.Component {

  componentDidMount() {

  }

  render() {


    return (
      <div>

  {/*       <NavbarEmpresa /> */}


        <Navbar />


      </div>

    );
  }
}