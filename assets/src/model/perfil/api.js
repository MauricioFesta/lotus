import axios from "axios";

export const postPerfil = async (data) => {

  let result = await axios.post("perfil/alterar", data)

  return result
}
