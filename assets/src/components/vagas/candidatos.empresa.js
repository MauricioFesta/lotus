import React from 'react';
import NavbarEmpresa from "../navbar/index.empresa"
import { Button, Card, Image } from 'semantic-ui-react'
import { Figure, Jumbotron, Container, Row, Form } from 'react-bootstrap';
import { listVagasEmpresaId, downloadCurriculoCandidato } from "../../stores/vagas/api"
import * as Mui from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import CheckIcon from '@material-ui/icons/Check';


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

        async function download_Pdf(el) {

            let res = await downloadCurriculoCandidato(el)

            window.open(`/pdf_tmp/${res.data}`, false)


        }

        async function aprovar(el) {

            // let res = await downloadCurriculoCandidato(el)

            // window.open(`/pdf_tmp/${res.data}`, false)
            console.log("aprovar", el)


        }


        function downloadFormatter(id) {
            return (
                <Mui.IconButton onClick={() => { download_Pdf(id) }} color="primary" aria-label="upload picture" component="span">
                    <GetAppIcon />
                </Mui.IconButton>

            );
        }

        function aprovarCandidato(id) {
            return (
                <Mui.IconButton onClick={() => { aprovar(id) }} color="primary" aria-label="upload picture" component="span">
                    <CheckIcon />
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
                                                    {aprovarCandidato(el.id)}
                                                  
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