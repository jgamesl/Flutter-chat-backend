const { io } = require('../index');
const { comprobarJWT } = require('../helpers/jwt');
const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require('../controllers/socket');


// Mensajes de Sockets
io.on('connection', async client => {
    console.log('Cliente conectado');
    console.log( client.handshake.headers['x-token'] );
    const [ valido, uuid ] = comprobarJWT( client.handshake.headers['x-token']);
    console.log('valid: ', valido);
    // const valido? =
    if ( !valido ) { return client.disconnect(); }
    console.log('cliente autenticado');

    usuarioConectado( uuid );
    //?? cliente con jwt

    // Ingresar al usuario a una sala específica
    // sala global(todos los dispositivos), client.id, idUUID
    client.join( uuid );

    client.on('mensaje-personal', async (payload) => {
        console.log(payload);
        await grabarMensaje( payload );
        io.to( payload.to ).emit('mensaje-personal', payload);
    });
    

    // client.on('connect', () => {
    //     console.log('Cliente sconectado');
    // });

    client.on('disconnect', () => {
        usuarioDesconectado( uuid );
        // console.log('Cliente desconectado');
    });


    // client.on('mensaje', ( payload ) => {
    //   console.log('Mensaje', payload);
    //   io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );
    // });


});
