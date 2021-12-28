const express = require('express');
const route = express.Router();

const services = require('../services/render');

// Controllers
// const usercntrlr = require('../controller/user_cntrlr');
const personcntrlr = require('../controller/person_cntrlr')
const graduate_cntrlr = require('../controller/graduate_cntrlr')
const approval_cntrlr = require('../controller/approval_cntrlr')

//control de autenticacion
const { isAuthenticated } = require('../helpers/auth');

route.get('/index', isAuthenticated, services.homeRoutes);
route.get('/add-report', services.view_fgcreate);
route.get('/view-graduate', services.view_graduate);
route.get('/update-graduate', services.update_graduate);
route.get('/view-person', services.view_person);
route.get('/add-person', services.add_person);
route.get('/update-person', services.update_person);
route.get('/add-approval', services.view_fgapproval);
route.get('/view-approval', services.view_approval);
route.get('/update-approval', services.update_approval);


//API person
route.post('/api/persons', personcntrlr.create);
route.get('/api/persons', personcntrlr.find);
route.get('/api/persons/:id', personcntrlr.findOne);
route.put('/api/persons/:id', personcntrlr.update);
route.delete('/api/persons/:id', personcntrlr.delete);

//API graduates
route.post('/api/reports', graduate_cntrlr.create);
route.get('/api/reports', graduate_cntrlr.find);
route.put('/api/reports/:id', graduate_cntrlr.update);
route.delete('/api/reports/:id', graduate_cntrlr.delete);
route.get('/api/reports/count', graduate_cntrlr.count);
route.get('/api/reportsbyperson', graduate_cntrlr.Findbyperson);

//API Approval
route.post('/api/approvals', approval_cntrlr.create);
route.get('/api/approvals', approval_cntrlr.find);
route.get('/api/approvalsbyperson', approval_cntrlr.Findbyperson);
route.put('/api/approvals/:id', approval_cntrlr.update);
route.delete('/api/approvals/:id', approval_cntrlr.delete);

//API user
// route.post('/api/users', usercntrlr.create);
// route.get('/api/users', usercntrlr.find);
// route.put('/api/users/:id', usercntrlr.update);
// route.delete('/api/users/:id', usercntrlr.delete);

//API person-user
// route.put('/api/persons/assignuser/:id', personcntrlr.assignuser);

// API graduate-person
route.put('/api/reports/assignperson/:id', graduate_cntrlr.assignperson);

//support-person
route.put('/api/approvals/assignperson/:id', approval_cntrlr.assignperson)


module.exports = route