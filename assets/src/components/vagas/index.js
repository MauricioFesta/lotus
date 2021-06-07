import React from 'react';
import { Button, Card, CardDeck } from 'react-bootstrap';
import Navbar from "../navbar/index"
import { listVagas } from "../../model/vagas/api"


import 'bootstrap/dist/css/bootstrap.min.css';
import "@blueprintjs/core/lib/css/blueprint.css"
import "@blueprintjs/icons/lib/css/blueprint-icons.css"

export default class Vagas extends React.Component {

    constructor(props) {

        super(props);
        this.state = { vagas: [], qtdline: 0, variant: "primary", text: "null" };


    }

    async componentDidMount() {

        let tmp = 0, array = [], array2 = [];

        let res = await listVagas()

        res.data.map(el => {

            if (tmp === 5) {

                array2.push(array)
                array = []
                tmp = 0

            }
            array.push(el) 
            tmp++
        })

        if(tmp != 5){
            array2.push(array)
        }

        this.setState({ vagas: array2 })

    }

    render() {

        return (

            <div>

                <Navbar />

                <div className="container mt-4">

                    {this.state.vagas.map((el, index) => {

                        return (
                            <>
                                <CardDeck key={index}>

                                    {el.map((el2, index) => {

                                        return (

                                            <Card key={index}>
                                                <Card.Img variant="top" src="/logo192.png" />
                                                <Card.Body>
                                                    <Card.Title>{el2.cidade}</Card.Title>
                                                    <Card.Text>
                                                        {el2.descricao}
                                                    </Card.Text>
                                                    <Button variant="primary" size="sm">
                                                        Candidatar-se
                                                </Button>
                                                </Card.Body>

                                                <Card.Footer>
                                                    <small className="text-muted">Last updated 3 mins ago</small>
                                                </Card.Footer>
                                            </Card>


                                        )
                                    })

                                    }

                                </CardDeck>
                                <br></br>

                            </>
                        )

                    })


                    }
                </div>

            </div >

        );
    }
}