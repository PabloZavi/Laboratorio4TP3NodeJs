import {Router} from 'express'
import {altaEmpleado, getEmpleados, getEmpleadosPorLegajo, actualizarEmpleado, actualizarEmpleado2, eliminarEmpleado, formularioActualizacion} from './controlador/controlador'

const router = Router();

router.get('/test', (requ, resp) => resp.send('HOLA MUNDO'));

router.get('/empleados', getEmpleados);

//Cuando pongo :id es un parámetro
router.get('/empleados/:legajo', getEmpleadosPorLegajo);

//POR AHORA ELIMINO ESTO
router.get('/actualizar/:legajo', formularioActualizacion);


router.post('/insert', altaEmpleado);//insert

//Le tuve que poner post en vez de put para que funcione
//router.post('/update', actualizarEmpleado);//update

//Le tuve que poner post en vez de put para que funcione
router.post('/update', actualizarEmpleado2);//update


//Le tuve que poner get en vez de delete para que funcione desde html
router.get('/delete/:legajo', eliminarEmpleado);//eliminar


export default router;