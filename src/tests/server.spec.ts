
import { io } from 'socket.io-client';

import { serverIo } from '../server';
const connectionUrl = 'http://localhost:3009'
const socket = io(connectionUrl);

describe('Check basic send and receive of messages', () => {
    let client1: any, client2: any;

    // Check Jest example in socket.io testing-docs
    // Remember OP did not import his server.

    beforeEach((done: any) => {
        client1 = socket.connect();
        client2 = socket.connect();
        // done();
    })
    afterEach((done: any) => {
        client1.disconnect();
        client2.disconnect();
    })

    test('It should send and receive messages ', () => {
        client1.emit('message', 'Hello World!');
        client2.on('message', (msg: string) => {
            expect(msg).toBe('Hello World!');
        })
    })

    test('It should fail if message is not same ', () => {
        client1.emit('message', 'Nope World?');
        client2.on('message', (msg: string) => {
            expect(msg).toBe('Hello World!');
        })
        console.log('serverIo?: ', serverIo)
    })
})