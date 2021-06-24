import React from 'react';
import NavbarEmpresa from "../navbar/index.empresa"
import { Button, Card, Image } from 'semantic-ui-react'
import { Figure, Jumbotron, Container, Row, Form } from 'react-bootstrap';
import { listVagasEmpresaId } from "../../stores/vagas/api"


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
                                                    src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                                                />
                                                <Card.Header>{el.nome}</Card.Header>
                                                <Card.Meta>Friends of Elliot</Card.Meta>
                                                <Card.Description>
                                                    Steve wants to add you to the group <strong>best friends</strong>
                                                </Card.Description>
                                            </Card.Content>
                                            <Card.Content extra>
                                                <div className='ui two buttons'>
                                                    <Button basic color='green'>
                                                        Approve
                                                    </Button>
                                                    <Button basic color='red'>
                                                        Decline
                                                </Button>
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