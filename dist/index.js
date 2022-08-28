"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const rutas_1 = __importDefault(require("./rutas"));
//Para transformar los datos a objetos json, cuando se retornan datos me los devuelve en Json
app.use(express_1.default.json());
//Transformar los datos de un formulario html a objetos json, cuando envió la información desde un formulario
//los envía en formato Json 
app.use(express_1.default.urlencoded({ extended: false }));
app.use(rutas_1.default);
app.listen(3000, () => {
    console.log("Servidor en puerto 3000", 3000);
});
