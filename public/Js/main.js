// DOM elements //
const textArea = document.getElementById('text');
const button = document.getElementById('button');
const dataContainer = document.getElementById('data-container');

// Socket Connection (client) //
const socket = io();

// Sending Data To Server //
socket.emit('online' , "User Online");

// Clicked Function //
function clicked() {
    // Sending Value Of TextArea To Data Container //
    const h2 = document.createElement('h2'); 
    h2.innerText = textArea.value ;
    dataContainer.appendChild(h2);
    textArea.value = "" ;
    
    // socket event emitter on client side on click //
    socket.emit('btnClick');
}

// Button Click Event //
button.addEventListener('click' , clicked); // Calling Clicked Function On Button Click //