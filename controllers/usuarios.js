const { response } = require("express");
const usuario = require("../models/usuario");


const getUsuarios = async ( req, resp = response) => {

    // { ok: tru, msg: getUsuario' }
    // ne = not 0 existing
    const desde = Number( req.query.desde ) || 0;

    const usuarios = await usuario
        .find({ _id: { $ne: req.uuid}})
        .sort('-online')
        .skip(desde)
        .limit(2);

    resp.json({
        ok: true,
        usuarios: usuarios
    });
}

module.exports = {
    getUsuarios
}