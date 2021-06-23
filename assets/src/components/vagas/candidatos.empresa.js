import React from 'react';
import NavbarEmpresa from "../navbar/index.empresa"
import { Button, Card, Image } from 'semantic-ui-react'
import { Figure, Jumbotron, Container, Row, Form } from 'react-bootstrap';


export default class CandidatosEmpresa extends React.Component {


    render() {


        return (


            <Container className="mt-4">

                <Jumbotron className="mt-4">


                    <Card.Group>
                        <Card>
                            <Card.Content>
                                <Image
                                    floated='right'
                                    size='mini'
                                    src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                                />
                                <Card.Header>Steve Sanders</Card.Header>
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
                       
                    </Card.Group>

                </Jumbotron>
            </Container>



        );
    }
}