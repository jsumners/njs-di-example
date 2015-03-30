'use strict';

// This module shows how to create a databse connection component.
// If this module is required without Electrolyte, you'd simply invoke
// the function it returns (with a settings object parameter):
//
//   var db = require('./database')({});
//
// This would give you a connection pool to the database specified in the
// settings object. You'd be responsible for exposing that connection pool
// to your modules in such a fashion that it doesn't get created multiple
// times.
//
// But with Electrolyte, we get that management for free. We simply have
// to pass it into a module with Electrolyte's '@require' annotation, or
// use the container to get an instance (i.e. `ioc.create()`).
//
// For information on the database abstraction layer used (node-any-db)
// see https://github.com/grncdr/node-any-db
exports = module.exports = function databaseComponent(settings) {
  var anyDB = require('any-db');

  return anyDB.createPool(settings.db.url, settings.db.poolOptions);
};

exports['@require'] = [ 'config/settings' ];
exports['@literal'] = false;
exports['@singleton'] = true;