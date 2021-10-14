import React from 'react';
import NavbarEmpresa from "../navbar/index.empresa"
import { Jumbotron, Form, Col, Button } from 'react-bootstrap';
import { Card, Icon } from 'semantic-ui-react'
import Alert from '@material-ui/lab/Alert';
import { Store } from "../../store";
import { observable } from 'mobx';
import { observer } from "mobx-react";
import IntlCurrencyInput from "react-intl-currency-input"
import history from "../../others/redirect";
import { updateVaga } from "../../stores/vagas/api"
import { AppToaster } from "../../others/toaster"

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


class VagasEmpresaEditar extends React.Component {

    constructor(props) {

        super(props);

        this.obs = observable({

            vaga: Store.getState().vagasState.vaga_one,
            disable_all: false,
            valor_ref: Store.getState().vagasState.vaga_one.valor

        })


    }

    async componentDidMount() {

        if (!this.obs.vaga.id) {

            history.push("/vagas/cadastradas");
        }

    }

    handeDisabledVaga(check) {

        this.obs.disable_all = check
        this.obs.vaga.ativo = !check
    }

    async handleSendEditVaga() {

        if(!this.obs.vaga.valor && !this.obs.valor_ref){

            AppToaster.show({ message: "Preencha um valor válido", intent: "warning" });
            return
        }


        if(typeof(this.obs.valor_ref) == "string"){

            this.obs.vaga.valor = this.obs.valor_ref.slice(3).replace(",", "").slice(0, -2).replace(".", "")

        }
  
        let resp = await updateVaga(this.obs.vaga)

        if (resp.data.ok) {

            AppToaster.show({ message: "Vaga alterada com sucesso!", intent: "success" });

        } else {

            AppToaster.show({ message: "Não foi possível alterar a vaga", intent: "danger" });

        }

        console.log(this.obs.vaga, "Teste")
    }

    render() {


        return (



            <div className="mt-4 ml-4 mr-4">

                <Jumbotron className="mt-4">

                    <Form.Group>
                        <Form.Check
                            type="switch"
                            id="jjbb"
                            label="Desabilitar vaga"
                            defaultChecked={!this.obs.vaga.ativo}
                            onChange={(vl) => this.handeDisabledVaga(vl.target.checked)}
                        />
                    </Form.Group>
                    <div className="container mt-4">

                        <Form className="mt-4">

                            <Form.Group>
                                <Form.Label>Valor da vaga: (opcional)</Form.Label>
                                <IntlCurrencyInput disabled={this.obs.disable_all} defaultValue={this.obs.valor_ref} className="form-control" currency="BRL" config={currencyConfig}
                                    onChange={(vl) => this.obs.valor_ref = vl.target.value} />
                                <Form.Text className="text-muted">
                                    valor em R$
                                </Form.Text>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Título (obrigatório)</Form.Label>
                                <Form.Control disabled={this.obs.disable_all} defaultValue={this.obs.vaga.titulo} onChange={(vl) => this.obs.vaga.titulo = vl.target.value} type="titulo" placeholder="título" />
                                <Form.Text className="text-muted">
                                    forneça um título para o cadastro
                                </Form.Text>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Descrição: (obrigatório)</Form.Label>
                                <Form.Control disabled={this.obs.disable_all} defaultValue={this.obs.vaga.descricao} onChange={(vl) => this.obs.vaga.descricao = vl.target.value} as="textarea" rows={3} />
                                <Form.Text className="text-muted">
                                    uma pequena descrição máximo 100 caracteres
                                </Form.Text>
                            </Form.Group>

                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Turno: (obrigatório)</Form.Label>
                                    <Form.Control disabled={this.obs.disable_all} as="select" onChange={(vl) => this.obs.vaga.turno = vl.target.value} defaultValue="Choose...">

                                        <option>{this.obs.vaga.turno}</option>
                                        <option>Diurmo</option>
                                        <option>Noturno</option>

                                    </Form.Control>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Cidade: (obrigatório)</Form.Label>
                                    <Form.Control disabled={this.obs.disable_all} as="select" onChange={(vl) => this.obs.vaga.cidade = vl.target.value} defaultVale="Choose...">
                                        <option>{this.obs.vaga.cidade}</option>
                                        <option>Bento Gonçalves</option>
                                        <option>Garibaldi</option>
                                        <option>Carlos Barbosa</option>
                                        <option>Monte Belo</option>
                                        <option>Monte Belo do Sul</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Estado: (obrigatório)</Form.Label>
                                    <Form.Control disabled={this.obs.disable_all} as="select" defaultValue="Choose...">
                                        <option>RS</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Ramo: (obrigatório)</Form.Label>
                                    <Form.Control disabled={this.obs.disable_all} onChange={(vl) => this.obs.vaga.ramo = vl.target.value} as="select" defaultValue="Choose...">
                                        <option>{this.obs.vaga.ramo}</option>
                                        <option value="metalurgico">Metalúrgico</option>
                                        <option value="comercio">Comércio</option>
                                        <option value="alimentos">Alimentos</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.File disabled={this.obs.disable_all} id="file" label="Imagem da vaga (obrigatório)" />
                                    <Form.Text className="text-muted">
                                        esta imagem irá aparecer no cabeçalho da vaga
                                    </Form.Text>
                                </Form.Group>

                            </Form.Row>

                            <Form.Row>

                                <Form.Group>
                                    <Form.Check
                                        disabled={this.obs.disable_all}
                                        type="switch"
                                        id="disponibilidade"
                                        label="Disponibilidade para viajar ?"
                                        defaultChecked={this.obs.vaga.disponibilidade_viajar}
                                        onChange={(vl) => this.obs.vaga.disponibilidade_viajar = vl.target.checked}
                                    />
                                </Form.Group>

                                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;

                                <Form.Group>
                                    <Form.Check
                                        disabled={this.obs.disable_all}
                                        type="switch"
                                        id="planejamento"
                                        defaultChecked={this.obs.vaga.planejamento_futuro}
                                        onChange={(vl) => this.obs.vaga.planejamento_futuro = vl.target.checked}
                                        label="Planejamento Futuro ?" />
                                </Form.Group>

                            </Form.Row>

                            <Button onClick={() => this.handleSendEditVaga()} variant="primary" type="button">
                                Alterar Cadastro
                            </Button>
                        </Form>

                    </div>
                </Jumbotron>
            </div>



        );
    }
}

export default observer(VagasEmpresaEditar)