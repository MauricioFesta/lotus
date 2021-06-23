import React from 'react';
import NavbarEmpresa from "../navbar/index.empresa"
import { Jumbotron, Container } from 'react-bootstrap';
import { Card, Icon } from 'semantic-ui-react'


export default class VagasEmpresa extends React.Component {


    render() {

        const description = [
            'Amy is a violinist with 2 years experience in the wedding industry.',
            'She enjoys the outdoors and currently resides in upstate New York.',
        ].join(' ')


        return (


            <Container className="mt-4">

                <Jumbotron className="mt-4">
                    <Card.Group>
                        <Card>
                            <Card.Content header='Vaga 1' />
                            <Card.Content description={description} />
                            <Card.Content extra>
                                <a href="/vagas/candidatos">
                                <Icon name='user' />4 Candidatos
                                </a>
                            </Card.Content>
                        </Card>
                        <Card>
                            <Card.Content header='Vaga 2' />
                            <Card.Content description={description} />
                            <Card.Content extra>
                                <a href="/vagas/candidatos">
                                <Icon name='user' />4 Candidatos
                                </a>
                            </Card.Content>
                        </Card>
                    </Card.Group>
                </Jumbotron>
            </Container>



        );
    }
}