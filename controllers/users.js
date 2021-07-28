const { response, request } = require('express');


const userGet = (req=request, res=response) => {
    const query = req.query;
    res.json({
        msg: 'get API',
        query
    })
    }

const userPut = (req, res=response) => {
    const id = req.params;
    res.json({
        msg: 'put API',
        id
    })
    }

const userPost = (req= request, res=response) => {
    //Aquí vienen los parámetros
    const {nombre, edad} = req.body;

    res.json({
        msg: 'post API contro',
        nombre,
        edad,
    })
    }

const userDelete = (req, res=response) => {
    res.json({
        msg: 'delete API'
    })
    }


module.exports = {
    userGet, 
    userPut,
    userPost,
    userDelete
}