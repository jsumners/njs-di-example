'use strict';

// Our controller will use this local module scoped variable
// to access the data our web service will return. This object will be
// created by an IoC dependency injected component.
var foo;

// This function will ultimately be returned as the export of this module.
// It is what Hapi will use to process requests for the '/foo' end point.
function fooController(request, reply) {
  // Hapi will take care of serializing the `foo` object for us and send
  // the result as the reply.
  reply(foo);
}

// We've already seen how we can use Node.js's module caching to retrieve/create
// instances of components explicitly. Here we see how we can use Electrolyte's
// dependency injection to implicitly load components.
//
// When Electrolyte encounters a module that merely exports a function, and
// doesn't have a '@literal' annotation, then it recognizes that function
// as a factory function. Electrolyte will invoke this function to create an
// instance of the desired module, in this case 'fooController', and return
// the result. The parameters of the factory function map 1-to-1 to
// components listed in a '@require' annotation (discussed shortly).
exports = module.exports = function(Bar, Foo) {
  // Foo is a reference to the component defined by '../models/Foo.js'
  // Bar is a reference to the component defined by '../models/Bar.js'

  // Here we are defining the data that fooController will return.
  // Normally this would probably be done in a service module or elsewhere.
  // But this suffices for our demonstration.
  foo = new Foo();
  var bar1 = new Bar();
  var bar2 = new Bar('What is the date?', (new Date()).getDate());
  foo.addRow(bar1);
  foo.addRow(bar2);

  return fooController;
};

// This is an Electrolyte annotation that defines the components the
// 'fooController' module dependes upon. Each component in the array will
// be passed to the factory method according to their position in the array.
// Thus, the first parameter of the factory method will be a reference to
// the `Bar` model component and the second parameter a reference to the
// `Foo` model component.
exports['@require'] = [ 'models/Bar', 'models/Foo' ];

// The Electrolyte annotation to indicate that the 'fooController' component
// should only be instantiated once.
exports['@singleton'] = true;


// You should now have a comfortable understanding of using the Electrolyte
// Inversion of Control container for Dependency Injection.
//
// The '../models/Foo.js' and '../models/Bar.js' modules show the usage
// Electrolyte's '@literal' annotation, but otherwise demonstrate nothing
// out of the ordinary.