const server = require('./src/server.js');
const { conn } = require('./src/db_conection.js');

const {
  PORT
} = process.env;


conn.sync({ force: false }).then(() => { //*Cambiar el estado de la base de dato
  console.log('Todo salio bien')
  server.listen(PORT, () => {
    console.log(`Listenig in port: ${PORT}`)
  });
}).catch((error=>{console.log('Fallo: ',error.message)}))
