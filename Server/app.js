require('dotenv').config();

const ServerS = require('./models/servers');

const server = new ServerS();

server.listen();

