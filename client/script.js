let socket = io.connect(); //defines socket

const user = prompt('Choose your username');
let message = document.getElementById('message');
const btnAll = document.getElementById('sendToAll');
const btnMe = document.getElementById('sendToMe');
const target = document.getElementById('target');

message.addEventListener('keyup', () => {
    if (message.value) {
        btnAll.removeAttribute('disabled');
        btnMe.removeAttribute('disabled');
    } else {
        btnAll.setAttribute('disabled', null);
        btnMe.setAttribute('disabled', null);
    }
})

//send username to server
window.addEventListener('load', () => {
    socket.emit('user', user);
})

//send message to server
btnAll.addEventListener('click', () => {
    // console.log(user);
    // console.log(message.value);
    socket.emit('sendToAll', user, message.value)
    });
//send message to yourself (through server)
btnMe.addEventListener('click', () => {
    //console.log(message.value);
    socket.emit('sendToMe', user, message.value)
});

//client receives message back from the server
socket.on('displayMessage', (data) => {
    target.innerHTML += '<br>';
    target.innerText += (data.user === user) ? 'you sent: ' + data.message : data.user + ' sent: ' + data.message;
});

//get users from server
socket.on('users', (users) => {
    console.log(users)
});
