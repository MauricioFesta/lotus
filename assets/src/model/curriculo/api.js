import axios from 'axios';

export const postCurriculo = async (json) => {

    let result = await axios.post("/curriculo/cadastro", json.formData, json.config);
    return result

}
