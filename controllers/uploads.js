const { response }   = require("express");
const path           = require("path");
const fs             = require("fs");
const { fileUpload } = require("../helpers/upload-file");
const User           = require("../models/usuario");
const Product        = require("../models/product");

const uploadFiles = async ( req, res =  response ) => {
  
    fileUpload( req.files, undefined, 'imgs' )
    .then( path => {
        res.status( 200 ).json({
           path
        })
    })
    .catch(msg => {
        res.status( 400 ).json({
            msg
        })
    });
}

const updateImage = async ( req, res = response ) => {

    const { id, collection } = req.params;

    let model;

    switch (collection) {
        case 'users':
            model = await User.findById( id );
            if( !model ) return res.status( 400 ).json({
                msg: `No existe un usuario con el id ${ id }.`
            })
            break;

        case 'products':
            model = await Product.findById( id );
            if( !model ) return res.status( 400 ).json({
                msg: `No existe un producto con el id ${ id }.`
            })
            break;
    
        default:
            return res.status( 500 ).json({ msg: 'Falta validar esta coleccion.'});
    }

    //Limpiar imagen previa
    if ( model.img ){            
        //Hay que caerle ensima a la imagen que ya existe en el servidor
        const pathImagen = path.join(__dirname, '../uploads', collection, model.img );
        if( fs.existsSync( pathImagen ) ){ //El "fs" verifica si existe ese archivo en la ruta, si existe lo borra
            fs.unlinkSync( pathImagen );
        }
    }

    const name = await fileUpload( req.files, undefined, collection );
    
    model.img = name;

    await model.save();

    res.status(200).json( model );
}

const imageShow = async ( req, res = response ) => {
    const { id, collection } = req.params;

    let model;

    switch (collection) {
        case 'users':
            model = await User.findById( id );
            if( !model ) return res.status( 400 ).json({
                msg: `No existe un usuario con el id ${ id }.`
            })
            break;

        case 'products':
            model = await Product.findById( id );
            if( !model ) return res.status( 400 ).json({
                msg: `No existe un producto con el id ${ id }.`
            })
            break;
    
        default:
            return res.status( 500 ).json({ msg: 'Falta validar esta coleccion.'});
    }

    //Limpiar imagen previa
    if ( model.img ){            
        //Hay que caerle ensima a la imagen que ya existe en el servidor
        const pathImagen = path.join(__dirname, '../uploads', collection, model.img );
        if( fs.existsSync( pathImagen ) ){ //El "fs" verifica si existe ese archivo en la ruta, si existe lo borra
            return res.status( 200 ).sendFile( pathImagen );
        } 
    }

    res.status( 200 ).sendFile( path.join( __dirname, '../assets/no-image.jpg' ));
}

module.exports = {

    uploadFiles,
    updateImage,
    imageShow
}