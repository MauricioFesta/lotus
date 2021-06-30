import React from 'react';
import NavbarEmpresa from "../navbar/index.empresa"
import { Button, Card, Image } from 'semantic-ui-react'
import { Figure, Jumbotron, Container, Row, Form } from 'react-bootstrap';
import { listVagasEmpresaId, downloadCurriculoCandidato, candidatoAprovar } from "../../stores/vagas/api"
import * as Mui from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import CheckIcon from '@material-ui/icons/Check';
import { confirmAlert } from 'react-confirm-alert';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import { AppToaster } from "../../others/toaster"
import socket from '../socket';
import 'react-confirm-alert/src/react-confirm-alert.css';


const styleButomPrincipal = {
    color: '#32CD32',

};


export default class CandidatosEmpresa extends React.Component {

    constructor(props) {

        super(props);
        this.state = { candidatos: false };

    }

    async componentDidMount() {

        let url = window.location.pathname.split("/")

        let res = await listVagasEmpresaId(url[3])

        this.setState({ candidatos: res.data })


    }

    render() {

        const confirmNotSelecionado = (id) => {
            confirmAlert({
                title: 'Alerta',
                message: 'Deseja remover este candidato ?',
                buttons: [
                    {
                        label: 'Sim',
                        onClick: () => { aprovar(id, false) }
                    },
                    {
                        label: 'Não',
                        onClick: () => { }
                    }
                ]
            });
        }

        const confirmSelecionado = (id) => {

            confirmAlert({
                title: 'Alerta',
                message: 'Deseja selecionar este candidato',
                buttons: [
                    {
                        label: 'Sim',
                        onClick: () => { aprovar(id, true) }
                    },
                    {
                        label: 'Não',
                        onClick: () => { }
                    }
                ]
            });
        };

        async function download_Pdf(el) {

            let res = await downloadCurriculoCandidato(el)

            window.open(`/pdf_tmp/${res.data}`, false)


        }


        function tornarSelecionado(id) {
            return (

                <Mui.IconButton onClick={() => confirmSelecionado(id)} color="primary" aria-label="upload picture" component="span">
                    <CheckIcon />
                </Mui.IconButton>

            )
        }



        function candidatoSelecionado(id) {
            return (

                <Mui.IconButton style={styleButomPrincipal} onClick={() => confirmNotSelecionado(id)} color="primary" aria-label="upload picture" component="span">
                    <DoneAllIcon />
                </Mui.IconButton>

            )
        }

        async function aprovar(id, bol) {

            let channel = socket.channel("notify:open");

            channel.join()
                .receive("ok", resp => {

                    console.log("Bem vindo", resp)
                })
                .receive("error", resp => {
                    console.log("Error", resp)
                })

            let data = {
                boolean: bol
            }

            let res = await candidatoAprovar(id, data)

            if (res.data.Ok) {


                channel.push("notify_send", { body: "Candidato aceito" })

                AppToaster.show({ message: "Candidato aprovado com sucesso", intent: "success" });

            }

        }


        function downloadFormatter(id) {
            return (
                <Mui.IconButton onClick={() => { download_Pdf(id) }} color="primary" aria-label="upload picture" component="span">
                    <GetAppIcon />
                </Mui.IconButton>

            );
        }



        return (


            <Container className="mt-4">

                <Jumbotron className="mt-4">


                    <Card.Group>
                        {this.state.candidatos &&

                            this.state.candidatos.map(el => {
                                return (
                                    <>

                                        <Card>
                                            <Card.Content>
                                                <Image
                                                    floated='right'
                                                    size='mini'
                                                    src={"data:image/png;base64," + el.foto_base64}
                                                />
                                                <Card.Header>{el.nome}</Card.Header>
                                                <Card.Meta>Friends of Elliot</Card.Meta>
                                                <Card.Description>
                                                    Steve wants to add you to the group <strong>best friends</strong>
                                                </Card.Description>
                                            </Card.Content>
                                            <Card.Content extra>
                                                <div className='ui two buttons'>

                                                    {downloadFormatter(el.id)}
                                                    {tornarSelecionado(el.id)}

                                                </div>
                                            </Card.Content>
                                        </Card>
                                    </>

                                )



                            })

                        }

                    </Card.Group>

                </Jumbotron>
            </Container>



        );
    }
}