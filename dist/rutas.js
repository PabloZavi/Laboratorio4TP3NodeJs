"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controlador_1 = require("./controlador/controlador");
const router = (0, express_1.Router)();
router.get('/test', (requ, resp) => resp.send('HOLA MUNDO'));
router.get('/empleados', controlador_1.getEmpleados);
//Cuando pongo :id es un parámetro
router.get('/empleados/:legajo', controlador_1.getEmpleadosPorLegajo);
//POR AHORA ELIMINO ESTO
router.get('/actualizar/:legajo', controlador_1.formularioActualizacion);
router.post('/insert', controlador_1.altaEmpleado); //insert
//Le tuve que poner post en vez de put para que funcione
//router.post('/update', actualizarEmpleado);//update
//Le tuve que poner post en vez de put para que funcione
router.post('/update', controlador_1.actualizarEmpleado2); //update
//Le tuve que poner get en vez de delete para que funcione desde html
router.get('/delete/:legajo', controlador_1.eliminarEmpleado); //eliminar
exports.default = router;
