const mongoose = require('mongoose');

var schema = new mongoose.Schema({
//Estrutura de las colecciones
    date: {
        type: Date,
        required: true,
    },    
    cond_debit: {
        type: String,
        required: true
    },
    detail_debit: {
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

const Debitdb = mongoose.model('debits', schema);

module.exports = Debitdb;