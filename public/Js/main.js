// DOM elements //
const form = document.getElementById('form');
const textArea = document.getElementById('text');
const button = document.getElementById('button');
const dataContainer = document.getElementById('data-container');

// Socket Connection (client) //
const socket = io();

// Prompt That Takes User Name //
const Name = prompt(`Enter Your Name:: `);

// Append Data Function //
function appendData(data) {
    const messageElement = document.createElement('h2');
    messageElement.innerText = data ;
    dataContainer.appendChild(messageElement);
}

// Listining Submit event on button Click //
form.addEventListener('submit' , (e) => {
    e.preventDefault(); // preventing page to submit //
    
    // append message on data container //
    const message = textArea.value ;
    appendData(`You:: ${message}`);
    socket.emit('send' , message); // send message to Server //
    textArea.value = "" ;
});

// Socket Event For User Name //
socket.emit('new-user-joined' , Name);
// socket User Joined Event For Sending Name To Data Container //
socket.on('user-joined' , (Name) => {
    appendData(`${Name} Joined.`);
});

socket.on('receive' , (data) => {
    appendData(`${data.message}: ${data.name}`);
});

// Sending Data To Server //
socket.emit('online' , "User Online");