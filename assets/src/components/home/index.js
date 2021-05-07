import React from 'react';
import Navbar from "../navbar/index"

import { Link } from 'react-router-dom';

import "@blueprintjs/core/lib/css/blueprint.css"
import "@blueprintjs/icons/lib/css/blueprint-icons.css"

export default class Home extends React.Component {
  render() {

    return (

     <Navbar />

    );
  }
}