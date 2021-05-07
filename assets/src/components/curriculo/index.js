import React from 'react';
import Navbar from "../navbar/index"
import Api from "../../model/api"

import 'bootstrap/dist/css/bootstrap.min.css';
import "@blueprintjs/core/lib/css/blueprint.css"
import "@blueprintjs/icons/lib/css/blueprint-icons.css"

export default class Curriculo extends React.Component {

  constructor(props) {
    super(props);

    //this.state = {msg: true,variant: "warning", text: "null"};
    // this.validaLogin = this.validaLogin = this.validaLogin.bind(this);

  }


  render() {
    return (

      <div>

        <Navbar />

        <div className='container mt-4 main'>

          <table className="bp3-html-table .modifier .bp3-small .bp3-html-table-striped">
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Arquivo</th>

              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Blueprint</td>
                <td>CSS framework and UI toolkit</td>

              </tr>
              <tr>
                <td>TSLint</td>
                <td>Static analysis linter for TypeScript</td>

              </tr>

            </tbody>
            <tfoot>
              <tr>
                <td>Total</td>
                <td>1408</td>
              </tr>
            </tfoot>
          </table>
        </div >

      </div>

    );
  }
}