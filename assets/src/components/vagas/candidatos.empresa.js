import React from 'react';
import NavbarEmpresa from "../navbar/index.empresa"
import { Card, Image } from 'semantic-ui-react'
import {Jumbotron, Modal } from 'react-bootstrap';
import { listVagasEmpresaId, downloadCurriculoCandidato, candidatoAprovar, candidatoDesaprovar } from "../../stores/vagas/api"
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
import { Spinner } from "@blueprintjs/core";

const styleButomPrincipal = {
    color: '#32CD32',

};


class CandidatosEmpresa extends React.Component {



    constructor(props) {

        super(props);
        this.state = { candidatos: false };

        this.obs = observable({
            id_vaga: 0,
            open_spinner: false


        })

    }

    async componentDidMount() {

        let url = window.location.pathname.split("/")

        this.obs.open_spinner = true

        let res = await listVagasEmpresaId(url[3])

        this.obs.id_vaga = url[3]

        this.setState({ candidatos: res.data })

        this.obs.open_spinner = false


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

            let response = await downloadCurriculoCandidato(el)

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'curriculo.pdf'); //or any other extension
            document.body.appendChild(link);
            link.click();


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

                channel.push("notify_send:" + id, { body: "Você foi desaprovado, :( em uma vaga." })

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

                channel.push("notify_send:" + id, { body: "Parabéns você foi aprovado em uma vaga, verifique..." })

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

            <>

                <Modal show={this.obs.open_spinner}>

                    <Modal.Body>

                        <Spinner size={80} value={null} />

                    </Modal.Body>

                </Modal>


                <div className="mt-4 ml-4 mt-4 mr-4">

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
                                                    {/* <Card.Meta></Card.Meta>
                                                <Card.Description>
                                                    Steve wants to add you to the group <strong>best friends</strong>
                                                </Card.Description> */}
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
                </div>

            </>



        );
    }
}

export default observer(CandidatosEmpresa)