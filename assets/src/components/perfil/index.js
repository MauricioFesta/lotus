import React from 'react';
import { Figure, Jumbotron, Container, Row, Form } from 'react-bootstrap';
import Navbar from "../navbar/index"
import PerfiFoto from "./index.foto"
import { Button, Icon } from "@blueprintjs/core";




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

                <Container className="mt-4">

                    <Jumbotron >

                        <Row>

                            <Form>

                                <PerfilFoto />

                                <Button small={true} intent="success" text="Salvar alterações" />
                            </Form>

                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Form>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Nome</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" />
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Senha</Form.Label>
                                    <Form.Control type="password" placeholder="Password" />
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                    </Form.Text>
                                </Form.Group>

                            </Form>
                           
                        </Row>

                    </Jumbotron>

                </Container>

            </div >

        );
    }
}