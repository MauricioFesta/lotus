import React from 'react';
import NavbarEmpresa from "../navbar/index.empresa"
import { Form, Button, Alert, Col , Toast} from 'react-bootstrap';
import IntlCurrencyInput from "react-intl-currency-input"
import $ from "jquery";
import 'bootstrap/dist/css/bootstrap.min.css';
import "@blueprintjs/core/lib/css/blueprint.css"
import "@blueprintjs/icons/lib/css/blueprint-icons.css"
import { postCadastroVaga } from "../../model/vagas/api"

const currencyConfig = {
    locale: "pt-BR",
    formats: {
        number: {
            BRL: {
                style: "currency",
                currency: "BRL",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            },
        },
    },
};

export default class CreateEmpresa extends React.Component {

    constructor(props) {
        super(props);
        this.cadastrar = this.cadastrar = this.cadastrar.bind(this);
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

        let formData = new FormData();

        let file = document.querySelector('#file');

        formData.append("file", file.files[0]);
        formData.append("valor", $("#valor-vaga").val().slice(3).replaceAll(".", "").replace(",", ""));
        formData.append("descricao", $("#descricao").val());
        formData.append("cidade", $("#cidade").val());
        formData.append("turno", $("#turno").val());
        formData.append("estado", $("#estado").val());
        formData.append("disponibilidade", $("#disponibilidade").prop("checked").toString());
        formData.append("planejamento", $("#planejamento").prop("checked").toString());

        let config = {

            headers: {
                'Content-Type': 'multipart/form-data'
            }

        }

        let res = await postCadastroVaga(formData, config);

        if (res.data.Ok) {

            this.setState({ close_msg: true, msg_text: "Vaga cadastrado com sucesso!", msg_title: "Parabéns" });


        } else {
            this.setState({ close_msg: true, msg_text: "Não foi possível cadastrar a vaga", msg_title: "Error!!" });

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
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Valor da vaga: (opcional)</Form.Label>
                                <IntlCurrencyInput id="valor-vaga" className="form-control" currency="BRL" config={currencyConfig}
                                    onChange={() => { }} />
                            </Form.Group>

                        </Form.Row>

                        <Form.Group>
                            <Form.Label>Descrição: (obrigatório)</Form.Label>
                            <Form.Control id="descricao" as="textarea" rows={3} />
                        </Form.Group>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Turno: (obrigatório)</Form.Label>
                                <Form.Control id="turno" as="select" defaultValue="Choose...">
                                    <option>Selecione</option>
                                    <option>Diurmo</option>
                                    <option>Noturno</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Cidade: (obrigatório)</Form.Label>
                                <Form.Control id="cidade" as="select" defaultValue="Choose...">
                                    <option>Selecione</option>
                                    <option>Bento Gonçalves</option>
                                    <option>São paulo</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Estado: (obrigatório)</Form.Label>
                                <Form.Control id="estado" as="select" defaultValue="Choose...">
                                    <option>Selecione</option>
                                    <option>RS</option>
                                    <option>SP</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.File id="file" label="Imagem da vaga (opcional)" />
                            </Form.Group>

                        </Form.Row>

                        <Form.Row>

                            <Form.Group>
                                <Form.Check
                                    type="switch"
                                    id="disponibilidade"
                                    label="Disponibilidade para viajar ?"
                                />
                            </Form.Group>

                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                            <Form.Group>
                                <Form.Check
                                    type="switch"
                                    id="planejamento"
                                    label="Planejamento Futuro ?" />
                            </Form.Group>

                        </Form.Row>

                        <Button onClick={this.cadastrar} variant="primary" type="button">
                            Cadastrar
                        </Button>
                    </Form>

                </div>

            </div>


        );
    }
}