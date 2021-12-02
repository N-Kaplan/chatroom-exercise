let socket = io.connect(); //defines socket

const user = document.getElementById('username');
let message = document.getElementById('message');
const btnAll = document.getElementById('sendToAll');
const btnMe = document.getElementById('sendToMe');
const target = document.getElementById('target');

//username and message required to send a message
user.addEventListener('keyup', () => {
    message.addEventListener('keyup', () => {
        if (user.value && message.value) {
            btnAll.removeAttribute('disabled');
            btnMe.removeAttribute('disabled');
        } else {
            btnAll.setAttribute('disabled', null);
            btnMe.setAttribute('disabled', null);
        }
    })
})

//send message to server
btnAll.addEventListener('click', () => {
    //console.log(message.value);
    socket.emit('sendToAll', (user.value + ': ' + message.value))
    });
//send message to yourself (through server)
btnMe.addEventListener('click', () => {
    //console.log(message.value);
    socket.emit('sendToMe', ('you: ' + message.value))
});

//client receives message back from the server
socket.on('displayMessage', (message) => {
    target.innerHTML += '<br>'+message;
});