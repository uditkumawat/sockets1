"use strict";

const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const bodyParser = require('body-parser');

const routes = require('./utils/routes');
const config = require('./utils/config');

class Server{

    constructor(){

        this.port = process.env.NODE_ENV || 8080;

        this.host = 'localhost';

        this.app = express();

        this.http = http.Server(this.app);

        this.socket = socketio(this.http);
    }

    appConfig(){

        this.app.use(bodyParser.json());

        new config(this.app);
    }

    includeRoutes(){
        new routes(this.app,this.socket).routesConfig();
    }

    appExecute(){

        this.appConfig();

        this.includeRoutes();

        this.http.listen(this.port,this.host,()=>{
           console.log('Listening to server on ',this.host,":",this.port);
        });
    }
}

const app = new Server();
app.appExecute();