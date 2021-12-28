const mongoose = require('mongoose');

var schema = new mongoose.Schema({
//Estrutura de las colecciones
    detail: {
        type: String,
        required: true
    }
})

const Conditiondb = mongoose.model('condition', schema);

module.exports = Conditiondb;