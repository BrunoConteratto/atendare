const Express = require('express');

const Router = Express.Router();
const Lead = require('../controllers/Lead');

Router.get('/lead/list/:pageIndex([0-9]+)?/:pageSize([0-9]+)?', Lead.list);
Router.post('/lead/create', Lead.create);
Router.post('/lead/update/:id([0-9]+)', Lead.update);
Router.post('/lead/delete/:id([0-9]+)', Lead.delete);

module.exports = Router;
