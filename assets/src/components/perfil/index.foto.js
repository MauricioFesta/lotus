import React from 'react';
import { Figure } from 'react-bootstrap';
import Navbar from "../navbar/index"
import { Form} from 'react-bootstrap';




import 'bootstrap/dist/css/bootstrap.min.css';
import "@blueprintjs/core/lib/css/blueprint.css"
import "@blueprintjs/icons/lib/css/blueprint-icons.css"

export default class PerfilFoto extends React.Component {

    constructor(props) {
        super(props)
        this.state = { data: [] }

    }

    render() {


        return (

            <div>

                <div className="container mt-4">

                    <Figure>
                        <Figure.Image
                            width={171}
                            height={180}
                            alt="171x180"
                            src="https://image.freepik.com/vetores-gratis/perfil-de-avatar-de-homem-no-icone-redondo_24640-14044.jpg"
                        />
                        <Figure.Caption>
                            <Form.File id="file" label="Alterar foto" />
                        </Figure.Caption>
                    </Figure>

                </div>

            </div >

        );
    }
}