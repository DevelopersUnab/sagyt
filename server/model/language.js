const mongoose = require('mongoose');

var schema = new mongoose.Schema({
//Estrutura de las colecciones
    type_certificate: {
        type: String,
        required: true
    },
    date_certificate: {
        type: Date,
        required: true,
    },
    detail_certificate: {
        type: String,
        required: true,
    },
    level_language: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    person: {
        type: String,
        required: true,
    },
    

})

const Languagedb = mongoose.model('languages', schema);

module.exports = Languagedb;