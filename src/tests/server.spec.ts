
import { io } from 'socket.io-client';

const connectionUrl = 'http://localhost:3009'
const socket = io(connectionUrl);

describe('Check basic send and receive of messages', () => {
    let client1: any, client2: any;

    beforeAll(() => {
        client1 = socket.connect();
        client2 = socket.connect();
    })
    afterAll(() => {
        client1.disconnect();
        client2.disconnect();
    })

    test('It should send and receive messages ', () => {
        client1.emit('message', 'Hello World!');
        client2.on('message', (msg: string) => {
            expect(msg).toBe('Hello World!');
        })
    })
})