// DOM elements //
const form = document.getElementById('form');
const textArea = document.getElementById('text');
const button = document.getElementById('button');
const dataContainer = document.getElementById('data-container');

// Socket Connection (client) //
const socket = io();

// Audio Variable //
const audio = new Audio('../MP3/ding.mp3');

// Prompt That Takes User Name //
const Name = prompt(`Enter Your Name:: `);

// Append Data Function //
function appendData(data) {
    const messageElement = document.createElement('sn');
    messageElement.classList.add('content');
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
    audio.play();
});

// Socket Event For User Name //
socket.emit('new-user-joined' , Name);
// socket User Joined Event For Sending Name To Data Container //
socket.on('user-joined' , (Name) => {
    appendData(`${Name} Joined.`);
});

// Socket Event To Receive Send Data To All Clients //
socket.on('receive' , (data) => {
    appendData(`${data.name}: ${data.message}`);
});

// Socket Fires Disconnect Event If Users Leaves //
socket.on('leave' , (name) => {
    appendData(`${name} Left The Room. `);
});

// Sending Data To Server //
socket.emit('online' , "User Online");