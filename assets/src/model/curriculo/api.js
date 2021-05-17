import axios from 'axios';

export const postCurriculo = async (json) => {

    return await axios.post("/curriculo/cadastro", json.formData, json.config);
    
}

export const getCurriculo = async () => {

    return await axios.get("/curriculo/consulta");
    
}

export const getDownload = async (id) => {

    return await axios.get(`/curriculo/download/${id}`)
}

export const postExcluir = async (id) => {

    return await axios.delete(`/curriculo/excluir/${id}`)

}
