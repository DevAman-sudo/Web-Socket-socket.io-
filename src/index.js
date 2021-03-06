// Npm packages //
const express = require('express');
const app = express(); // Express App Server //
const http = require('http').createServer(app); // Created Http Server //
const webSocket = require('socket.io');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

// App , Http and Port //
const io = webSocket(http);
const port = process.env.PORT || 8080; // if Web App Is Hoated it will Run in Given Domain Name , else on Poet 8080 //

// File Path Decleration Area //
const staticPath = path.join(__dirname, '../public'); // All Static Web Pages stored in Public Folder //
const indexPagePath = path.join(staticPath, '/index.html');

// Serving Public Folder Static Pages //
app.use(express.static(staticPath));

// Page Routing Area //
app.get('/', (req, res) => {
    // Serving Deafult Page (index.html) //
    fs.readFileSync(indexPagePath, 'utf-8', (err, data) => {
        if (err) {
            console.log(chalk.blue.bgRed.bold(`Error Found (index page routing) :: ${err}`));
        } else {
            res.send(`${data}`);
        }
    });
});

// Serving 404 Error Page (404.html) //
app.get('*', (req, res) => {
    res.send(`404 Error Found`);
});

// Web Socket (socket.io) Connection/EventsEvents //
users = {}; // Users Container //

io.on('connection', (socket) => {

    // socket connection on button click //
    socket.on('btnClick',
        () => {
            console.log(chalk.red.bgBlue.bold(`User Connected`));
        });

    // Reciving Data From Client Side //
    socket.on('online',
        (data) => {
            console.log(chalk.red.bgBlue(`${data} and his Socket Id is ${socket.id}`));
        });

    // Reciving User Name From Client //
    socket.on('new-user-joined',
        (Name) => {
            users[socket.id] = Name; // Storing Users Socket ID as Name in Users Object //
            socket.broadcast.emit('user-joined' , Name);
        });

    // Reciving Message From Client //
    socket.on('send',
        (message) => {
            // Sending Socket ID as Name and Message To Client Side //
            socket.broadcast.emit('receive', {name: users[socket.id] , message: message});
        });
        
    // Socket Users Disconnect Event //
    socket.on('disconnect' , (name) => {
        socket.broadcast.emit('leave' , users[socket.id]);
        delete users[socket.id]; // Deleting Users Socket Id If he/She Leaves //
    });
});

// listining on Port 8080 //
http.listen(port, (err) => {
    if (err) {
        console.log(chalk.blue.bgRed.bold(`Error Found :: ${err}`));
    } else {
        console.log(chalk.red.bgBlue.bold(`http://127.0.0.1:${port}`));
    }
});