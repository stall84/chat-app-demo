import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

const app = express();
app.use(express.static(__dirname + '/public'));
const httpServer = createServer(app);

export const serverIo = new Server(httpServer);

serverIo.on("connection", (socket: Socket) => {
    console.log('User Connected ...');
    console.log('w/ socketID: ', socket.id)

    socket.on("disconnect", () => {
        console.log('User Disconnected ...')
    });

    socket.on("message", (message: any) => {
        console.log('Message Received: ', message);
        serverIo.emit("message: ", message);
    })
});

httpServer.listen(3009, () => {
    console.log(' Server running on port 3009...')
});