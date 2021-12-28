const express = require('express');
const route = express.Router();

const services = require('../services/render');
// Controllers

//control de autenticacion
const { isAuthenticated } = require('../helpers/auth');

route.get('/', isAuthenticated, services.homeHome);

route.get('/about', isAuthenticated, services.aboutHome);

module.exports = route;