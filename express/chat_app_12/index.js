// we use Socket.io library for implementing websoket ... by this we can create chat application

const http = require('http')
const express = require('express');
const path = require('path');
const { Server } = require('socket.io');
const { Socket } = require('dgram');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

//Socket.io handle
io.on('connection', (socket) => {
    socket.on('message', message => {
        io.emit('message', message);
    });
});

app.use(express.static(path.resolve('./public')));

app.get('/', (req, res) => {
    return res.sendFile("/public/index.html");
});

server.listen(3000, () =>{
    console.log("started at 3000");
});