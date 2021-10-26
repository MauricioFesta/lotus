import React from 'react';
import { Button, Card, Modal } from 'react-bootstrap';
import { getPostagensAll } from "../../stores/postagens/api"
import { Spinner } from "@blueprintjs/core";


import 'bootstrap/dist/css/bootstrap.min.css';
import "@blueprintjs/core/lib/css/blueprint.css"
import "@blueprintjs/icons/lib/css/blueprint-icons.css"

require("./css/index.scss")

export default class Postagens extends React.Component {

    constructor(props) {
        super(props)
        this.state = { data: [] , open_spinner: false}
        
    }

    async componentDidMount() {

        this.setState({open_spinner: true})

        let res = await getPostagensAll()

        if (Array.isArray(res.data)) {

            this.setState({ data: res.data })
        } else {
            this.setState({ data: [] })
        }

        this.setState({open_spinner: false})


    }


    render() {

        return (

            <div>
                <Modal show={this.state.open_spinner}>

                    <Modal.Body>

                        <Spinner size={80} value={null} />

                    </Modal.Body>

                </Modal>
                <div className="ml-4 mr-4 mt-4 scroll-card">

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