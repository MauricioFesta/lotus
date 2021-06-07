import axios from "axios";

export const postCreatePostagem = (data) => {

    let result = axios.post("/postagens/cadastro", data)

    return result

}