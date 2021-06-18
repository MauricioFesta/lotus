import React from 'react';
import { Figure, Jumbotron, Container, Row, Form } from 'react-bootstrap';
import Navbar from "../navbar/index"
import { Button, Icon } from "@blueprintjs/core";
import { Store } from "../../store"
import 'bootstrap/dist/css/bootstrap.min.css';
import "@blueprintjs/core/lib/css/blueprint.css"
import "@blueprintjs/icons/lib/css/blueprint-icons.css"
import PerfilFoto from './index.foto';
import { putPerfil, getPerfil } from "../../stores/perfil/api"
import { perfilMODEL } from "../../model/perfil"
import { perfilForm, perfilQuery } from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AppToaster } from "../../others/toaster"

class Perfil extends React.Component {


    constructor(props) {
        super(props)
        this.state = { perfilMODEL, retornoBanco: {}, email: '', nome: '', senha: ''}

    }

    async componentDidMount() {
        let res = await getPerfil()

        Object.assign(perfilMODEL, res.data[0])

        this.setState({ perfilMODEL: perfilMODEL })

     

        this.props.perfilQuery({foto_base64: this.state.perfilMODEL.foto_base64})

       console.log(Store.getState().perfilState.query.foto_base64) 

    
    }

    getMin() {

        let date = new Date();

        return date.getMinutes()

    }

    closeToasts() {
        this.setState({ close_msg: false });
    }

    alterarPerfil = async () => {

        let store = Store.getState()
        let formData = new FormData();
      
        if (store.perfilState.form.length > 0) {

            formData.append("file", store.perfilState.form[0]);
        }

        formData.append("nome", this.state.nome || this.state.perfilMODEL.nome);
        formData.append("senha", this.state.senha || this.state.perfilMODEL.senha);
        formData.append("email", this.state.email || this.state.perfilMODEL.email)

        let res = await putPerfil(formData)



        if (res.data.Ok) {
            store.perfilState.form.length ? window.location.reload() :
            AppToaster.show({message: "Perfil alterado com sucesso!", intent: "success" });
        } else {
            AppToaster.show({message: "Não foi possível alterar o perfil", intent: "error" });
        }

    }

    render() {


        return (

            <div>

                <Container className="mt-4">

                    <Jumbotron className="mt-4" >

                        <Row>

                            <Form>

                                <PerfilFoto />

                                <Button small="true" intent="success" onClick={this.alterarPerfil} text="Salvar alterações" />
                            </Form>

                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Form>

                                <Form.Group controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control defaultValue={this.state.perfilMODEL.email} onChange={(e) => this.setState({ email: e.target.value })} type="email" placeholder="email" />
                                    <Form.Text className="text-muted">
                                        Preencha seu email de acesso
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group controlId="formNome">
                                    <Form.Label>Nome</Form.Label>
                                    <Form.Control defaultValue={this.state.perfilMODEL.nome} onChange={(e) => this.setState({ nome: e.target.value })} type="text" placeholder="nome" />
                                    <Form.Text className="text-muted">
                                        Preencha seu nome de acesso
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group controlId="formSenha">
                                    <Form.Label>Senha</Form.Label>
                                    <Form.Control defaultValue={this.state.perfilMODEL.senha} onChange={(e) => this.setState({ senha: e.target.value })} type="text" placeholder="senha" />
                                    <Form.Text className="text-muted">
                                        Preencha a senha de acesso
                                    </Form.Text>
                                </Form.Group>




                            </Form>

                        </Row>

                    </Jumbotron>

                </Container>

            </div >

        );
    }
}


const mapStateToProps = store => ({
    query: store.perfilState.query,
    form: store.perfilState.form
});
const mapDispatchToProps = dispatch =>
    bindActionCreators({ perfilForm, perfilQuery }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Perfil);