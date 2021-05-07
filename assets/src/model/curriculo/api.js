import axios from 'axios';

export default class Api {

    async getCurriculo(id) {

        let result = await axios.get(`/curriculos-list/${id}`);

        return result;
    }

}