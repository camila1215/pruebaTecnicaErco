const express = require("express");
const cors = require("cors");

    class Server{
        constructor(){
            this.app = express();
            this.middelWare();
            this.routes();
        }

        middelWare(){
            this.app.use(cors());
            this.app.use(express.json());
        }

        routes(){
            this.app.use('',require('./routes/routesProyecto'));
        }

        listen(){
            this.server = this.app.listen(3001, ()=>{
                console.log('Hola de lado del servidor *.*');
            });
        }
    }

    module.exports = Server;