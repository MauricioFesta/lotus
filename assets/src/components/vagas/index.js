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
import Cookies from 'universal-cookie';
import { secret } from "../login/secret"
const cookies = new Cookies();
var jwt = require('jsonwebtoken');

let ck_token = cookies.get('_A-T-T_L');
var decoded = jwt.verify(ck_token, secret());

const id_master = decoded.id



require("./css/index.css")

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

        console.log(id)

        let data = {
            id
        }

        let res = await postCandidatarseVaga(data)


        if (res.data.Ok) {
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
        console.log(res)
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
                                                            Candidatar-se
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