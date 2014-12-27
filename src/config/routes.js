'use strict';

// Here we are using Node.js's module caching to retrieve a reference to the
// IoC container we created in server.js. That means we have immediate access
// to all of the component namespaces we defined previously, as well as any
// singleton objects that have already been instantiated.
var ioc = require('electrolyte');

var routes = [];

routes.push({
  method: 'GET',
  path: '/foo',

  // By using the 'controllers/' namespace that we previously registered
  // with the IoC container, we are able to create a new instance of the
  // 'fooController' object without having to use Node.js's require
  // mechnasim. If we were relying on the Node.js require, then the line would
  // read `handler: require('../controllers/fooController')`.
  //
  // By using IoC, we decouple reliance on hard coded paths and improve
  // maintainability. If we decide that we need to refactor the file system
  // location of 'controllers/' then we only have to modify the path in
  // one location -- the place where we defined the IoC component namespaces.
  //
  // We also gain flexibility in testing. Our tests can create their own
  // namespace for 'controllers/' and create their own implementation of
  // 'fooController' such that we can more easily test the 'routes' component.
  handler: ioc.create('controllers/fooController')
});

// This is a standard Node.js export. When this module is loaded by Electrolyte,
// Electrolyte will detect that it is a literal object and behave accordingly.
exports = module.exports = routes;

// This is an Electrolyte annotation. It, obviously, indicates to Electrolyte
// that this 'routes' component is a singleton object and should only be
// instantiated once.
//
// Note: Electrolyte annotations should be defined after your `module.exports`.
// Otherwise, the annotations will be overwritten and Electrolyte won't have
// access to them.
//
// You should now read the '../controllers/fooController.js' file.
exports['@singleton'] = true;