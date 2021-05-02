import axios from 'axios';
var api = axios.create({
    headers: { 'X-NZ-Token': window['API_TOKEN'] }
});
export default api;
