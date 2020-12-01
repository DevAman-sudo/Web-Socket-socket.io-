// DOM elements //
const textArea = document.getElementById('text');
const button = document.getElementById('button');
const dataContainer = document.getElementById('data-container');

// Socket Connection (client) //
const socket = io();

// Prompt That Takes User Name //
const Name = prompt(`Enter Your Name:: `);

// Append Data Function //
const appendData = (data) => {
    const messageElement = document.createElement('h2');
    messageElement.innerText = data ;
    dataContainer.appendChild(messageElement);
};

// Socket Event For User Name //
socket.emit('new-user-joined' , Name);
// socket User Joined Event For Sending Name To Data Container //
socket.on('user-joined' , (Name) => {
    appendData(`${Name} Joined.`);
});

// Sending Data To Server //
socket.emit('online' , "User Online");

// Clicked Function //
function clicked() {
    // Sending Value Of TextArea To Data Container //
    const h2 = document.createElement('h2'); 
    const message = textArea.value ;
    // Sending message To Server //
    socket.emit('sendMessage' , message);
    h2.innerText = message ;
    dataContainer.appendChild(h2);
    textArea.value = "" ;
    
    // socket event emitter on client side on click //
    socket.emit('btnClick');
}

// Button Click Event //
button.addEventListener('click' , clicked); // Calling Clicked Function On Button Click //