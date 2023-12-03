
const express = require("express");
const app = express();

require("dotenv").config({path:'./.env'});

const PUERTO =  process.env.PUERTO || 9090;

const cors = require("cors");

//middleware
app.use(express.json());
app.use(express.urlencoded({extends :false}));// capturar cualquier tipo de datos - imagenes
app.use(cors());
//routers
app.use(require("./Routers/router.js"));
app.use(require("./Routers/paquetes.router.js"));

app.listen(PUERTO,()=>{
    console.log("Servidor iniciado..." + "puerto " + PUERTO);
});
