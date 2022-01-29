const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
class Server {

   constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
        usersPath:      '/api/users',
        authPath:       '/api/auth',
        categoriesPath: '/api/categories',
        productsPath:   '/api/products',
        searchPath:     '/api/search'
    }
    // this.usersPath = '/api/users';
    // this.authPath = '/api/auth';

    //Conectar a base de datos
    this.conectarDB();

    //Middlewares
    this.middlewares();
    
    // Rutas de mi aplicación
    this.routes();
   }

   async conectarDB (){
       await dbConnection();
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
       this.app.use(this.paths.authPath,       require('../routes/auth'));
       this.app.use(this.paths.usersPath ,     require('../routes/user'));
       this.app.use(this.paths.categoriesPath, require('../routes/caterories'));
       this.app.use(this.paths.productsPath,   require('../routes/products'));
       this.app.use(this.paths.searchPath,     require('../routes/search'));
   }

   listen() {
        
        this.app.listen( this.port , () => {
            console.log(`Servidor corriendo en el puerto: ${ this.port }`.yellow);
            
        });
   }

} 

module.exports = Server;