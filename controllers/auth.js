
const { response } = require('express');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async (req, resp = response) => {

    const { email, password } = req.body;

    try {

        const existeEmail = await Usuario.findOne({
            email
        });
        if ( existeEmail ) {
            return resp.status(400).json({
                ok:false,
                msg: 'El correo ya está regitrado'
            })
        }

        const usuario = new Usuario( req.body );

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt);

        await usuario.save();

        // Generar mi JWT (Json Web Token)
        const token = await generarJWT(usuario.id);
    
        resp.json({
            ok: true,
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: error
        });
    }

    
}

const login = async (req, resp = response) => {
    const { email, password } = req.body;
    try {
        const usuario = new Usuario( req.body );
        const usuarioDB = await Usuario.findOne({ email });
        console.log(usuario);
        console.log(usuarioDB);
        if ( !usuarioDB ) {
            return resp.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        // Validar el password
        const validPassword = bcrypt.compareSync( password, usuarioDB.password );
        if ( !validPassword ) {

            return resp.status(404).json({
                ok: false,
                msg: 'La contraseña no es válida'
            });
        }

        //Generar el JWT
        const token =  await generarJWT( usuarioDB.id);

        resp.json({
            ok: true,
            usuario: usuarioDB,
            token
        });
    } catch ( error ) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        });
    }
}

const renewToken = async (req, resp = response) => {

    const uuid = req.uuid;
    console.log('el uuid', uuid);
    const usuarioDB = await Usuario.findOne(req.email);

    const newToken = await generarJWT( usuarioDB.id );

    try {

        const usuario = await Usuario.findById( uuid );
        // if ( !usuario ) {

        //     return resp.status(404).json({
        //         ok: false,
        //         msg: 'invalid user'
        //     });
        // } 

        resp.json({
            ok: true,
            usuario,
            token: newToken,
        })
        

    } catch (error) {

        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        });
    }

}

module.exports = {
    crearUsuario,
    login,
    renewToken
}