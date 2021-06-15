import React from 'react';
import { Figure, Jumbotron, Container, Row, Form, Alert, Col, Toast } from 'react-bootstrap';
import Navbar from "../navbar/index"
import { Button, Icon } from "@blueprintjs/core";
import { Store } from "../../store"
import 'bootstrap/dist/css/bootstrap.min.css';
import "@blueprintjs/core/lib/css/blueprint.css"
import "@blueprintjs/icons/lib/css/blueprint-icons.css"
import PerfilFoto from './index.foto';
import { putPerfil, getPerfil } from "../../stores/perfil/api"
import { perfilMODEL } from "../../model/perfil"

export default class Perfil extends React.Component {

    
    constructor(props) {
        super(props)
        this.state = {perfilMODEL, retornoBanco: {}, email: '', nome: '', senha: '', close_msg: false, variant: "primary", msg_text: "", msg_title: "" }

    }

    async componentDidMount() {
        let res = await getPerfil()

        Object.assign(perfilMODEL, res.data[0])

        this.setState({perfilMODEL: perfilMODEL})

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

        formData.append("nome", this.state.nome || this.state.perfilMODEL.nome);
        formData.append("senha", this.state.senha || this.state.perfilMODEL.senha);
        formData.append("email", this.state.email || this.state.perfilMODEL.email)

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

                                <Form.Group controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control defaultValue={this.state.perfilMODEL.email} onChange={(e) => this.setState({ email: e.target.value })} type="email" placeholder="email" />
                                    <Form.Text className="text-muted">
                                        Preencha seu email de acesso
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group controlId="formNome">
                                    <Form.Label>Nome</Form.Label>
                                    <Form.Control defaultValue={this.state.perfilMODEL.nome}  onChange={(e) => this.setState({ nome: e.target.value })} type="text" placeholder="nome" />
                                    <Form.Text className="text-muted">
                                        Preencha seu nome de acesso
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group controlId="formSenha">
                                    <Form.Label>Senha</Form.Label>
                                    <Form.Control defaultValue={this.state.perfilMODEL.senha}  onChange={(e) => this.setState({ senha: e.target.value })} type="text" placeholder="senha" />
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