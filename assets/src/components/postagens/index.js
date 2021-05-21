import React from 'react';
import { Button, Card } from 'react-bootstrap';
import Navbar from "../navbar/index"


import 'bootstrap/dist/css/bootstrap.min.css';
import "@blueprintjs/core/lib/css/blueprint.css"
import "@blueprintjs/icons/lib/css/blueprint-icons.css"

export default class Postagens extends React.Component {


    render() {


        return (

            <div>

                <Navbar />

                <div className="container mt-4">

                    <Card className="text-center">
                        <Card.Header>Featured</Card.Header>
                        <Card.Body>
                            <Card.Title>Special title treatment</Card.Title>
                            <Card.Text>
                            Mussum Ipsum, cacilds vidis litro abertis. Quem manda na minha terra sou euzis! Per aumento de cachacis, eu reclamis. Suco de cevadiss deixa as pessoas mais interessantis. Aenean aliquam molestie leo, vitae iaculis nisl.
                            </Card.Text>
                           
                        </Card.Body>
                        <Card.Footer className="text-muted">2 days ago</Card.Footer>
                    </Card>
                </div>

            </div >

        );
    }
}