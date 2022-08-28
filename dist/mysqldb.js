"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cxMysql = void 0;
const mysql_1 = require("mysql");
//Creo un pool de conexiones, en sistemas concurrentes puedo atender más de una solicitud a la vez
//Le pongo un límite de conexión. Si le pongo un "createConexion" puedo procesar de a una solicitud a la vez
exports.cxMysql = (0, mysql_1.createPool)({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'tp3laboratorio4',
    connectionLimit: 100 //100 es el valor por defecto 
});
