import express, { Application, Request, Response, NextFunction } from 'express';
import * as WebSocket from 'ws';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as http from 'http';

const app: Application = express();

app.use(cors({ origin: '*' }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws: WebSocket) => {
    ws.on('message', (message: string) => {
        console.log(`message recieved: ${message}`);

        const broadcastRegex = /^broadcast\:/;

        if (broadcastRegex.test(message)) {
            message = message.replace(broadcastRegex, '');
            wss.clients
                .forEach(client => {
                    if (client != ws) {
                        client.send(`broadcase message: ${message}`);
                    }
                });
        } else {
            ws.send(`message sent: ${message}`);
        }
    });
    ws.send('Hi there I am a WebSocket server');
});

server.listen(process.env.PORT || 8999, () => {
    console.log(`Server started on port 8999`);
});
