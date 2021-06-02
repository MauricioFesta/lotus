import axios from "axios";


export const postCadastroVaga = async (data, config) => {

    let result = await axios.post("/vagas/cadastro", data, config)
    return result
}