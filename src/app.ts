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
        ws.send(`message sent: ${message}`);
    });
    ws.send('Hi there I am a WebSocket server');
});

console.log("just checking...")
