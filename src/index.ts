import express from "express";
const app = express();

import rutas from './rutas';

//Para transformar los datos a objetos json, cuando se retornan datos me los devuelve en Json
app.use(express.json());
//Transformar los datos de un formulario html a objetos json, cuando envió la información desde un formulario
//los envía en formato Json 
app.use(express.urlencoded({extended:false}));

app.use(rutas);

app.listen(3000, () => {
    console.log("Servidor en puerto 3000", 3000);
})
