import React from 'react';
import { Form, Button, Alert, Col, Toast } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from "jquery";
import * as Mui from '@material-ui/core';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { green } from '@material-ui/core/colors';
import { v4 as uuidv4 } from 'uuid';
const InputMask = require('react-input-mask');

const theme = createTheme({
    palette: {
        secondary: green,
    },
});


export default class CadastroNotPDF extends React.Component {

    constructor(props) {
        super(props);

        this.cadastrar = props.cadastrar;
        this.curriculoForm = {}
        this.curriculoForm.cidade = "Bento Gonçalves"
        this.curriculoForm.ensinomedio = "Não"

    }

    handleGetFoto(){

        let formData = new FormData();

        let file = document.querySelector('#file_foto');
        
        formData.append("id", uuidv4());
        formData.append("cidade", this.curriculoForm.cidade);
        formData.append("nome", this.curriculoForm.nome);
        formData.append("telefone", this.curriculoForm.telefone ? this.curriculoForm.telefone.replace("(","").replace(")", "").replace("-", "") : "");
        formData.append("ensinomedio", this.curriculoForm.ensinomedio);
        formData.append("rua", this.curriculoForm.rua);
        formData.append("descricao", this.curriculoForm.descricao);
        formData.append("foto_curriculo", file.files.length > 0 ? file.files[0] : "");

        this.cadastrar(formData)

    }


    render() {

        return (

            <>
                <Form.Group>
                    <Form.Label>Nome Completo (obrigatório)</Form.Label>
                    <Form.Control onChange={(el) => this.curriculoForm.nome = el.target.value} id="titulo" type="titulo" placeholder="Nome" />
                    <Form.Text className="text-muted">
                        forneça seu nome para o cadastro
                    </Form.Text>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Telefone (obrigatório)</Form.Label>
                    <InputMask className="form-control" mask="(99)99999-9999" onChange={(el) => this.curriculoForm.telefone = el.target.value} />
                    <Form.Text className="text-muted">
                        forneça seu telefone para o cadastro
                    </Form.Text>
                </Form.Group>


                <Form.Group>
                    <Form.Label>Cidade: (obrigatório)</Form.Label>
                    <Form.Control id="ramo" as="select" onChange={(el) => this.curriculoForm.cidade = el.target.value} >
                        <option>Bento Gonçalves</option>
                        <option>Garibaldi</option>
                        <option>Carlos Barbosa</option>
                        <option>Monte Belo do Sul</option>
                        <option>Caxias do Sul</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Rua (obrigatório)</Form.Label>
                    <Form.Control id="titulo" type="titulo" onChange={(el) => this.curriculoForm.rua = el.target.value} placeholder="rua" />
                    <Form.Text className="text-muted">
                        forneça sua Rua para o cadastro
                    </Form.Text>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Descrição: (obrigatório)</Form.Label>
                    <Form.Control id="descricao" as="textarea" onChange={(el) => this.curriculoForm.descricao = el.target.value} rows={3} />
                    <Form.Text className="text-muted">
                        uma pequena descrição máximo 100 caracteres
                    </Form.Text>
                </Form.Group>

                <Form.Row>

                    <Form.Group>
                        <Form.Check
                            type="switch"
                            id="ensinomedio"
                            label="Ensimo médio completo ?"
                            onChange={() => this.curriculoForm.ensinomedio = $("#ensinomedio").prop("checked").toString() === true ? "Sim" : "Não"}
                        />
                    </Form.Group>

                    &nbsp;&nbsp;&nbsp;&nbsp;

                    <Form.Group>

                        <Form.File id="file_foto" style={{ display: "none" }} />

                        <ThemeProvider theme={theme}>
                            <Mui.Button
                                size="small"
                                variant="contained"
                                color="secondary"
                                endIcon={<CloudUploadIcon />}
                                onClick={() => { $('#file_foto').trigger('click') }}

                            >
                                Foto Currículo
                            </Mui.Button>
                        </ThemeProvider>


                    </Form.Group>

                </Form.Row>

                <Mui.Button className="mb-4" onClick={() => this.handleGetFoto()} variant="contained" color="primary">
                    Cadastrar
                </Mui.Button>

            </>

        );
    }
}