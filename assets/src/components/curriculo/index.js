import React from 'react';
import Navbar from "../navbar/index"
import { getCurriculo, getDownload } from "../../model/curriculo/api";
import { Link } from 'react-router-dom';
import base64 from 'base-64';

import 'bootstrap/dist/css/bootstrap.min.css';
import "@blueprintjs/core/lib/css/blueprint.css"
import "@blueprintjs/icons/lib/css/blueprint-icons.css"

export default class Curriculo extends React.Component {

  constructor(props) {
    super(props);

    this.state = { dataTable: [] };

    //this.state = {msg: true,variant: "warning", text: "null"};
    // this.validaLogin = this.validaLogin = this.validaLogin.bind(this);

  }

  async download_Pdf(el) {

    let res = await getDownload(el)

    debugger

    var bytes = base64.decode(res);



  }

  async componentDidMount() {

    let res = await getCurriculo()

    this.setState({ dataTable: res.data })

  }


  dataTable() {

    return this.state.dataTable.map((el, index) => {

      return (

        <tr key={index}>
          <th scope="row">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="11"
              />
            </div>
          </th>
          <td>{el}</td>
          <td>
            <button onClick={() => { this.download_Pdf(el) }} className="bp3-button bp3-minimal bp3-icon-cloud-download">Download</button></td>
          <td>
            <button className="bp3-button bp3-minimal bp3-icon-cross">Excluir</button>
          </td>
        </tr>

      );
    })

  }

  render() {

    return (

      <div>

        <Navbar />

        <div className="container table-responsive mt-4">

          <Link to="curriculo/cadastro" >Cadastrar Currículo</Link>


          <table className="table align-middle mt-4">
            <thead>
              <tr>
                <th scope="col">Seleção</th>
                <th scope="col">Nome</th>
                <th scope="col">PDF</th>
                <th scope="col">*</th>
              </tr>
            </thead>
            <tbody>

              {this.dataTable()}

            </tbody>
          </table>

        </div>

      </div>

    );
  }
}