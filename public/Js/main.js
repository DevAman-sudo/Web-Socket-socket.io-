// DOM elements //
const button = document.getElementById('button');

// Socket Connection (client) //
const socket = io();

// Button Click Event //
button.addEventListener('click' , () => {
    // socket event emitter on client side on click //
    socket.emit('btnClick');
});