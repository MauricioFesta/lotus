import api from "../../others/api_default"

const config = {}

export const postCadastroVaga = async (data, config) => {

    let result = await api.post("/api/vagas-cadastro", data, config)
    return result
}

export const listVagas = async () => {

    let result = await api.get("/api/vagas-lista")
    return result


}

export const postCandidatarseVaga = async (data) => {
    let result = await api.post("/api/vagas-candidatar-se", data, config)
    return result
}

export const deleteCandidatarseVaga = async (id_vaga) => {
    let result = await api.delete(`/api/vagas-delete-candidatura/${id_vaga}`)
    return result
}

export const listVagasEmpresa = async () => {

    let result = await api.get("/api/vagas-lista-empresa")
    return result
}

export const listVagasEmpresaId = async (id) =>{

    let result = await api.get(`/api/vagas-lista-candidatos/${id}`)
    return result

}