// Creado por Pedro
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const { Schema }= mongoose;

const UserSchema = new Schema({
   
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
    area: {
        type: String,
        required: true,
    },
    type_document: {
        type: String,
        required: true,
    },
    document: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    confirm_password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },    
    date : {
        type: Date,
        default: Date.now
    }
});

UserSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
};

UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
// fin por Pedro

// const mongoose = require('mongoose');

// var schema = new mongoose.Schema({
//     //Estrutura de las colecciones
//     surname_pat: {
//         type: String,
//         required: true,
//     },
//     surname_mat: {
//         type: String,
//         required: true,
//     },
//     first_names: {
//         type: String,
//         required: true,
//     },
//     dni: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true,
//     },
//     email: {
//         type: String,
//         required: true,
//     },
//     area: {
//         type: String,
//         required: true,
//     },
//     date: {
//         type: Date,
//         default: Date.now
//     }
// })

// const Userdb = mongoose.model('users', schema);

// module.exports = Userdb;