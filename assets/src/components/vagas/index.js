import React from 'react';
import { Button, Card, CardDeck } from 'react-bootstrap';
import Navbar from "../navbar/index"
import { listVagas } from "../../stores/vagas/api"
import { AppToaster } from "../../others/toaster"
import 'bootstrap/dist/css/bootstrap.min.css';
import "@blueprintjs/core/lib/css/blueprint.css"
import "@blueprintjs/icons/lib/css/blueprint-icons.css"

require("./css/index.css")

export default class Vagas extends React.Component {

    constructor(props) {

        super(props);
        this.state = { vagas: [], qtdline: 0, variant: "primary", text: "null" };


    }

    async componentDidMount() {

        let tmp = 0, array = [], array2 = [];

        let res = await listVagas()

        if(Array.isArray(res.data)){

            res.data.map(el => {

                if (tmp === 5) {
    
                    array2.push(array)
                    array = []
                    tmp = 0
    
                }
                array.push(el) 
                tmp++
            })
    
        
            array2.push(array)
    
            this.setState({ vagas: array2 })
            
        }
        

        

    }

    cadastroVaga(){
        AppToaster.show({message: "Candidatura enviada com sucesso", intent: "success" });
    }

    render() {

        return (

            <div>

                <Navbar />

                <div  className="container mt-4 card">

                    {this.state.vagas.map((el, index) => {

                        return (
                            <>
                                <CardDeck className="mt-4" key={index}>

                                    {el.map((el2, index) => {

                                        return (

                                            <Card key={index}>
                                                <Card.Img variant="top" src={"data:image/png;base64," + el2.imagem_base64} />
                                                <Card.Body>
                                                    <Card.Title>{el2.cidade}</Card.Title>
                                                    <Card.Text>
                                                        {el2.descricao}
                                                    </Card.Text>
                                                    <Button onClick={this.cadastroVaga} variant="primary" size="sm">
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