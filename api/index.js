const app = require('./src/app.js');

//En esta línea, estás importando la constante conn desde el módulo ubicado en el archivo db.js en la carpeta src. 
//Esto implica que el módulo db.js exporta un objeto que contiene la conexión a una base de datos u otra funcionalidad 
//relacionada con la base de datos.
const { conn } = require('./src/db.js');

//este código se encarga de sincronizar los modelos y esquemas definidos en tu código con la base de datos, y luego 
//inicia un servidor HTTP en el puerto 3001 una vez que la sincronización se haya completado.
conn.sync({ force: true }).then(() => {
  app.listen(3001, () => {
    console.log('%s listening at 3001');
  });
});