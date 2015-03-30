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

settings.db = {};
settings.db.url = {
  // See https://github.com/grncdr/parse-db-url#api for format
  adapter: 'sqlite3',
  database: '/tmp/example.sqlite3'
};
settings.db.poolOptions = {
  // See https://github.com/grncdr/node-any-db-pool#api for options
  min: 1,
  max: 20
};

exports = module.exports = settings;