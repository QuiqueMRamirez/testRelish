require('dotenv').config();

const Server = require('../Server/models/server');

const server = new Server();

server.listen();

