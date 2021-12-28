const mongoose = require('mongoose');

var schema = new mongoose.Schema({
//Estrutura de las colecciones
    code_graduate: {
        type: String,
        required: true
    },
    school: {
        type: String,
        required: true,
    },
    program_academic: {
        type: String,
        required: true,
    },
    study_plan: {
        type: String,
        required: true,
    },
    approved_credits: {
        type: Number,
        required: true,
    },
    date_firstenrollment_unab: {
        type: Date,
        required: true,
    },
    date_firstenrollment_origen: {
        type: Date,
        required: true,
    },
    date_last_semester: {
        type: Date,
        required: true,
    },
    date_egress: {
        type: Date,
        required: true,
    },
    condition: {
        type: String,
    },
    person: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'persons',
    },

})

const Graduatedb = mongoose.model('graduates', schema);

module.exports = Graduatedb;