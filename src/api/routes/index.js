const Express = require('express');

const Router = Express.Router();

const organization = require('./organization.routes');
const lead = require('./lead.routes');

Router.use('*', (req, res) => {
  res.sendStatus(404);
});

module.exports = [organization, lead, Router];
