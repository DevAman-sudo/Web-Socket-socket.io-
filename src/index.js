// Npm packages //
const express = require('express');
const http = require('http');
const io = require('socket.io');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

// App , Http and Port //
const app = express();
http.createServer(app);
const port = process.env.PORT || 8080 ; // if Web App Is Hoated it will Run in Given Domain Name , else on Poet 8080 //

// File Path Decleration Area //
const staticPath = path.join( __dirname , '../public'); // All Static Web Pages stored in Public Folder //
const indexPagePath = path.join( staticPath , '/index.html');

// Serving Public Folder Static Pages //
app.use(express.static(staticPath));

// Page Routing Area //
app.get('/' , (req , res) => { // Serving Deafult Page (index.html) //
    fs.readFileSync( indexPagePath , 'utf-8' , (err , data) => {
        if (err) {
            console.log( chalk.blue.bgRed.bold(`Error Found (index page routing) :: ${err}`));
        } else {
            res.send(`${data}`);
        }
    });
});

// Serving 404 Error Page (404.html) //
app.get('*' , (req , res) => {
    res.send(`404 Error Found`);
});

// Web Socket (socket.io) Connection/EventsEvents //
io.on('connection' , () => {
    console.log( );
});