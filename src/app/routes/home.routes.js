const Express = require('express');

const Router = Express.Router();
const Home = require('../controllers/Home');

Router.get('/', Home.index);

module.exports = Router;
