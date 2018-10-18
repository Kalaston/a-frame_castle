//Community Components
require('aframe');
require('aframe-animation-component');
require('aframe-event-set-component');
require('aframe-layout-component');
require('aframe-simple-sun-sky');
require('aframe-look-at-component');
require('aframe-slice9-component');
require('aframe-teleport-controls');

// User Components
require('./utils');
function requireAll (req) { req.keys().forEach(req); }
requireAll(require.context('./components/', true, /\.js$/));

// Handlebars
require('./yo-handlebars');
