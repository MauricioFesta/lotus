import React from 'react';
import { Button, Card, CardDeck } from 'react-bootstrap';
import Navbar from "../navbar/index"
import { listVagas } from "../../stores/vagas/api"
import { AppToaster } from "../../others/toaster"
import { postCandidatarseVaga, deleteCandidatarseVaga } from "../../stores/vagas/api"
import 'bootstrap/dist/css/bootstrap.min.css';
import "@blueprintjs/core/lib/css/blueprint.css"
import "@blueprintjs/icons/lib/css/blueprint-icons.css"
import * as Mui from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';
import { idMaster } from "../login/auth"
import socket from '../socket';

const id_master = idMaster()



require("./css/index.scss")

export default class Vagas extends React.Component {

    constructor(props) {

        super(props);
        this.state = { vagas: [], qtdline: 0, variant: "primary", text: "null" };

    }

    async componentDidMount() {

        let tmp = 0, array = [], array2 = [];

        let res = await listVagas()


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

    }

    async candidatarSeVaga(id) {

        let channel = socket.channel("notify:open");

        channel.join()
            .receive("ok", resp => {

                console.log("Bem vindo", resp)
            })
            .receive("error", resp => {
                console.log("Error", resp)
            })

        let data = {
            id
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
        }else {
            AppToaster.show({ message: "Error, tente novamente mais tarde", intent: "danger" });
        }
    }

    handleValidaCandidato(arrCandidatos) {

        return arrCandidatos.indexOf(id_master) === -1

    }

    render() {

        return (

            <div>

                <div className="container mt-4 scroll-card">

                    {this.state.vagas.map((el, index) => {

                        return (
                            <>
                                <CardDeck className="mt-4" key={index}>

                                    {el.map((el2, index) => {

                                        return (

                                            <Card key={index}>
                                                <Card.Img  className={this.handleValidaCandidato(el2.candidatos) ? '': "candidatura-enviada" } variant="top" src={"data:image/png;base64," + el2.imagem_base64} />
                                                <Card.Body>
                                                    <Card.Title className={this.handleValidaCandidato(el2.candidatos) ? '': "candidatura-enviada" }>{el2.cidade}</Card.Title>
                                                    <Card.Text className={this.handleValidaCandidato(el2.candidatos) ? '': "candidatura-enviada" }>
                                                        {el2.descricao}
                                                    </Card.Text>

                                                    {this.handleValidaCandidato(el2.candidatos) ?
                                                        <Mui.Button
                                                            size="small"
                                                            variant="contained"
                                                            color="primary"
                                                            endIcon={<SendIcon />}
                                                            onClick={() => this.candidatarSeVaga(el2.id)}
                                                        >
                                                            Candidatar
                                                        </Mui.Button>

                                                        :
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

            </div >

        );
    }
}