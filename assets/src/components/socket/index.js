import { Socket } from 'phoenix';

let socket = new Socket("ws://localhost:4000/socket", {params: {}});
socket.connect();

export default socket;