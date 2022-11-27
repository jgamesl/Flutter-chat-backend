
const { response } = require('express');
const Mensaje = require('../models/mensaje');

const obtenerChat = async (req, res = response) => {
    console.log('entro obtener');
    const miId = req.uuid;
    const messagesFrom = req.params.from;

    const last30 = await Mensaje.find({
        $or: [{ from: miId, para: messagesFrom }, { de: messagesFrom, para: miId }]
    })
    .sort({ createdAt: 'desc'})
    .limit(30);

    res.json({
        ok: true,
        mensajes: last30

    });
}

module.exports = {
    obtenerChat
}

