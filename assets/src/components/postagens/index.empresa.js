import React from 'react';
import { Button, Card, Modal } from 'react-bootstrap';
import { getPostagensEmpresaAll } from "../../stores/postagens/api"
import { postagemOne } from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { observer } from "mobx-react";
import history from "../../others/redirect";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { Spinner } from "@blueprintjs/core";

import 'bootstrap/dist/css/bootstrap.min.css';
import "@blueprintjs/core/lib/css/blueprint.css"
import "@blueprintjs/icons/lib/css/blueprint-icons.css"

require("./css/index.scss")

class PostagensEmpresa extends React.Component {

    constructor(props) {
        super(props)
        this.state = { data: [],open_spinner: false }
        
    }

    async componentDidMount() {

        this.setState({open_spinner: true})

        let res = await getPostagensEmpresaAll()

        if (Array.isArray(res.data)) {

            this.setState({ data: res.data })
        } else {
            this.setState({ data: [] })
        }

        this.setState({open_spinner: false})


    }

    handleEditPostagem(id) {

        let postagem

        for (let i = 0; i < this.state.data.length; i++) {

            if (this.state.data[i].id == id) {
                postagem = this.state.data[i]
            }

        }

        this.props.postagemOne({ ...postagem })
        history.push("/postagens/editar");
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
                                    <IconButton className="edit-vaga" onClick={() => this.handleEditPostagem(el.id)} color="primary" aria-label="upload picture" component="span">
                                        <EditIcon />
                                    </IconButton>
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

const mapStateToProps = store => ({

    postagem_one: store.postagemState.postagem_one,

});
const mapDispatchToProps = dispatch =>
    bindActionCreators({ postagemOne }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(observer(PostagensEmpresa));