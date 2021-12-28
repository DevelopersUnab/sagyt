const mongoose = require('mongoose');

var schema = new mongoose.Schema({
//Estrutura de la Colección persona
    surname_pat: {
        type: String,
        required: true,
    },
    surname_mat: {
        type: String,
        required: true,
    },
    first_names: {
        type: String,
        required: true,
    },
    document_type: {
        type: String,
        required: true,
    },
    document_number: {
        type: Number,
        required: true,
        unique: true
    },
    mail: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    phone_option: {
        type: String,
        required: true,
    },
    state: {
        type: String,
    },
    condition: {
        type: String,
    },
    modality: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },

})

const Persondb = mongoose.model('persons', schema);

module.exports = Persondb;