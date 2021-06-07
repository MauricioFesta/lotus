import React from 'react';
import { Figure } from 'react-bootstrap';
import Navbar from "../navbar/index"
import PerfiFoto from "./index.foto"




import 'bootstrap/dist/css/bootstrap.min.css';
import "@blueprintjs/core/lib/css/blueprint.css"
import "@blueprintjs/icons/lib/css/blueprint-icons.css"
import PerfilFoto from './index.foto';

export default class Perfil extends React.Component {

    constructor(props) {
        super(props)


    }

    render() {


        return (

            <div>

                <Navbar />

                <div className="container mt-4">
                    <PerfilFoto />



                </div>

            </div >

        );
    }
}