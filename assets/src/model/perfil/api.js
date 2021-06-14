import axios from "axios";

export const putPerfil = async (data) => {

  let result = await axios.put("api/perfil-alterar", data)

  return result
}
