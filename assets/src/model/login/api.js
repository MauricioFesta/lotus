import axios from "axios";

export const getUser = async (data) => {

  let result = await axios.post("login-login_valida", data)

  return result
}

export const postCadastroUser = async (data) => {
    let result = await axios.post("login-cadastro", data)
    return result
}