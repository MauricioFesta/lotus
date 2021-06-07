import React from 'react';
import NavbarEmpresa from "../navbar/index.empresa"
import { Form, Button, Col , Toast} from 'react-bootstrap';
import {postCreatePostagem} from "../../model/postagens/api"
import $, { param } from "jquery";
import 'bootstrap/dist/css/bootstrap.min.css';
import "@blueprintjs/core/lib/css/blueprint.css"
import "@blueprintjs/icons/lib/css/blueprint-icons.css"

export default class PostCreateEmpresa extends React.Component {

    constructor(props) {
        super(props);
        this.cadastrar = this.cadastrar.bind(this);
        this.state = { close_msg: false, variant: "primary", msg_text: "", msg_title: "" };

    }

    closeToasts() {
        this.setState({ close_msg: false });
    }

    getMin() {

        let date = new Date();

        return date.getMinutes()

    }


    async cadastrar() {

        let descricao = $("#descricao").val()

        let params = {
            descricao

        }
  
        let res = await postCreatePostagem(params);

        debugger
        if (res.data.Ok) {

            this.setState({ close_msg: true, msg_text: "Postagem cadastrada com sucesso!", msg_title: "Parabéns" });


        } else {
            this.setState({ close_msg: true, msg_text: "Não foi possível cadastrar a postagem", msg_title: "Error!!" });

        }
    }


    render() {

        return (

            <div>

                <NavbarEmpresa />
                <div className="container mt-4">

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

                    <Form>
                    
                        <Form.Group>
                            <Form.Label>Descrição: (obrigatório)</Form.Label>
                            <Form.Control id="descricao" as="textarea" rows={3} />
                        </Form.Group>

                        <Button onClick={this.cadastrar} variant="primary" type="button">
                            Cadastrar
                        </Button>
                    </Form>

                </div>

            </div>


        );
    }
}