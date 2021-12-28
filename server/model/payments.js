const mongoose = require('mongoose');

var schema = new mongoose.Schema({
//Estrutura de las colecciones
    code_debtor: {
        type: String,
        required: true
    },
    code_service: {
        type: Number,
        required: true,
    },
    date_payment: {
        type: Date,
        required: true,
    },
    amount_payment: {
        type: Number,
        required: true,
    },
    number_payment: {
        type: Number,
        required: true,
    },
    state: {
        type: String,
        required: true
    },
    person: {
        type: String,
        required: true
    },
    
})

const Paymentdb = mongoose.model('payments', schema);

module.exports = Paymentdb;