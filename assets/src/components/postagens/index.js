import React from 'react';
import { Button, Card } from 'react-bootstrap';
import Navbar from "../navbar/index"
import { getPostagensAll } from "../../model/postagens/api"


import 'bootstrap/dist/css/bootstrap.min.css';
import "@blueprintjs/core/lib/css/blueprint.css"
import "@blueprintjs/icons/lib/css/blueprint-icons.css"

export default class Postagens extends React.Component {

    constructor(props) {
        super(props)
        this.state = { data: [] }
    }

    async componentDidMount() {

        let res = await getPostagensAll()

        this.setState({ data: res.data })

    }


    render() {

        return (

            <div>

                <Navbar />

                <div className="container mt-4">

                    {this.state.data.map((el, index) => {
                        return (

                            <>
                            <Card className="text-center">
                                <Card.Header>Featured</Card.Header>
                                <Card.Body>
                                    <Card.Title>Special title treatment</Card.Title>
                                    <Card.Text>
                                        {el.descricao}
                                </Card.Text>

                                </Card.Body>
                                <Card.Footer className="text-muted">2 days ago</Card.Footer>
                            </Card>
                            <br></br>
                            </>
                        );

                    })

                    }


                </div>

            </div >

        );
    }
}