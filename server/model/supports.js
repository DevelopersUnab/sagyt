const mongoose = require('mongoose');

var schema = new mongoose.Schema({
//Estrutura de las colecciones
    date_support: {
        type: Date,
        required: true,
    },
    type_support: {
        type: String,
        required: true
    },
    title_support: {
        type: String,
        required: true,
    },
    modality_support: {
        type: String,
        required: true,
    },
    originality_proyect: {
        type: String,
        required: true,
    },
    approval_support: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    person: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'persons',
    },
    
})

const Supportdb = mongoose.model('supports', schema);

module.exports = Supportdb;