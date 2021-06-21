import React from 'react';
import NavbarEmpresa from "../navbar/index.empresa"
import { Form, Button, Alert, Col , Toast} from 'react-bootstrap';
import IntlCurrencyInput from "react-intl-currency-input"
import $ from "jquery";
import 'bootstrap/dist/css/bootstrap.min.css';
import "@blueprintjs/core/lib/css/blueprint.css"
import "@blueprintjs/icons/lib/css/blueprint-icons.css"
import { postCadastroVaga } from "../../stores/vagas/api"
import { AppToaster } from "../../others/toaster"
import { v4 as uuidv4 } from 'uuid';

import { ReactReduxContext } from 'react-redux';
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
    }

    closeToasts() {
        this.setState({ close_msg: false });
    }

    getMin() {

        let date = new Date();

        return date.getMinutes()

    }


    cadastrar = async  () => {

        let formData = new FormData();

        let file = document.querySelector('#file');

        formData.append("id", uuidv4());
        formData.append("file", file.files[0]);
        formData.append("valor", $("#valor-vaga").val().slice(3).replaceAll(".", "").replace(",", ""));
        formData.append("descricao", $("#descricao").val());
        formData.append("cidade", $("#cidade").val());
        formData.append("turno", $("#turno").val());
        formData.append("estado", $("#estado").val());
        formData.append("disponibilidade_viajar", $("#disponibilidade").prop("checked").toString());
        formData.append("planejamento_futuro", $("#planejamento").prop("checked").toString());

        if (!file.files[0]){
            AppToaster.show({message: "Precisa anexar a imagem para prosseguir", intent: "warning" });
            return;
        }

        let config = {

            headers: {
                'Content-Type': 'multipart/form-data'
            }

        }

        let res = await postCadastroVaga(formData, config);

        if (res.data.Ok) {
            AppToaster.show({message: "Vaga cadastrada com sucesso!", intent: "success" });

        } else {
            AppToaster.show({message: "Não foi possível cadastrar a vaga", intent: "danger" });
        }
    }


    render() {

        return (

            <div>

            {/*     <NavbarEmpresa /> */}
                <div className="container mt-4">

                    <Form className="mt-4">
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
                                <Form.File  id="file" label="Imagem da vaga (obrigatório)" />
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