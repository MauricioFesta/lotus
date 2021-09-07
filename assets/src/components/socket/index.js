import { Socket } from 'phoenix';

//Em producao
let socket = new Socket("/socket", {params: {}});

//Local
//let socket = new Socket("ws://127.0.0.1:4000/socket", {params: {}});

socket.connect();

export default socket;