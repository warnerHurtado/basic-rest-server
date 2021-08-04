const Role = require('../models/role');
const Usuario = require('../models/usuario');


const isValidRole =  async( role='' ) => {
    const existRole = await Role.findOne({ role });
    
    if ( !existRole ){
        throw new Error(`El rol ${ role } no está registrado en la BD`);
    }
}

const existEmail = async( email='' ) => {
    const existEmail = await Usuario.findOne( {email} );

    if( existEmail ){
        throw new Error(`El correo ${ email } ya se encuenta registrado`);
    }

}

const existId = async( id ='' ) => {
    const existId = await Usuario.findById( id );

    if( !existId ){
        throw new Error(`El ID ${ id } no se encuenta registrado`);
    }

}

module.exports = {
    isValidRole,
    existEmail,
    existId
}

