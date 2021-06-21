
import Cookies from 'universal-cookie';
import {secret} from "./secret"
var jwt = require('jsonwebtoken');
const cookies = new Cookies();
export const isAuthenticated = () => {

    try {

        let ck_token = cookies.get('_A-T-T_L');

        var decoded = jwt.verify(ck_token, secret());

        console.log(decoded.logged) // bar



        return decoded.logged

    } catch (err) {
        console.log(err)
        return false

    }


}
