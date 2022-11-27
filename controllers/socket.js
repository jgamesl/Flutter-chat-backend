
const Mensaje = require('../models/mensaje');
const Usuario = require('../models/usuario');

const usuarioConectado = async ( uuid = '' ) => {
    const usuario  = await Usuario.findById( uuid );
    usuario.online = true;
    await usuario.save();
    console.log('uzuari: ', usuario.online);
    return usuario;

}

const usuarioDesconectado = async ( uuid = '' ) => {

    const usuario  = await Usuario.findById( uuid );
    usuario.online = false;
    await usuario.save();
    return usuario;

}

const grabarMensaje = async ( payload ) => {

    /*
        {
            from: '',
            to: '',
            texto: ''
        }
    */
     console.log('en grabar mensaje');
    try {
        const mensaje = new Mensaje( payload );
        await mensaje.save();
        console.log('guarda');
        return true;
    } catch (error) {
        console.log('no guarda');
        return false
    }
}

module.exports = {
    usuarioConectado,
    usuarioDesconectado,
    grabarMensaje
}

