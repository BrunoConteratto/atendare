const Express = require('express');

const Router = Express.Router();
const User = require('../controllers/User');

Router.get('/users', User.index);

module.exports = Router;
