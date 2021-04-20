var Airtable = require('airtable');
var AsyncAirtable = require('asyncairtable');
const Proyecto = require('../models/proyecto');
const Tarea = require('../models/tarea');

//    asyncbase.select('Proyecto').then( (tabla  )  =>      {


/*  EJEMPLO DE OBJETO RECORD

{
  id: "recABCDEFGHIJK",
  fields: {
    title: "hello",
    description: "world"
  },
  createdTime: 'timestamp'
}
*/



exports.sendToAirtableFunc = (request,response,next) => {
  //Estas variables se encargan de recibir los datos para la conexión con airtable para realizar el envío de datos
  var llaveApi = request.body.apiKey;
  var llaveBase = request.body.baseKey;
  var asyncbase = new AsyncAirtable(llaveApi , llaveBase);

    Proyecto.fetchVistaAirtable(request.params.proyecto_id).then( (rows, fieldData  )  =>      {
       //aqui se tiene que construir el objeto a enviar
       var tempjson="";
       var objetoTabla="[";
       var taskList =[];
      for (var tarea =0; tarea < rows[0].length; tarea++) {

        //aqui se construye el json en base al objeto record    
    tempjson = '  { "Tarea": "' + rows[0][tarea].Tarea + '", "Caso de uso":"' + rows[0][tarea].Casodeuso + '", "Iteración":"' + rows[0][tarea].Iteración + '", "Fase de desarrollo":"' + rows[0][tarea].Fasededesarrollo + '", "Status":"' + rows[0][tarea].Status + '", "Tiempo de completado":"' + rows[0][tarea].Tiempodecompletado + '" }  ' ;
    
 
        taskList.push(JSON.parse(tempjson));
        
        
        if (tarea != rows[0].length-1)   { 
           objetoTabla += tempjson + ","; 
          }
        else {
          objetoTabla+= tempjson;
        }
       }
       


    
    objetoTabla += "]";
    console.log(objetoTabla);
     asyncbase.bulkCreate('Proyecto', JSON.parse(objetoTabla)).then( (tabla  )  =>      {

      response.redirect('/proyectos/detalles/'+request.params.proyecto_id);



       });

    }).catch(err => {
           console.log(err);
       });

    
};


exports.actualizarSQLconAirtable = (request,response, next) => {
  var llaveApi = request.body.apiKey;
  var llaveBase = request.body.baseKey;
  var asyncbase = new AsyncAirtable(llaveApi , llaveBase);
  asyncbase.select('Proyecto').then( (tabla  )  =>      {
    console.log("La tabla recuperada de airtable para su UPDATE en SQL es: ",tabla);
    
    for (tarea in tabla){

      //    ejemplo de como acceder a los datos de la tabla de airtable
      //    tabla[tarea].fields.Status;
    console.log("Realizando update en sql con parametros: '"+tabla[tarea].fields.Tarea+"'" ,tabla[tarea].fields.Status, tabla[tarea].fields['Tiempo de completado'])
    const temptarea= String(tabla[tarea].fields.Tarea);
    const tempstatus= String(tabla[tarea].fields.Status);
    const temptiempo = String(tabla[tarea].fields['Tiempo de completado']);
    Tarea.updateTareasConAirtable(temptarea, tempstatus, temptiempo )
    .then(([rows,fieldData]) => {  console.log("se realizo update de tarea ",rows);    }    ).catch(err => {console.log(err);});
    }
    Proyecto.fetchProyectosConHoras()
    .then(([rows, fieldData]) => {
  
      response.redirect('/proyectos/detalles/'+request.params.proyecto_id);

    })

    
 })
      .catch(err => {
        console.log(err);
    });

};