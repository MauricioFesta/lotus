
import Cookies from 'universal-cookie';
var jwt = require('jsonwebtoken');
const cookies = new Cookies();
const secret = 'nSU&RSwGk3Yq@hM2g%LeU@1lFvSc1fnyG$l1Keqf8&W&xZKl&H';
export const isAuthenticated = () => {

    try {

        let ck_token = cookies.get('lotus_auth_true');

        var decoded = jwt.verify(ck_token, secret);

        console.log(decoded.logged) // bar



        return decoded.logged

    } catch (err) {
        console.log(err)
        return false

    }


}
