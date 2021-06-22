import React from 'react';
import NavbarEmpresa from "../navbar/index.empresa"
import { Form, Button} from 'react-bootstrap';
import {postCreatePostagem} from "../../stores/postagens/api"
import $, { param } from "jquery";
import { AppToaster } from "../../others/toaster"
import 'bootstrap/dist/css/bootstrap.min.css';
import "@blueprintjs/core/lib/css/blueprint.css"
import "@blueprintjs/icons/lib/css/blueprint-icons.css"
import { v4 as uuidv4 } from 'uuid';
export default class PostCreateEmpresa extends React.Component {

    constructor(props) {
        super(props);
        this.state = {image: "/images/alert-sucsses.gif"};

    }

  
    getMin() {

        let date = new Date();

        return date.getMinutes()

    }


    cadastrar = async () => {

        let descricao = $("#descricao").val()

        let params = {
            id:uuidv4(),
            descricao

        }
  
        let res = await postCreatePostagem(params);

        if (res.data.Ok) {

            AppToaster.show({message: "Postagem cadastrada com sucesso!", intent: "success" });


        } else {
            AppToaster.show({message: "Não foi possível, tente novamente mais tarde", intent: "danger" });

        }
    }


    render() {

        return (

            <div>

                <div className="container mt-4">

                   
                    <Form>
                    
                        <Form.Group>
                            <Form.Label>Descrição: (obrigatório)</Form.Label>
                            <Form.Control id="descricao" as="textarea" rows={3} />
                        </Form.Group>

                        <Button onClick={this.cadastrar} variant="primary" type="button">
                            Cadastrar
                        </Button>
                    </Form>

                </div>

            </div>


        );
    }
}