const Express = require('express');

const Router = Express.Router();
const Organization = require('../controllers/Organization');

Router.get('/organization/list/:pageIndex([0-9]+)?/:pageSize([0-9]+)?', Organization.list);
Router.post('/organization/create', Organization.create);
Router.post('/organization/update/:id([0-9]+)', Organization.update);
Router.post('/organization/delete/:id([0-9]+)', Organization.delete);

module.exports = Router;
