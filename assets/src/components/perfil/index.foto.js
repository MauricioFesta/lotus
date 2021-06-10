import React from 'react';
import { Figure } from 'react-bootstrap';
import Navbar from "../navbar/index"
import { Form } from 'react-bootstrap';


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { perfilForm} from '../../actions';

import 'bootstrap/dist/css/bootstrap.min.css';
import "@blueprintjs/core/lib/css/blueprint.css"
import "@blueprintjs/icons/lib/css/blueprint-icons.css"

class PerfilFoto extends React.Component {

    constructor(props) {
        super(props)
        this.state = { data: [], inputfile: '' }

    }


    render() {


        return (

            <div>

                <Figure>
                    <Figure.Image
                        width={171}
                        height={180}
                        alt="171x180"
                        src="https://image.freepik.com/vetores-gratis/perfil-de-avatar-de-homem-no-icone-redondo_24640-14044.jpg"
                    />
                    <Figure.Caption>
                        <Form.File onChange={(e) =>  this.props.perfilForm(e.target.files)} id="file" label="Alterar foto" />
                    </Figure.Caption>

                </Figure>

            </div>


        );
    }
}

const mapStateToProps = store => ({
    form: store.perfilState.form
  });
  const mapDispatchToProps = dispatch =>
    bindActionCreators({ perfilForm }, dispatch);
  
  export default connect(mapStateToProps, mapDispatchToProps)(PerfilFoto);