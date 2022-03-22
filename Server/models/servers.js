const express = require("express");
const cors = require("cors");

class ServerS {

    constructor() {
        this.app = express();
        this.port = 8081;

        this.photosPath = '/api/photos';
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.photosPath,require('../routes/photo'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('listening on port ' + this.port);
        })
    }
}

module.exports = ServerS;