import React from 'react';
import NavbarEmpresa from "../navbar/index.empresa"
import { Jumbotron, Container, Button, Modal } from 'react-bootstrap';
import { Card, Icon } from 'semantic-ui-react'
import { listVagasEmpresaFechado } from "../../stores/vagas/api"
// import Alert from '@material-ui/lab/Alert';
import { Redirect } from "react-router-dom"
import { vagaView } from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { observer } from "mobx-react";
import history from "../../others/redirect";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Spinner } from "@blueprintjs/core";


class VagasFechadoEmpresa extends React.Component {

    constructor(props) {

        super(props);
        this.state = { vagas: false, redirect: false, path: "", open_spinner: false };

    }

    async componentDidMount() {

        this.setState({ open_spinner: true })

        let resp = await listVagasEmpresaFechado()

        if (Array.isArray(resp.data)) {

            this.setState({ vagas: resp.data })

        }

        this.setState({ open_spinner: false })

    }

    handleEditVaga(id) {

        let vaga

        for (let i = 0; i < this.state.vagas.length; i++) {

            if (this.state.vagas[i].id == id) {

                vaga = this.state.vagas[i]
                break;
            }
        }

        this.props.vagaView({ ...vaga })
        history.push("/vaga-edit");
    }

    render() {


        return (


            <>

                <Modal show={this.state.open_spinner}>

                    <Modal.Body>

                        <Spinner size={80} value={null} />

                    </Modal.Body>

                </Modal>


                <div className="mt-4 ml-4 mr-4">

                    {this.state.redirect &&

                        <Redirect to={{ pathname: this.state.path }} />
                    }

                    <Jumbotron className="mt-4">
                        <Card.Group>
                            {this.state.vagas ?

                                this.state.vagas.map(el => {

                                    return (

                                        <>
                                            <Card>



                                                <Card.Content header={el.titulo} />

                                                <Card.Content ><Alert severity="error">Vaga desativada!!</Alert> </Card.Content>

                                                <Card.Content description={el.descricao.slice(0, 180) + "..."} />

                                                <Card.Content extra>
                                                    {el.candidatos.length > 1 ?

                                                        <a onClick={() => this.setState({ path: `/vagas/candidatos/${el.id}`, redirect: true })}>
                                                            <Icon name='user' /> {`${el.candidatos.length - 1} Candidatos`}
                                                        </a>

                                                        :

                                                        <a>
                                                            <Icon name='user' /> {`${el.candidatos.length - 1} Candidatos`}
                                                        </a>


                                                    }

                                                    <IconButton className="edit-vaga" onClick={() => this.handleEditVaga(el.id)} color="primary" aria-label="upload picture" component="span">
                                                        <EditIcon />
                                                    </IconButton>

                                                </Card.Content>
                                            </Card>

                                        </>

                                    )

                                })


                                :


                                <Alert severity="info">
                                    <AlertTitle>Vagas desativadas</AlertTitle>
                                    Nenhuma vaga esta desativada até o momento.
                                </Alert>

                            }

                        </Card.Group>
                    </Jumbotron>
                </div>

            </>



        );
    }
}

const mapStateToProps = store => ({

    vaga_one: store.vagasState.vaga_one,

});
const mapDispatchToProps = dispatch =>
    bindActionCreators({ vagaView }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(observer(VagasFechadoEmpresa));