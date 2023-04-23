import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer);

io.on("connection", (socket: Socket) => {
    console.log('User Connected ...');
    console.log('w/ socketID: ', socket.id)

    socket.on("disconnect", () => {
        console.log('User Disconnected ...')
    });

    socket.on("message", (message: any) => {
        console.log('Message Received: ', message);
        io.emit("message: ", message);
    })
});

httpServer.listen(3009, () => {
    console.log(' Server running on port 3009...')
});