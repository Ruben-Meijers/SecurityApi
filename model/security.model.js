const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const securitySchema  = new Schema({

    name: String,
    date : String,
    description : String,
     
}, {
    timestamps: true
});
const Security = mongoose.model('security', securitySchema);

// const security = new Flight({
//     name: 'test',
//     date: '06-05-2018',
//      description : 'Er is een testillegaat iets tada....'
// }).save();

module.exports = Security;

