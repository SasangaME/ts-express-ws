import { WebSocket } from "ws";

console.log('client working');

const socket = new WebSocket('ws://localhost:8999/');

let count = 1;

socket.on('message', (message) => {
    console.log(message.toString());
    if (count <= 10) {
        socket.send("count: " + count);
        ++count;
    }
});