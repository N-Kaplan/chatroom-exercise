let socket = io.connect(); //defines socket

let message = document.getElementById('message');
const btnAll = document.getElementById('sendToAll');
const target = document.getElementById('target');

//send message to server
btnAll.addEventListener('click', () => {
    //console.log(message.value);
    socket.emit('sendToAll', (message.value))
    });


//client receives message back from the server
socket.on('displayMessage', (message) => {
    target.innerHTML += '<br>'+message;
});