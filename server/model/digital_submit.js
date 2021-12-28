const mongoose = require('mongoose');

var schema = new mongoose.Schema({
//Estrutura de las colecciones
    date_submit: {
        type: Date,
        required: true,
    },
    type_submit: {
        type: String,
        required: true,
    },
    title_submit: {
        type: String,
        required: true,
    },
    repo_url: {
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

const Digsubmitdb = mongoose.model('digsubmits', schema);

module.exports = Digsubmitdb;