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
    const timestamp = new Date().toLocaleString();
    socket.emit('sendToAll', user, message.value, timestamp)
    });
//send message to yourself (through server)
btnMe.addEventListener('click', () => {
    //console.log(message.value);
    const timestamp = new Date().toLocaleString();
    socket.emit('sendToMe', user, message.value, timestamp)
});

//client receives message back from the server
socket.on('displayMessage', (data) => {
    target.innerHTML += '<br>';
    target.innerText += (data.user === user) ? 'At ' + data.timestamp + ' you sent: ' + data.message : 'At ' + data.timestamp + ' ' +data.user + ' sent: ' + data.message;
});

//get users from server
socket.on('users', (users) => {
    console.log(users)
    let currentUsers = users;
    const ul = document.getElementById('usersList');
    while (ul.lastChild) {
        ul.removeChild(ul.lastChild);
    }
    for (let i=0;  i< currentUsers.length; i++) {
        const li = document.createElement('li');
        li.innerText = users[i].username;
        ul.appendChild(li);
    }
});

// document.querySelector('ul').addEventListener('click', function(e) {
//     if (e.target.tagName.toLowerCase() === 'li') {
//         console.log(e.target);
//     }
// });
