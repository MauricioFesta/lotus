import React from 'react';
import NavbarEmpresa from "../navbar/index.empresa"
import { Modal } from 'react-bootstrap';
import { Icon } from 'semantic-ui-react'
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
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardFooter,
    Badge,
    Button
} from "shards-react";


class VagasFechadoEmpresa extends React.Component {

    constructor(props) {

        super(props);
        this.state = { vagas: [], redirect: false, path: "", open_spinner: false };

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

                    <Container fluid className="main-content-container px-4">

                        <Row>
                            {(this.state.vagas.length > 0) ?

                                this.state.vagas.map((el, idx) => {

                                    console.log(el.candidatos.length - 1,"Candidatos")

                                    return (

                                        <>

                                            <Col lg="3" md="6" sm="12" className="mb-4" key={idx}>

                                                <Card small className="card-post card-post--1">

                                                    <Alert severity="error">Vaga desativada!!</Alert>

                                                    <div

                                                        className={"card-post__image"}
                                                        style={{ backgroundImage: `url(${"data:image/png;base64," + el.imagem_base64})` }}


                                                    >
                                                        <Badge
                                                            pill
                                                            className={`card-post__category bg-${"post.categoryTheme"}`}
                                                        >
                                                            {/* {post.ramo} */}
                                                        </Badge>
                                                        <div className="card-post__author d-flex">

                                                        </div>
                                                    </div>
                                                    <CardBody>

                                                        <h5 className="card-title">
                                                            <a href="#" className="text-fiord-blue">
                                                                {el.titulo}
                                                            </a>
                                                        </h5>

                                                        <p className="card-text d-inline-block mb-3">
                                                            {el.descricao.slice(0, 110) + "..."}</p><br />


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

                                                    </CardBody>
                                                </Card>
                                            </Col>

                                        </>

                                    )

                                })


                                :

                                <Alert severity="info">
                                    <AlertTitle>Vagas fechadas</AlertTitle>
                                    Nenhuma vaga em fechada até o momento.
                                </Alert>

                            }

                        </Row>
                    </Container>

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