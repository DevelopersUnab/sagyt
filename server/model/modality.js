const mongoose = require('mongoose');

var schema = new mongoose.Schema({
//Estrutura de las colecciones
    detail: {
        type: String,
        required: true
    }
})

const Modalitydb = mongoose.model('modality', schema);

module.exports = Modalitydb;