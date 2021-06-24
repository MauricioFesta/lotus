import React from 'react';
import NavbarEmpresa from "../navbar/index.empresa"
import { Jumbotron, Container } from 'react-bootstrap';
import { Card, Icon } from 'semantic-ui-react'
import { listVagasEmpresa } from "../../stores/vagas/api"
import Alert from '@material-ui/lab/Alert';
import { Redirect } from "react-router-dom"


export default class VagasEmpresa extends React.Component {

    constructor(props) {

        super(props);
        this.state = { vagas: false, redirect: false, path: "" };

    }

    async componentDidMount() {

        let resp = await listVagasEmpresa()

        if (Array.isArray(resp.data)) {

            this.setState({ vagas: resp.data })

        }

    }

    render() {


        return (



            <Container className="mt-4">

                {this.state.redirect &&

                    <Redirect to={{ pathname: this.state.path }} />
                }

                <Jumbotron className="mt-4">
                    <Card.Group>
                        {this.state.vagas ?

                            this.state.vagas.map(el => {

                                return (

                                    <>
                                        <Card>
                                            <Card.Content header='Vaga 1' />
                                            <Card.Content description={el.descricao} />
                                            <Card.Content extra>
                                                {el.candidatos.length > 1 ?

                                                    <a onClick={() => this.setState({ path: `/vagas/candidatos/${el.id}`, redirect: true })}>
                                                        <Icon name='user' /> {`${el.candidatos.length - 1} Candidatos`}
                                                    </a>

                                                    :

                                                    <a>
                                                        <Icon name='user' /> {`${el.candidatos.length - 1} Candidatos`}
                                                    </a>

                                                }

                                            </Card.Content>
                                        </Card>

                                    </>

                                )

                            })


                            :

                            <Alert severity="info">Nenhuma vaga cadastrada</Alert>

                        }

                    </Card.Group>
                </Jumbotron>
            </Container>



        );
    }
}