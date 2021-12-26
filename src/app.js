const Express = require('express');
const ExpressHandlebars = require('express-handlebars');
const { config, path } = require('./config');
const appRoutes = require('./app/routes');
const apiRoutes = require('./api/routes');
const handlebars = require('./helpers/Handlebars');

const ExpressApp = Express();

ExpressApp.use(config.publicPath, Express.static(path.public));
ExpressApp.use(Express.json());
ExpressApp.use(Express.urlencoded({ extended: true }));

ExpressApp.engine(config.viewExtension, ExpressHandlebars({
  extname: config.viewExtension,
  layoutsDir: path.layout,
  defaultLayout: config.defaultLayout,
  helpers: handlebars,
  partialsDir: [path.partial],
}));
ExpressApp.set('views', path.view);
ExpressApp.set('view engine', config.viewExtension);
ExpressApp.enable('view cache');
ExpressApp.use('/api', apiRoutes);
ExpressApp.use(appRoutes);

module.exports = ExpressApp;
