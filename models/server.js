const express = require('express');
const cors = require('cors');
class Server {

   constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = '/api/users'

    //Middlewares
    this.middlewares();
    
    // Rutas de mi aplicación
    this.routes();
   }
   

   middlewares(){

        //CORS: Si quisiera no le doy acceso a paginas y asi
        this.app.use( cors() );

        //Lectura y parseo del body a tipo JSON
        this.app.use( express.json() );

        // Directorio público 
        this.app.use( express.static('public'));
   }

   
   routes() {
       this.app.use(this.usersPath, require('../routes/user'));
   }

   listen() {
        
        this.app.listen( this.port , () => {
            console.log(`Servidor corriendo en el puerto: ${ this.port }`);
            
        });
   }

} 

module.exports = Server;