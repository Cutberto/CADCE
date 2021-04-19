var Airtable = require('airtable');
var AsyncAirtable = require('asyncairtable');
const Proyecto = require('../models/proyecto');


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
      // console.log("rows[0] ", rows[0]);
      // console.log("rows[0][6] ", rows[0][6]);
      for (var tarea =0; tarea < rows[0].length; tarea++) {

      // for (tarea in rows[0]){
      //   console.log("la idtarea es ", rows[0][tarea].IdTarea);  //NOTA: Esta es la forma de acceder a cada dato de rows
        //console.log("la tarea es: ",rows[0][tarea]);
        //aqui se construye el json en base al objeto record


        //        tempjson = ' { "id": "' + rows[0][tarea].IdTarea +'", "fields": {  "Tarea": "' + rows[0][tarea].Tarea + '", "Caso de uso":"' + rows[0][tarea].Casodeuso + '", "Iteración":"' + rows[0][tarea].Iteración + '", "Fase de desarrollo":"' + rows[0][tarea].Fasededesarrollo + '", "Status":"' + rows[0][tarea].Status + '", "Tiempo de completado":"' + rows[0][tarea].Tiempodecompletado + '" }}  ' ;
    //    tempjson = '  {"fields": {  "Tarea": "' + rows[0][tarea].Tarea + '", "Caso de uso":"' + rows[0][tarea].Casodeuso + '", "Iteración":"' + rows[0][tarea].Iteración + '", "Fase de desarrollo":"' + rows[0][tarea].Fasededesarrollo + '", "Status":"' + rows[0][tarea].Status + '", "Tiempo de completado":"' + rows[0][tarea].Tiempodecompletado + '" }}  ' ;
    
    tempjson = '  { "Tarea": "' + rows[0][tarea].Tarea + '", "Caso de uso":"' + rows[0][tarea].Casodeuso + '", "Iteración":"' + rows[0][tarea].Iteración + '", "Fase de desarrollo":"' + rows[0][tarea].Fasededesarrollo + '", "Status":"' + rows[0][tarea].Status + '", "Tiempo de completado":"' + rows[0][tarea].Tiempodecompletado + '" }  ' ;
    
        //tempjson = "[ { 'id': '" + rows[0][tarea].IdTarea +"', 'fields': {  'Tarea': '" + rows[0][tarea].Tarea + "', 'Caso de uso':'" + rows[0][tarea].Casodeuso + "', 'Iteración':'" + rows[0][tarea].Iteración + "', 'Fase de desarrollo':'" + rows[0][tarea].Fasededesarrollo + "', 'Status':'" + rows[0][tarea].Status + "', 'Tiempo de completado':'" + rows[0][tarea].Tiempodecompletado + "' }}  ]";

        
    //    console.log(tempjson);
        taskList.push(JSON.parse(tempjson));
        
        
        if (tarea != rows[0].length-1)   { 
           objetoTabla += tempjson + ","; 
          }
        else {
          objetoTabla+= tempjson;
        }
      // taskList.push(tempjson);
       }
       

      // console.log(taskList[0]);
    
    objetoTabla += "]";
    console.log(objetoTabla);
     //  asyncbase.createRecord('Proyecto', taskList[2]).then( (tabla  )  =>      {  });
     asyncbase.bulkCreate('Proyecto', JSON.parse(objetoTabla)).then( (tabla  )  =>      {

      response.redirect('/proyectos/detalles/'+request.params.proyecto_id);



       });
          
       // cambiar esto por un bulk insert
        //    base('Proyecto').create( taskList[1] , function(err, records) {
        //    if (err) {
        //        console.error(err);
        //        return;
        //    }
            
        //    });    
       
    }).catch(err => {
           console.log(err);
       });

    
};