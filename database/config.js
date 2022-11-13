const mongoose = require('mongoose');
const dbConnection = async() => {

    try {
        await mongoose.connect( process.env.DB_CNN);
        console.log('DB Online');

    } catch (error) {
        console.log(error);
        throw new Error('Error en la base de datos');
    }
};

module.exports = {
    dbConnection
}
// mongoose.connect('mongodb://localhost:27017/test');

// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));