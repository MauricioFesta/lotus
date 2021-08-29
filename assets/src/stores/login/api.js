import axios from "axios";

export const getUser = async (data) => {

  let result = await axios.post("/public/login-login_valida", data)

  return result
}

export const postCadastroUser = async (data) => {
    let result = await axios.post("/public/login-cadastro", data)
    return result
}