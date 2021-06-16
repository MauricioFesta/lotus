import api from "../../others/api_default"


export const postCadastroVaga = async (data, config) => {

    let result = await api.post("/api/vagas-cadastro", data, config)
    return result
}

export const listVagas = async () => {

    let result = await api.get("/api/vagas-lista")
    return result


}