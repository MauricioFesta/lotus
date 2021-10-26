import React from 'react';
import { Form, Button, Jumbotron } from 'react-bootstrap';
import { postCreatePostagem } from "../../stores/postagens/api"
import $, { param } from "jquery";
import { AppToaster } from "../../others/toaster"
import 'bootstrap/dist/css/bootstrap.min.css';
import "@blueprintjs/core/lib/css/blueprint.css"
import "@blueprintjs/icons/lib/css/blueprint-icons.css"
import { v4 as uuidv4 } from 'uuid';
import { Store } from "../../store";
import { observable } from 'mobx';
import { observer } from "mobx-react";
import history from "../../others/redirect";


class PostEditEmpresa extends React.Component {

    constructor(props) {
        super(props);
        this.state = { image: "/images/alert-sucsses.gif" };

        this.obs = observable({

            postagem: Store.getState().postagemState.postagem_one,
            descricao: Store.getState().postagemState.postagem_one.descricao

        })

        if(!this.obs.postagem.id){
            history.push("/postagens/view")
        }

    }


    getMin() {

        let date = new Date();

        return date.getMinutes()

    }


    alterar = async () => {

        let params = {

            ...this.obs.postagem, descricao: this.obs.descricao

        }

        let res = await postCreatePostagem(params);

        if (res.data.Ok) {

            AppToaster.show({ message: "Postagem alterada com sucesso!", intent: "success" });


        } else {
            AppToaster.show({ message: "Não foi possível, tente novamente mais tarde", intent: "danger" });

        }
    }


    render() {

        return (

            <div>

                <div className="container mt-4">

                    <Jumbotron className="mt-4">


                        <Form>

                            <Form.Group>
                                <Form.Label>Descrição: (obrigatório)</Form.Label>
                                <Form.Control value={this.obs.descricao} onChange={(vl) => this.obs.descricao = vl.target.value} as="textarea" rows={3} />
                            </Form.Group>

                            <Button onClick={() => this.alterar()} variant="primary" type="button">
                                Alterar
                            </Button>
                        </Form>

                    </Jumbotron>

                </div>

            </div>


        );
    }
}

export default observer(PostEditEmpresa)