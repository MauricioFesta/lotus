import axios from "axios";

export const putPerfil = async (data) => {

  let result = await axios.put("perfil/alterar", data)

  return result
}
