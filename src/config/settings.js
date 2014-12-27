'use strict';

// Notice that this module contains no Electrolyte specific annotations
// or conventions. It is a vanilla Node.js module. Electrolyte has no problem
// using this module as a dependency injection component, though.

var settings = {};

settings.server = {};
settings.server.connection = {
  address: '127.0.0.1',
  port: 8080
};

exports = module.exports = settings;