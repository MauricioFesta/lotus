import React from 'react';
import NavbarEmpresa from "../navbar/index.empresa"
import { Button, Card, Image } from 'semantic-ui-react'
import { Figure, Jumbotron, Container, Row, Form } from 'react-bootstrap';
import { listVagasEmpresaId, downloadCurriculoCandidato, candidatoAprovar,candidatoDesaprovar } from "../../stores/vagas/api"
import * as Mui from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import CheckIcon from '@material-ui/icons/Check';
import { confirmAlert } from 'react-confirm-alert';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import { AppToaster } from "../../others/toaster"
import socket from '../socket';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { observable } from 'mobx';
import { observer } from "mobx-react";

const styleButomPrincipal = {
    color: '#32CD32',

};


class CandidatosEmpresa extends React.Component {



    constructor(props) {

        super(props);
        this.state = { candidatos: false };

        this.obs = observable({
            id_vaga: 0

        })

    }

    async componentDidMount() {

        let url = window.location.pathname.split("/")

        let res = await listVagasEmpresaId(url[3])

        console.log(res)

        this.obs.id_vaga = url[3]

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
                        onClick: () => { desaProvar(id) }
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

        const validaSelecionado = (arr_vagas) => {

            return arr_vagas.indexOf(this.obs.id_vaga) === -1
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

        const desaProvar = async (id) => {

            let channel = socket.channel("notify:open");

            channel.join()
                .receive("ok", resp => {

                    console.log("Bem vindo", resp)
                })
                .receive("error", resp => {
                    console.log("Error", resp)
                })

            let data = {

                id_vaga: this.obs.id_vaga
            }

            let res = await candidatoDesaprovar(id, data)

            if (res.data.Ok) {

                channel.push("notify_send", { body: "Candidato desaprovado" })

                this.componentDidMount() 

                AppToaster.show({ message: "Candidato desaprovado com sucesso", intent: "success" });

            } else {

                AppToaster.show({ message: "Erro, tente novamente mais tarde", intent: "danger" });
            }


        }

        const aprovar = async (id, bol) => {



            let channel = socket.channel("notify:open");

            channel.join()
                .receive("ok", resp => {

                    console.log("Bem vindo", resp)
                })
                .receive("error", resp => {
                    console.log("Error", resp)
                })

            let data = {
                boolean: bol,
                id_vaga: this.obs.id_vaga,
                id_user: id
            }

            let res = await candidatoAprovar(id, data)

            if (res.data.Ok) {

                channel.push("notify_send", { body: "Candidato aceito" })

                this.componentDidMount() 

                AppToaster.show({ message: "Candidato aprovado com sucesso", intent: "success" });

            } else {
                AppToaster.show({ message: "Candidato já selecionado", intent: "warning" });
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
                                                    {validaSelecionado(el.vagas_aprovadas) ?
                                                        tornarSelecionado(el.id)
                                                        :
                                                        candidatoSelecionado(el.id)
                                                    }



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

export default observer(CandidatosEmpresa)