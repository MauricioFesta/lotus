import axios from "axios"
import Cookies from 'universal-cookie';
const cookies = new Cookies();

 var api = axios.create({
    headers: {'X-NZ-Token': cookies.get('lotus_auth')}
});
export default api;
 