const Express = require('express');

const Router = Express.Router();

const home = require('./home.routes');
const user = require('./user.routes');
const lead = require('./lead.routes');
const organization = require('./organization.routes');

Router.use('*', (req, res) => {
  res.status(404).render('errors/404', {
    layout: 'error',
    title: 'Erro 404',
    user: null,
  });
});

module.exports = [home, user, organization, lead, Router];
