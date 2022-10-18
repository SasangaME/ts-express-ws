import express, { Application, Request, Response, NextFunction } from 'express';
import * as WebSocket from 'ws';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as http from 'http';
import { json } from 'stream/consumers';

const app: Application = express();

app.use(cors({ origin: '*' }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

let clients: number = 0;

wss.on('connection', (ws: WebSocket) => {
    ++clients;
    console.log('one more client connected. connections: ' + clients);
    ws.on('message', (message: string) => {
        console.log(`message recieved: ${message}`);

        //    const broadcastRegex = /^broadcast\:/;

        //     if (broadcastRegex.test(message)) {
        //         message = message.replace(broadcastRegex, '');
        //         wss.clients
        //             .forEach(client => {
        //                 if (client != ws) {
        //                     const obj = { message: message, author: "Sasanga", greet: "i can do this" };
        //                     const str = JSON.stringify(obj);
        //                     client.send(`broadcase message: ${str}`);
        //                 }
        //             });
        //     } else {
        //         const obj = { message: message.toString(), author: "Sasanga", greet: "i can do this" };
        //         const str = JSON.stringify(obj);
        //         ws.se nd(`message sent: ${str}`);
        //     }
        wss.clients.forEach((client) => {
            client.send("sent from server: " + message);
        }
        );
    });
    ws.on('close', () => {
        --clients;
        console.log('client disconnected. clients: ' + clients);
    });
    ws.send('Hi there I am a WebSocket server');
});

server.listen(process.env.PORT || 8999, () => {
    console.log(`Server started on port 8999`);
});
