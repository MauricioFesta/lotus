import React from 'react';
import { Figure } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Store } from "../../store"
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { perfilForm } from '../../actions';
import 'bootstrap/dist/css/bootstrap.min.css';
import "@blueprintjs/core/lib/css/blueprint.css"
import "@blueprintjs/icons/lib/css/blueprint-icons.css"

class PerfilFoto extends React.Component {

    constructor(props) {
        super(props)
        this.state = { data: [], inputfile: '', foto: undefined }

    }


    render() {

        return (

            <div>


                <Figure>
                    <Figure.Image
                        width={171}
                        height={180}
                        alt="171x180"

                        src={"data:image/png;base64," + Store.getState().perfilState.foto_base64}

                    />
                    <Figure.Caption>

                        <Form.File onChange={(e) => this.props.perfilForm(e.target.files)} id="file" label="Alterar foto" />
                    </Figure.Caption>

                </Figure>




            </div>


        );
    }
}

const mapStateToProps = store => ({
    foto_base64: store.perfilState.foto_base64
});
const mapDispatchToProps = dispatch =>
    bindActionCreators({ perfilForm }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PerfilFoto);