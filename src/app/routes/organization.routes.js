const Express = require('express');

const Router = Express.Router();
const Organization = require('../controllers/Organization');

Router.get('/organizations/:pageIndex([0-9]+)?/:pageSize([0-9]+)?', Organization.index);
Router.get('/organization/create', Organization.create);
Router.get('/organization/edit/:id([0-9]+)', Organization.edit);

module.exports = Router;
