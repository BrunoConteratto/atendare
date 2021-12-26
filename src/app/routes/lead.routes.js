const Express = require('express');

const Router = Express.Router();
const Lead = require('../controllers/Lead');

Router.get('/leads/:pageIndex([0-9]+)?/:pageSize([0-9]+)?', Lead.index);
Router.get('/lead/create', Lead.create);
Router.get('/lead/edit/:id([0-9]+)', Lead.edit);

module.exports = Router;
