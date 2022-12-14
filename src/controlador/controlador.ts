import { Request, Response } from "express";
import { cxMysql } from '../mysqldb';

export const getEmpleados = (req: Request, res: Response) => new Promise((resolve, reject) => {
  cxMysql.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      res.send(err);
      return;
    }
    console.log('MySQL Connection: ', connection.threadId);
    connection.query('SELECT * FROM empleado limit 10', (err, results) => {
      if (err) console.error(err);
      //console.log('User Query Results: ', results);
      //res.send(results)

      var html = '<!DOCTYPE html>';
      html += '<html>';
      html += '<head>';
      html += '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">';
      html += '</head>';
      html += '<body>';
      html += "<table border='1'align='center'>";
      html += "<tr><td>Legajo</td><td>Apellido</td><td>Nombre</td><td>DNI</td><td>Sector</td><td>Fecha Ingreso</td><td>Activo</td></tr>";

      (results.forEach((element: any) => {
        html += "<tr>";
        html += "<td>" + element.legajo + "</td>";
        html += "<td><input type='text' id='apellido' name='apellido' value='" + element.apellido + "'></td>";
        html += "<td><input type='text' id='nombre' name='nombre' value='" + element.nombre + "'></td>";
        html += "<td><input type='text' id='dni' name='dni' value='" + element.dni + "'></td>";
        html += "<td><input type='text' id='sector' name='sector' value='" + element.sector + "'></td>";
        html += "<td><input type='text' id='fechaIngreso' name='fechaIngreso' value='" + element.fechaIngreso + "'></td>";
        html += "<td><input type='text' id='activo' name='activo' value='" + element.activo + "'></td>";
        html += "<td><a href='http://localhost:3000/actualizar/" + element.legajo + "'><input type='button' value='Actualizar'></a></td>";
        html += "<td><a href='http://localhost:3000/delete/" + element.legajo + "'><input type='button' value='Eliminar'></a></td>";
        html += "</tr>";


      }));

      html += "</table>";



      //A PARTIR DE AC?? TRATO DE INSERTAR EL FORMULARIO DE ALTA
      html += "<br><br><br><br><br>"
      html += '<h2 align="center"><p>Dar de alta empleado:</p></h2>';
      html += '<form action="http://localhost:3000/insert" method="post">';
      html += '<table align="center">';
      html += '<tr>';
      html += '<td><label><p align="right">Legajo:</p></label></td>';
      html += '<td><input type="text" id="legajo" name="legajo" size="10"></td>';
      html += '</tr>';

      html += '<tr>';
      html += '<td><label><p align="right">Apellido:</p></label></td>';
      html += '<td><input type="text" id="apellido" name="apellido" size="20"></td>';
      html += '</tr>';
      html += '<tr>';
      html += '<td><label><p align="right">Nombre:</p></label></td>';
      html += '<td><input type="text" id="nombre" name="nombre" size="15"></td>';
      html += '</tr>';
      html += '<tr>';
      html += '<td><label><p align="right">DNI:</p></label></td>';
      html += '<td><input type="number" id="dni" name="dni" size="10"></td>';
      html += '</tr>';
      html += '<tr>';
      html += '<td><label><p align="right">Sector:</p></label></td>';
      html += '<td><input type="text" id="sector" name="sector" size="15"></td>';
      html += '</tr>';
      html += '<tr>';
      html += '<td><label><p align="right">Fecha Ingreso:</p></label></td>';
      html += '<td><input type="text" id="fechaIngreso" name="fechaIngreso" size="15"></td>';
      html += '</tr>';
      html += '<tr>';
      html += '<td><label><p align="right">Activo?:</p></label></td>';
      html += '<td><input type="text" id="activo" name="activo" size="15"></td>';
      html += '</tr>';
      html += '<tr>';
      html += '<td><p><br></p></td>';
      html += '<td><p><br></p></td>';
      html += '</tr>';

      html += '<tr>';
      html += '<td colspan="2" align="center">';
      html += "<input type='submit' value='Dar de alta'>";
      html += '</td>';
      html += '</tr>';
      html += '</table>';
      html += '</form>';

      //FIN INTENTO DE INSERTAR FORMULARIO DE ALTA

      html += '</body>';
      html += '</html>';

      res.send(html);


    });

  });
});

export const getEmpleadosPorLegajo = (req: Request, res: Response) => new Promise((resolve, reject) => {
  //Recupero el par??metro que recibo mediante req.params.id //lo recupero con el mismo nombre
  const legajo = parseInt(req.params.legajo);
  cxMysql.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      res.send(err);
      return;
    }
    //Cuando pongo los par??ntesis sin par??metros se conoce como funci??n an??nima (err, results)
    connection.query('SELECT * FROM empleado WHERE legajo = ?', [legajo], (err, results) => {
      if (err) console.error(err);
      res.send(results)
    });
  });
});

export const altaEmpleado = (req: Request, res: Response) => new Promise((resolve, reject) => {

  const { legajo, apellido, nombre, dni, sector, fechaIngreso, activo } = req.body; //req.body es que los recupero del cuerpo de la llamada
  //Hay que ponerle los mismos nombres que el Json
  var values = [legajo, apellido, nombre, dni, sector, fechaIngreso, activo];
  cxMysql.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      res.send(err);
      return;
    }
    else {
      let sql: string = 'INSERT INTO empleado(legajo, apellido, nombre, dni, sector, fechaIngreso, activo) VALUES (?, ?, ?, ?, ?, ?, ?)';
      connection.query(sql, values, (err, results) => {
        if (err) {
          console.error(err);
          //res.json({message:"Error al tratar de insertar empleado"})
          res.send(err);
        } else {
          //res.json({message:"Empleado insertado con exito"})
          res.redirect('http://localhost:3000/empleados')
        }
      });
    }
  });
});


export const actualizarEmpleado2 = (req: Request, res: Response) => new Promise((resolve, reject) => {
  //Recupero el par??metro que recibo mediante req.params.id //lo recupero con el mismo nombre
  const { legajo, apellido, nombre, dni, sector, fechaIngreso, activo } = req.body;
  var values = [apellido, nombre, dni, sector, fechaIngreso, activo, legajo];
  cxMysql.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      res.send(err);
      return;
    }
    else {
      let sql: string = 'UPDATE empleado SET apellido=?, nombre=?, dni=?, sector=?, fechaIngreso=?, activo=? WHERE legajo=?';
      connection.query(sql, values, (err, results) => {
        if (err) {
          console.error(err);
          //res.json({message:"Error al actualizar empleado" + err})
          res.send(err);
        } else {
          //res.json({message:"Empleado actualizado con exito"})

          res.redirect('http://localhost:3000/empleados')
        }

      });
    }
    //Cuando pongo los par??ntesis sin par??metros se conoce como funci??n an??nima (err, results)

  });
});



export const actualizarEmpleado = (req: Request, res: Response) => new Promise((resolve, reject) => {
  const { legajo, apellido, nombre, dni, sector, fechaIngreso, activo } = req.body;
  var values = [apellido, nombre, dni, sector, fechaIngreso, activo, legajo];
  cxMysql.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      res.send(err);
      return;
    }
    else {
      let sql: string = 'UPDATE empleado SET apellido=?, nombre=?, dni=?, sector=?, fechaIngreso=?, activo=? WHERE legajo=?';
      connection.query(sql, values, (err, results) => {
        if (err) {
          console.error(err);
          //res.json({message:"Error al actualizar empleado" + err})
          res.send(err);
        } else {
          //res.json({message:"Empleado actualizado con exito"})

          res.redirect('http://localhost:3000/empleados')
        }

      });
    }
  });
});

export const eliminarEmpleado = (req: Request, res: Response) => new Promise((resolve, reject) => {
  const legajo = parseInt(req.params.legajo);

  cxMysql.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      res.send(err);
      return;
    }
    connection.query('DELETE FROM empleado WHERE legajo = ?', [legajo], (err, results) => {
      if (err) {
        console.error(err);
        res.json({ message: "Error al tratar de eliminar empleado" })
      } else {
        //res.json({message:"Empleado eliminado con exito"})
        //res.send(getEmpleados);
        res.redirect('http://localhost:3000/empleados')
      }

    });
  });

});


export const formularioActualizacion = (req: Request, res: Response) => new Promise((resolve, reject) => {
  const legajo = parseInt(req.params.legajo);
  cxMysql.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      res.send(err);
      return;
    }

    var html = '<!DOCTYPE html>';
    html += '<html>';
    html += '<head>';
    html += '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">';
    html += '</head>';
    html += '<body>';



    console.log('MySQL Connection: ', connection.threadId);
    connection.query('SELECT * FROM empleado WHERE legajo = ?', [legajo], (err, results) => {
      if (err) console.error(err);
      //console.log('User Query Results: ', results);
      //res.send(results)


      (results.forEach((element: any) => {

        html += "<br><br><br><br><br>"
        html += '<h2 align="center"><p>Actualizar empleado:</p></h2>';
        html += '<form action="http://localhost:3000/update" method="post">';
        html += '<table align="center">';
        html += '<tr>';
        html += '<td><label><p align="right">Legajo:</p></label></td>';
        html += "<td>" + element.legajo + "</td>";
        html += '</tr>';

        html += '<tr>';
        html += '<td><label><p align="right">Apellido:</p></label></td>';
        html += "<td><input type='text' id='apellido' name='apellido' size='20' value='" + element.apellido + "'></td>";
        html += '</tr>';
        html += '<tr>';
        html += '<td><label><p align="right">Nombre:</p></label></td>';
        html += "<td><input type='text' id='nombre' name='nombre' size='20' value='" + element.nombre + "'></td>";
        html += '</tr>';
        html += '<tr>';
        html += '<td><label><p align="right">DNI:</p></label></td>';
        html += "<td><input type='number' id='dni' name='dni' size='20' value='" + element.dni + "'></td>";
        html += '</tr>';
        html += '<tr>';
        html += '<td><label><p align="right">Sector:</p></label></td>';
        html += "<td><input type='text' id='sector' name='sector' size='20' value='" + element.sector + "'></td>";
        html += '</tr>';
        html += '<tr>';
        html += '<td><label><p align="right">Fecha Ingreso:</p></label></td>';
        html += "<td><input type='text' id='fechaIngreso' name='fechaIngreso' size='20' value='" + element.fechaIngreso + "'></td>";
        html += '</tr>';
        html += '<tr>';
        html += '<td><label><p align="right">Activo?:</p></label></td>';
        html += "<td><input type='text' id='activo' name='activo' size='20' value='" + element.activo + "'></td>";
        html += '</tr>';
        html += '<tr>';
        html += '<td><p><br></p></td>';
        html += '<td><p><br></p></td>';
        html += '</tr>';

        html += '<tr>';
        html += '<td colspan="2" align="center">';
        html += "<input type='submit' value='Actualizar'>";
        html += '</td>';
        html += '</tr>';
        html += '</table>';
        html += '</form>';


      }));

      html += '</body>';
      html += '</html>';

      res.send(html);


    });

  });



});