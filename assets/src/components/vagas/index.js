import React from 'react';
import { Button, Card, CardDeck } from 'react-bootstrap';
import Navbar from "../navbar/index"


import 'bootstrap/dist/css/bootstrap.min.css';
import "@blueprintjs/core/lib/css/blueprint.css"
import "@blueprintjs/icons/lib/css/blueprint-icons.css"

export default class Vagas extends React.Component {

    render() {

        return (

            <div>

                <Navbar />

                <div className="container mt-4">

                    <CardDeck>
                        <Card>
                            <Card.Img variant="top" src="/logo192.png" />
                            <Card.Body>
                                <Card.Title>Card title</Card.Title>
                                <Card.Text>
                                Lorem Ipsum .
                                </Card.Text>
                            <Button variant="primary" size="sm">
                                        Candidatar-se
                            </Button>
                            </Card.Body>
                            
                            <Card.Footer>
                                <small className="text-muted">Last updated 3 mins ago</small>
                            </Card.Footer>
                        </Card>
                        <Card>
                            <Card.Img variant="top" src="/logo192.png" />
                            <Card.Body>
                                <Card.Title>Card title</Card.Title>
                                <Card.Text>
                                Lorem Ipsum .
                                </Card.Text>
                                <Button variant="primary" size="sm">
                                        Candidatar-se
                                </Button>
                            </Card.Body>
                            
                            <Card.Footer>
                                <small className="text-muted">Last updated 3 mins ago</small>
                            </Card.Footer>
                        </Card>
                        <Card>
                            <Card.Img variant="top" src="/logo192.png" />
                            <Card.Body>
                                <Card.Title>Card title</Card.Title>
                                <Card.Text>
                                    Lorem Ipsum .
                                
                                </Card.Text>
                                <Button variant="primary" size="sm">
                                        Candidatar-se
                                </Button>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">Last updated 3 mins ago</small>
                            </Card.Footer>
                        </Card>

                        <Card>
                            <Card.Img variant="top" src="/logo192.png" />
                            <Card.Body>
                                <Card.Title>Card title</Card.Title>
                                <Card.Text>
                                Lorem Ipsum .
                                </Card.Text>
                                <Button variant="primary" size="sm">
                                        Candidatar-se
                                </Button>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">Last updated 3 mins ago</small>
                            </Card.Footer>
                        </Card>
                        <Card>
                            <Card.Img variant="top" src="/logo192.png" />
                            <Card.Body>
                                <Card.Title>Card title</Card.Title>
                                <Card.Text>
                                Lorem Ipsum .
                                </Card.Text>
                                <Button variant="primary" size="sm">
                                        Candidatar-se
                                </Button>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">Last updated 3 mins ago</small>
                            </Card.Footer>
                        </Card>
                    </CardDeck>
                    
                </div>

            </div >

        );
    }
}