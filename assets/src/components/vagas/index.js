import React from 'react';
import { CardDeck, Form, Modal } from 'react-bootstrap';
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
import { idMaster,tokenMain } from "../login/auth"
import socket from '../socket';
import Alert from '@material-ui/lab/Alert';
import { observable } from 'mobx';
import { observer } from "mobx-react";
import Ramo from "./filters/ramo"
import Empresa from "./filters/empresa"
import { allEmpresas } from "../../stores/vagas/api"
import { Spinner } from "@blueprintjs/core";
import { vagaView } from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import history from "../../others/redirect";
import init, { get_vagas, get_curriculos } from "../../wasm/pkg/wasm";
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardFooter,
    Badge,
    Button
} from "shards-react";
// import PhotoCamera from '@mui/icons-material/PhotoCamera';

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
            open_spinner: false,
            principal_curriculo: false,
            vagas: []

        })

    }

    async componentDidMount() {

        this.getVagas()
        let res = await allEmpresas()

        this.obs.data_empresas = res.data


    }

    handleRedirect(path, vaga) {

        this.props.vagaView({ ...vaga })
        history.push(path);

    }

    getVagas = async (new_data) => {

        this.obs.open_spinner = true

        let tmp = 0, array = [], array2 = [];

        // let res = await listVagas()
        await init()
        let res = await get_vagas()
       
        listVagasAprovadas().then(result => {

            this.obs.candidato_vagas = [...result.data[0].vagas_aprovadas]

        })

        let token = tokenMain()

        get_curriculos(token).then(result => {
        
            this.obs.principal_curriculo = false

            if (result.length > 0) {
                this.obs.is_curriculo = true
            }

            for (let i = 0; i < result.length; i++) {

                if (result[i].principal) {

                    this.obs.principal_curriculo = true
                    break

                }

            }

        })

        // getCurriculo().then(result => {
            

        //     this.obs.principal_curriculo = false

        //     if (result.data.length > 0) {
        //         this.obs.is_curriculo = true
        //     }

        //     for (let i = 0; i < result.data.length; i++) {

        //         if (result.data[i].principal) {

        //             this.obs.principal_curriculo = true
        //             break

        //         }

        //     }

        // })

        if (new_data) {

            res = new_data

        }

        if (Array.isArray(res)) {

            this.obs.vagas = res

            res.map(el => {

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

        if (!this.obs.principal_curriculo) {

            AppToaster.show({ message: "Você precia por um curriculo como principal, para se candidatar", intent: "warning" });
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

            channel.push("notify_send:" + empresa_id, { body: "Candidado se cadastrou na vaga, verifique..." })

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

                <Form className="mt-4">

                    <Form.Row>
                        {/* <Col>
                                <Form.Group as={Col} controlId="formSetor">

                                    <Ramo empresas={this.obs.data_empresas} getVagas={this.getVagas} />

                                </Form.Group>
                            </Col> */}
                        <Col>
                            <Form.Group as={Col} controlId="formSetor">

                                <Empresa empresas={this.obs.data_empresas} getVagas={this.getVagas} />

                            </Form.Group>
                        </Col>
                        {/* <Col>
                                <Form.Group as={Col} controlId="formLocation">

                                    <Form.Label>Endereço</Form.Label>

                                    <FilterLocation size="small" />
                                    <Form.Text className="text-muted">
                                        Selecione estado ou cidade para o filtro.
                                    </Form.Text>

                                </Form.Group>
                            </Col> */}
                    </Form.Row>

                </Form>

                <Container fluid className="main-content-container px-4">

                    <Row>

                        {this.state.vagas.map((el, index) => {


                            return (

                                <>
                                    <Row noGutters className="page-header py-4">
                                        {/* <PageTitle sm="4" title="Blog Posts" subtitle="Components" className="text-sm-left" /> */}
                                    </Row>

                                    {this.obs.vagas.map((post, idx) => (
                                        <Col lg="3" md="6" sm="12" className="mb-4" key={idx}>

                                            <Card small className="card-post card-post--1">
                                                {!this.handleCandidatoAprovado(post.id) &&

                                                    <Alert variant="filled" className="mt-2 mb-2 ml-2 mr-2" severity="success">
                                                        Parabéns você foi selecionado para esta vaga, aguarde o contato da empresa. E boa sorte :)
                                                    </Alert>

                                                }
                                                <div

                                                    className={this.handleValidaCandidato(post.candidatos) ? 'card-post__image' : "card-post__image candidatura-enviada"}
                                                    style={{ backgroundImage: `url(${"data:image/png;base64," + post.imagem_base64})` }}
                                                >
                                                    <Badge
                                                        pill
                                                        className={`card-post__category bg-${"post.categoryTheme"}`}
                                                    >
                                                        {post.ramo}
                                                    </Badge>
                                                    <div className="card-post__author d-flex">
                                                        <a
                                                            href="#"
                                                            className="card-post__author-avatar card-post__author-avatar--small"
                                                            style={{ backgroundImage: `url('${post.authorAvatar}')` }}
                                                        >
                                                            Written by {"post.author"}
                                                        </a>
                                                    </div>
                                                </div>
                                                <CardBody>
                                                    <h5 className="card-title">
                                                        <a href="#" className="text-fiord-blue">
                                                            {post.titulo}
                                                        </a>
                                                    </h5>
                                                    <p className="card-text d-inline-block mb-3">
                                                        {post.descricao.slice(0, 180) + "..."}</p>
                                                    {this.handleValidaCandidato(post.candidatos) ?
                                                        <Mui.Button
                                                            size="small"
                                                            variant="contained"
                                                            color="primary"
                                                            endIcon={<SendIcon />}
                                                            onClick={() => this.candidatarSeVaga(post.id, post.empresa_id)}
                                                        >
                                                            Candidatar-se
                                                        </Mui.Button>

                                                        :

                                                        this.handleCandidatoAprovado(post.id) &&

                                                        <Mui.Button
                                                            size="small"
                                                            variant="contained"
                                                            color="secondary"
                                                            endIcon={<DeleteIcon />}
                                                            onClick={() => this.excluirCandidaturaVaga(post.id)}
                                                        >
                                                            Excluir
                                                        </Mui.Button>

                                                    }

                                                    &nbsp;
                                                    <Mui.IconButton size="small" onClick={() => this.handleRedirect("/vaga-details", post)} color="primary" aria-label="upload picture" component="span">

                                                        Mais
                                                    </Mui.IconButton>

                                                    {/* <Mui.Button
                                                        size="small"
                                                        variant="contained"
                                                        color="primary"
                                                        endIcon={<SendIcon />}
                                                        
                                                    >
                                                        Teste
                                                    </Mui.Button> */}

                                                </CardBody>
                                            </Card>
                                        </Col>
                                    ))}


                                </>

                            )

                        })

                        }
                    </Row>
                </Container>


            </ >

        );
    }
}


const mapStateToProps = store => ({

    vaga_one: store.vagasState.vaga_one,

});
const mapDispatchToProps = dispatch =>
    bindActionCreators({ vagaView }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(observer(Vagas));