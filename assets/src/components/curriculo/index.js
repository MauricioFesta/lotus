import React from 'react';
import { Toast, Col, Alert } from 'react-bootstrap';
import Navbar from "../navbar/index"
import { getCurriculo, getDownload, postExcluir } from "../../stores/curriculo/api";
import { Link } from 'react-router-dom';
import { AppToaster } from "../../others/toaster"
import 'bootstrap/dist/css/bootstrap.min.css';
import "@blueprintjs/core/lib/css/blueprint.css"
import "@blueprintjs/icons/lib/css/blueprint-icons.css"
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';


export default class Curriculo extends React.Component {

  constructor(props) {
    super(props);

    this.state = { showItems: false, dataTable: [], variant: "primary", msg_text: "", msg_title: "", close_msg: false };
  }

  async componentDidMount() {

    let res = await getCurriculo()
    if (res.data.lenth > 0) {
      this.setState({ showItems: true, dataTable: res.data })
    }


  }


  render() {

    const excluir_Pdf = async (el) => {

      let res = await postExcluir(el)

      if (res.data === "Ok") {

        AppToaster.show({ message: "Curriculo deletado com sucesso", intent: "success" });
        this.componentDidMount()

      }

    }
    async function download_Pdf(el) {

      let res = await getDownload(el)

      window.open(`/pdf_tmp/${res.data}`, false)


    }

    function excluirFormatter(cell, row, rowIndex, formatExtraData) {
      return (
        <button onClick={() => { excluir_Pdf(row.id) }} className="bp3-button bp3-minimal bp3-icon-cross">Excluir</button>
      )
    }


    function downloadFormatter(cell, row, rowIndex, formatExtraData) {
      return (
        <button onClick={() => { download_Pdf(row.id) }} className="bp3-button bp3-minimal bp3-icon-cloud-download">Download</button>
      );
    }


    const columns = [
      {
        dataField: 'id',
        text: 'Curriculo ID',
        hidden: true

      },
      {
        dataField: 'descricao',
        text: 'Descrição',
        sort: true
      },
      {
        dataField: 'download',
        text: "Download",
        formatter: downloadFormatter

      },
      {
        dataField: 'excluir',
        text: "Excluir",
        formatter: excluirFormatter

      }


    ]
    const { SearchBar } = Search;
    const { ExportCSVButton } = CSVExport;
    return (

      <>

        <div className="ml-4 mr-4 mt-4">

          <Link className="mb-4" to="curriculo/cadastro">Cadastrar Currículo</Link>

          {!this.state.showItems &&

            <Alert variant="info" className="mt-4">
              Não há curriculos cadastrados!
            <Link to="curriculo/cadastro"> Clique aqui para cadastrar!</Link> :)
            </Alert>
          }

          {this.state.showItems &&

            <ToolkitProvider
              keyField="id"
              data={this.state.dataTable}
              columns={columns}
              pagination
              search
              exportCSV
              overlay

            >
              {

                props =>
                  <div className="mt-4">
                    <ExportCSVButton {...props.csvProps}>Exportar para excell</ExportCSVButton>
                    <hr />
                    <label>Pesquise</label>
                    <SearchBar {...props.searchProps} />
                    <hr />
                    <div className="table-sm mt-4">
                      <BootstrapTable
                        bordered={false}
                        hover
                        pagination={paginationFactory()}

                        {...props.baseProps}

                      />

                    </div>
                  </div>

              }
            </ToolkitProvider>

          }


        </div>

      </>

    );
  }
}