const express = require('express');
const http = require('http');

const app = express(); //defines application
const clientPath = `${__dirname}/../client`; //gives path to client

app.use(express.static(clientPath)); //use express to host the client
const server = http.createServer(app); //use http to serve the app that express provides

//get server live
server.listen(8080, () => {
    console.log("server running on " + 8080);
});

const io = require('socket.io')(server); //io variable is now the entry point of all sockets connected to the server

//verify connection

let counter = 0;

io.on('connection', (socket) => {
    counter++;
    console.log(counter + ' someone connected');

    //react to received 'sendToAll' call from client by creating
    //an observer that waits until the message "sendToAll" gets passed to the server
    socket.on('sendToAll', (message) =>{
        io.emit("displayMessage", (message));
    });
});