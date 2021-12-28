const express = require('express');
const route = express.Router();

const services = require('../services/render');

// Controllers
const userscontroller = require('../controller/users.controller');

//Rutas

route.get('/users/signin', userscontroller.userSignin);

route.post('/users/signin', userscontroller.signin);

route.get('/users/signup', userscontroller.userSignup);

route.post("/users/signup", userscontroller.singup);

route.get("/users/logout", userscontroller.logout);

module.exports = route;