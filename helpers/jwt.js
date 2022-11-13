const jwt = require('jsonwebtoken');

// jwt tiene header, payload y firma

const generarJWT = ( uuid ) => {

    return new Promise( (resolve,reject) => {
        const payload = {
            uuid
        };
    
        jwt.sign( payload, process.env.JWT_KEY, {
            expiresIn: '24h'
        }, ( err, token ) => {
            if ( err ) {
                // no se pudo crear el token
                reject('No se pudo generar el JWT');
            } else {
                // TOKEN!
                resolve(token);
            }
        });
    });

}

module.exports = {
    generarJWT
}