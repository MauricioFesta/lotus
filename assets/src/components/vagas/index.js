import React from 'react';
import { Button, Card, CardDeck, Row, Form, Col, Modal } from 'react-bootstrap';
import Navbar from "../navbar/index"
import { listVagas, listVagasAprovadas } from "../../stores/vagas/api"
import { AppToaster } from "../../others/toaster"
import { postCandidatarseVaga, deleteCandidatarseVaga } from "../../stores/vagas/api"
import { getCurriculo } from "../../stores/curriculo/api";
import 'bootstrap/dist/css/bootstrap.min.css';
import "@blueprintjs/core/lib/css/blueprint.css"
import "@blueprintjs/icons/lib/css/blueprint-icons.css"
import * as Mui from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';
import { idMaster } from "../login/auth"
import socket from '../socket';
import Alert from '@material-ui/lab/Alert';
import { observable } from 'mobx';
import { observer } from "mobx-react";
import FilterLocation from "./filters/location"
import Ramo from "./filters/ramo"
import Empresa from "./filters/empresa"
import { allEmpresas } from "../../stores/vagas/api"
import { Spinner } from "@blueprintjs/core";



const id_master = idMaster()


require("./css/index.scss")

class Vagas extends React.Component {

    constructor(props) {

        super(props);
        this.state = { vagas: [], qtdline: 0, variant: "primary", text: "null" };
        this.teste = 10

        this.obs = observable({
            candidato_vagas: [],
            is_curriculo: false,
            data_empresas: [],
            open_spinner: false

        })

    }

    async componentDidMount() {

        this.getVagas()
        let res = await allEmpresas()

        this.obs.data_empresas = res.data

    }

    getVagas = async (new_data) => {

        this.obs.open_spinner = true

        let tmp = 0, array = [], array2 = [];

        let res = await listVagas()

        let res2 = await listVagasAprovadas()
        let res3 = await getCurriculo()

        if (res3.data.length > 0) {
            this.obs.is_curriculo = true
        }

        if (new_data) {

            res = new_data

        }

        this.obs.candidato_vagas = [...res2.data[0].vagas_aprovadas]




        if (Array.isArray(res.data)) {

            res.data.map(el => {

                if (tmp === 5) {

                    array2.push(array)
                    array = []
                    tmp = 0

                }
                array.push(el)
                tmp++
            })

            array2.push(array)

            this.setState({ vagas: array2 })

        }

        this.obs.open_spinner = false

    }

    async candidatarSeVaga(id, empresa_id) {

        if (!this.obs.is_curriculo) {

            AppToaster.show({ message: "Você precia ter um currículo cadastrado para se candidatar", intent: "warning" });
            return
        }

        let channel = socket.channel("notify:open");

        channel.join()
            .receive("ok", resp => {

                console.log("Bem vindo", resp)
            })
            .receive("error", resp => {
                console.log("Error", resp)
            })

        let data = {
            id,
            empresa_id
        }

        let res = await postCandidatarseVaga(data)


        if (res.data.Ok) {

            channel.push("notify_send", { body: "Candidado se cadastrou na vaga x" })

            AppToaster.show({ message: "Candidatura enviada com sucesso", intent: "success" });
            this.componentDidMount()
        } else if (res.data.erro) {
            AppToaster.show({ message: `Não foi possível, error: ${res.data.erro}`, intent: "warning" });

        } else {
            AppToaster.show({ message: "Error, tente novamente mais tarde", intent: "danger" });
        }

    }


    async excluirCandidaturaVaga(id_vaga) {
        let res = await deleteCandidatarseVaga(id_vaga)
        if (res.data.Ok) {
            AppToaster.show({ message: "Candidatura retirada com sucesso", intent: "success" });
            this.componentDidMount()
        } else {
            AppToaster.show({ message: "Error, tente novamente mais tarde", intent: "danger" });
        }
    }

    handleValidaCandidato(arrCandidatos) {

        return arrCandidatos.indexOf(id_master) === -1

    }

    handleCandidatoAprovado(id) {

        return this.obs.candidato_vagas.indexOf(id) === -1
    }

    render() {


        return (

            <>

                <Modal show={this.obs.open_spinner}>

                    <Modal.Body>

                        <Spinner size={80} value={null} />

                    </Modal.Body>

                </Modal>
                <div className="ml-4 mr-4 mt-4 scroll-card">


                    <Form className="mt-4">

                        <Form.Row>
                            <Col>
                                <Form.Group as={Col} controlId="formSetor">

                                    <Ramo empresas={this.obs.data_empresas} getVagas={this.getVagas} />

                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group as={Col} controlId="formSetor">

                                    <Empresa empresas={this.obs.data_empresas} getVagas={this.getVagas} />

                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group as={Col} controlId="formLocation">

                                    <Form.Label>Endereço</Form.Label>

                                    <FilterLocation size="small" />
                                    <Form.Text className="text-muted">
                                        Selecione estado ou cidade para o filtro.
                                    </Form.Text>

                                </Form.Group>
                            </Col>
                        </Form.Row>

                    </Form>



                    {this.state.vagas.map((el, index) => {

                        return (
                            <>
                                <CardDeck className="mt-4" key={index}>

                                    {el.map((el2, index) => {

                                        return (

                                            <Card className="vagas-cards" key={index}>
                                                {!this.handleCandidatoAprovado(el2.id) &&

                                                    <Alert variant="filled" className="mt-2 mb-2 ml-2 mr-2" severity="success">
                                                        Parabéns você foi selecionado para esta vaga, aguarde o contato da empresa. E boa sorte :)
                                                    </Alert>

                                                }
                                                <Card.Img className={this.handleValidaCandidato(el2.candidatos) ? '' : "candidatura-enviada"} variant="top" src={"data:image/png;base64," + el2.imagem_base64} />
                                                <Card.Body>

                                                    <Card.Title className={this.handleValidaCandidato(el2.candidatos) ? 'vagas-cards-title' : "candidatura-enviada vagas-cards-title"}>{el2.cidade}</Card.Title>
                                                    <Card.Text className={this.handleValidaCandidato(el2.candidatos) ? '' : "candidatura-enviada"}>
                                                        {el2.descricao}
                                                    </Card.Text>

                                                    {this.handleValidaCandidato(el2.candidatos) ?
                                                        <Mui.Button
                                                            size="small"
                                                            variant="contained"
                                                            color="primary"
                                                            endIcon={<SendIcon />}
                                                            onClick={() => this.candidatarSeVaga(el2.id, el2.empresa_id)}
                                                        >
                                                            Candidatar-se
                                                        </Mui.Button>

                                                        :

                                                        this.handleCandidatoAprovado(el2.id) &&

                                                        <Mui.Button
                                                            size="small"
                                                            variant="contained"
                                                            color="secondary"
                                                            endIcon={<DeleteIcon />}
                                                            onClick={() => this.excluirCandidaturaVaga(el2.id)}
                                                        >
                                                            Excluir
                                                        </Mui.Button>

                                                    }

                                                </Card.Body>

                                                <Card.Footer>
                                                    <small className="text-muted">Atualizado em 3 mins agora</small>
                                                </Card.Footer>
                                            </Card>

                                        )
                                    })

                                    }

                                </CardDeck>
                                <br></br>

                            </>
                        )

                    })

                    }
                </div>

            </ >

        );
    }
}

export default observer(Vagas)