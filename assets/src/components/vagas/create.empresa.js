import React from 'react';
import NavbarEmpresa from "../navbar/index.empresa"
import { Form, Button, Alert, Col } from 'react-bootstrap';
import IntlCurrencyInput from "react-intl-currency-input"
import $ from "jquery";


import 'bootstrap/dist/css/bootstrap.min.css';
import "@blueprintjs/core/lib/css/blueprint.css"
import "@blueprintjs/icons/lib/css/blueprint-icons.css"

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

    async cadastrar(){

        let valor =  $("#valor-vaga").val();
        let descricao = $("#descricao").val();
        let cidade = $("#cidade").val()
        let turno = $("#turno").val()
        let estado = $("#estado").val()
 
        let params = {
           

        }

        return
    }
  

    render() {

        return (

            <div>

                <NavbarEmpresa />
                <div className="container mt-4">

                    <Form>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Valor da vaga: (opcional)</Form.Label>
                                <IntlCurrencyInput id="valor-vaga" className="form-control" currency="BRL" config={currencyConfig}
                                    onChange={() => {}} />
                            </Form.Group>

                        </Form.Row>

                        <Form.Group>
                            <Form.Label>Descrição: (obrigatório)</Form.Label>
                            <Form.Control id="descricao" as="textarea" rows={3} />
                        </Form.Group>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Turno: (obrigatório)</Form.Label>
                                <Form.Control id="turno"  as="select" defaultValue="Choose...">
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



                        <Form.Group>
                            <Form.Check
                                type="switch"
                                id="disponibilidade"
                                label="Disponibilidade para viajar ?"
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Check
                                type="switch"
                                id="planejamento"
                                label="Planejamento Futuro ?" />
                        </Form.Group>



                        <Button onClick={() => this.cadastrar()} variant="primary" type="submit">
                            Cadastrar
                        </Button>
                    </Form>

                </div>

            </div>


        );
    }
}