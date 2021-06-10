import React from 'react';
import { Figure, Jumbotron, Container, Row, Form, Alert, Col, Toast } from 'react-bootstrap';
import Navbar from "../navbar/index"
import { Button, Icon } from "@blueprintjs/core";
import { Store } from "../../store"
import 'bootstrap/dist/css/bootstrap.min.css';
import "@blueprintjs/core/lib/css/blueprint.css"
import "@blueprintjs/icons/lib/css/blueprint-icons.css"
import PerfilFoto from './index.foto';
import { putPerfil } from "../../model/perfil/api"

export default class Perfil extends React.Component {


    constructor(props) {
        super(props)
        this.state = { nome: '', senha: '', close_msg: false, variant: "primary", msg_text: "", msg_title: "" }

    }

    getMin() {

        let date = new Date();

        return date.getMinutes()

    }

    closeToasts() {
        this.setState({ close_msg: false });
    }

    alterarPerfil = async () => {

        let store = Store.getState()
        let formData = new FormData();

        if (store.perfilState.form[0]) {

            formData.append("file", store.perfilState.form[0]);
        }

        formData.append("nome", this.state.nome);
        formData.append("senha", this.state.senha);

        let res = await putPerfil(formData)

        if (res.data.Ok) {

            this.setState({ close_msg: true, msg_text: "Perfil alterado com sucesso!", msg_title: "Parabéns" });


        } else {
            this.setState({ close_msg: true, msg_text: "Não foi possível alterar o perfil", msg_title: "Error!!" });

        }


    }

    render() {


        return (

            <div>

                <Navbar />

                <Container className="mt-4">

                    <Col xs={6}>
                        <Toast onClose={() => this.closeToasts()} show={this.state.close_msg} delay={6000} autohide>
                            <Toast.Header>
                                <img
                                    src="/bootstrap/alert.gif"
                                    className="rounded mr-2"
                                    alt=""
                                />
                                <strong className="mr-auto">{this.state.msg_title}</strong>
                                <small>{this.getMin()} mins ago</small>
                            </Toast.Header>
                            <Toast.Body>{this.state.msg_text}</Toast.Body>
                        </Toast>
                    </Col>

                    <Jumbotron >

                        <Row>

                            <Form>

                                <PerfilFoto />

                                <Button small="true" intent="success" onClick={this.alterarPerfil} text="Salvar alterações" />
                            </Form>

                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Form>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Nome</Form.Label>
                                    <Form.Control onChange={(e) => this.setState({ nome: e.target.value })} type="email" placeholder="Enter email" />
                                    <Form.Text className="text-muted">
                                        Preencha seu nome de acesso
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Senha</Form.Label>
                                    <Form.Control onChange={(e) => this.setState({ senha: e.target.value })} type="password" placeholder="Password" />
                                    <Form.Text className="text-muted">
                                        Preencha a senha de acesso
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