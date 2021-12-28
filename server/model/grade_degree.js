const mongoose = require('mongoose');

var schema = new mongoose.Schema({
//Estrutura de las colecciones
    exp_number: {
        type: Number,
        required: true
    },
    date_exp: {
        type: Date,
        required: true,
    },
    res_number: {
        type: String,
        required: true
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

const GradeandDegreedb = mongoose.model('gradeanddegree', schema);

module.exports = GradeandDegreedb;