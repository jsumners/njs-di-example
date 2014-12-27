'use strict';

function Foo() {
  if (! (this instanceof Foo)) {
    return new Foo();
  }
}

Foo.prototype = {
  get count() {
    return this._rows.length;
  },

  get rows() {
    return this._rows;
  },

  _rows: []
};

Foo.prototype.addRow = function addRow(row) {
  if (Array.isArray(row)) {
    this.addRows(row);
  } else {
    this._rows.push(row);
  }
};

Foo.prototype.addRows = function addRows(rows) {
  var self = this;
  rows.forEach(function(row) {
    self._rows.push(row);
  });
};

Foo.prototype.toJSON = function toJSON() {
  return this.rows;
};

exports = module.exports = Foo;

// Electrolyte annotation that indicates the exported component
// is not a factory method.
exports['@literal'] = true;