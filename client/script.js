let socket = io.connect(); //defines socket

let message = document.getElementById('message');
const btnAll = document.getElementById('sendToAll');
const btnMe = document.getElementById('sendToMe');
const target = document.getElementById('target');

//send message to server
btnAll.addEventListener('click', () => {
    //console.log(message.value);
    socket.emit('sendToAll', (message.value))
    });
//send message to yourself (through server)
btnMe.addEventListener('click', () => {
    //console.log(message.value);
    socket.emit('sendToMe', (message.value))
});

//client receives message back from the server
socket.on('displayMessage', (message) => {
    target.innerHTML += '<br>'+message;
});