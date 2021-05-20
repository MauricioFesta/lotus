import React from 'react';
import { Form, Button, Alert, Toast, Col } from 'react-bootstrap';
import Navbar from "../navbar/index"
import { getCurriculo, getDownload, postExcluir } from "../../model/curriculo/api";
import { Link } from 'react-router-dom';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';


import 'bootstrap/dist/css/bootstrap.min.css';
import "@blueprintjs/core/lib/css/blueprint.css"
import "@blueprintjs/icons/lib/css/blueprint-icons.css"

export default class Curriculo extends React.Component {

  constructor(props) {
    super(props);

    this.state = { dataTable: [], variant: "primary", msg_text: "", msg_title: "", close_msg: false };

    //this.state = {msg: true,variant: "warning", text: "null"};
    // this.validaLogin = this.validaLogin = this.validaLogin.bind(this);

  }



  getMin() {

    let date = new Date();

    return date.getMinutes()

  }

  async download_Pdf(el) {

    let res = await getDownload(el)

    window.open(`/pdf_tmp/${res.data}`, false)


  }

  async excluir_Pdf(el) {

    let res = await postExcluir(el)

    if (res.data === "Ok") {

      this.setState({ close_msg: true, msg_text: "Currículo deletado com sucesso!", msg_title: "Parabéns" });
      this.componentDidMount()

    } else {
      this.setState({ close_msg: true, msg_text: "Não foi possível deletar o currículo!", msg_title: "Error" });

    }

  }

  closeToasts() {
    this.setState({ close_msg: false });
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
            <button onClick={() => { this.excluir_Pdf(el) }} className="bp3-button bp3-minimal bp3-icon-cross">Excluir</button>
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

          <Col xs={6}>
            <Toast onClose={() => this.closeToasts()} show={this.state.close_msg} delay={6000} autohide>
              <Toast.Header>
                <img
                  src="holder.js/20x20?text=%20"
                  className="rounded mr-2"
                  alt=""
                />
                <strong className="mr-auto">{this.state.msg_title}</strong>
                <small>{this.getMin()} mins ago</small>
              </Toast.Header>
              <Toast.Body>{this.state.msg_text}</Toast.Body>
            </Toast>
          </Col>


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