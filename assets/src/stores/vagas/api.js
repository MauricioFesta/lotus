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

export const listVagasEmpresaId = async (id) => {

    let result = await api.get(`/api/vagas-lista-candidatos/${id}`)
    return result

}

export const downloadCurriculoCandidato = async (id) => {

    let result = await api.get(`/api/curriculo-download-candidato/${id}`)
    return result
}

export const candidatoAprovar = async (id, data) => {

    let result = await api.put(`/api/vagas-arovar-candidato/${id}`, data, config)
    return result
}

export const candidatoDesaprovar = async (id, data) => {

    let result = await api.put(`/api/vagas-desaprovar-candidato/${id}`, data, config)
    return result
}


export const listNotificacoes = async () => {
    let result = await api.get("/api/lista-notificacoes")
    return result
}

export const listVagasAprovadas = async () => {

    let result = await api.get("/api/lista-vagas-aprovadas")
    return result

}
