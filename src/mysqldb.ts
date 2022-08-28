import {createPool} from 'mysql'

//Creo un pool de conexiones, en sistemas concurrentes puedo atender más de una solicitud a la vez
//Le pongo un límite de conexión. Si le pongo un "createConexion" puedo procesar de a una solicitud a la vez
export const cxMysql = createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'tp3laboratorio4',
    connectionLimit: 100 //100 es el valor por defecto 
  });
  