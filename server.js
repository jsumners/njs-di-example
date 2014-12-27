'use strict';

// Hapi is tangential to this example project. It merely provides a simple
// way to create our web service. See http://hapijs.com/ for more details
// on Hapi.
var Hapi = require('hapi');

// Here we are instantiating our Inversion of Control (IoC) container.
// See https://en.wikipedia.org/wiki/Inversion_of_control
var ioc = require('electrolyte');

// Here we are registering component namespaces with the IoC container.
// Each namespace has a specific file system location where the
// components are stored. We use Electrolytes helper method `node` to
// resolve the file system path relative this script's working directory.
ioc.loader('models', ioc.node('src/models'));
ioc.loader('controllers', ioc.node('src/controllers'));
ioc.loader('config', ioc.node('src/config'));

// Here we use the IoC container to instantiate a new instance, or retrieve
// an existing one (in the case of singletons), of a component. In this case,
// we are instantiating a new instance of our application's settings
// component.
var settings = ioc.create('config/settings');

var server = new Hapi.Server();
server.connection(settings.server.connection);

// Here we load the component which defines our web service end points (well,
// end point) and load them into the Hapi server. The 'config/routes'
// component will use the IoC container to load dependent components.
// You should now read the 'src/config/routes.js' file to continue
// the example.
server.route(ioc.create('config/routes'));

server.start(function() {
  console.log('Server running at:', server.info.uri);
});