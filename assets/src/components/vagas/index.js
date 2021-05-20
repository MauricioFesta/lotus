import React from 'react';
import { Form, Button, Alert, Toast, Col } from 'react-bootstrap';
import NavbarEmpresa from "../navbar/index.empresa"
import { getCurriculo, getDownload, postExcluir } from "../../model/curriculo/api";
import { Link } from 'react-router-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';


import 'bootstrap/dist/css/bootstrap.min.css';
import "@blueprintjs/core/lib/css/blueprint.css"
import "@blueprintjs/icons/lib/css/blueprint-icons.css"

export default class Vagas extends React.Component {

    constructor(props) {
        super(props);

        this.state = { dataTable: [], variant: "primary", msg_text: "", msg_title: "", close_msg: false };

    }


    render() {


        return (

            <div>

                <NavbarEmpresa  />

            </div>

        );
    }
}