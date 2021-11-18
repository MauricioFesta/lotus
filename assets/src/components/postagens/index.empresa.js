import React from 'react';
import { Button, Card, Modal } from 'react-bootstrap';
import { getPostagensEmpresaAll } from "../../stores/postagens/api"
import { postagemOne } from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { observer } from "mobx-react";
import { observable } from 'mobx';
import history from "../../others/redirect";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { Spinner } from "@blueprintjs/core";
import moment from 'moment';



import 'bootstrap/dist/css/bootstrap.min.css';
import "@blueprintjs/core/lib/css/blueprint.css"
import "@blueprintjs/icons/lib/css/blueprint-icons.css"

require("./css/index.scss")

class PostagensEmpresa extends React.Component {

    constructor(props) {
        super(props)
        this.state = { data: [], open_spinner: false }

        this.obs = observable({
          
            dateNow: Date,
            

        })

    }

    async componentDidMount() {

        this.obs.dateNow = moment(new Date());

        this.setState({ open_spinner: true })

        let res = await getPostagensEmpresaAll()

        if (Array.isArray(res.data)) {

            this.setState({ data: res.data })
        } else {
            this.setState({ data: [] })
        }

        this.setState({ open_spinner: false })


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

                        let date = moment(new Date(el.inserted_at * 1000)).add(3, 'hours').format()

                        var end = moment(date);
                        var duration = moment.duration(this.obs.dateNow.diff(end));
                        var days = duration.asDays();

                        return (

                            <>
                                <Card className="text-center posatgens">
                                    <IconButton className="edit-vaga" onClick={() => this.handleEditPostagem(el.id)} color="primary" aria-label="upload picture" component="span">
                                        <EditIcon />
                                    </IconButton>
                                    {/* <Card.Header>Featured</Card.Header> */}
                                    <Card.Body>
                                        <Card.Title>{el.empresa_razao}</Card.Title>
                                        <Card.Text>
                                            {el.descricao}
                                        </Card.Text>

                                    </Card.Body>
                                    <Card.Footer className="text-muted">{Math.floor(days) === 0 ? Math.floor(duration.asMinutes()) < 60 ? Math.floor(duration.asMinutes()) + " min ago" : Math.floor(duration.asHours()) + " hours ago" : Math.floor(days) + " day ago"}</Card.Footer>
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