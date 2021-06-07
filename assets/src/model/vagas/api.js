import axios from "axios";


export const postCadastroVaga = async (data, config) => {

    let result = await axios.post("/vagas/cadastro", data, config)
    return result
}

export const listVagas = async () => {

    let result = await axios.get("/vagas/lista")
    return result


}