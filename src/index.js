// Community Components
require('aframe');
require('aframe-animation-component');
require('aframe-event-set-component');
require('aframe-layout-component');
require('aframe-simple-sun-sky');
require('aframe-look-at-component');
require('aframe-slice9-component');
require('aframe-teleport-controls');

// jQuery
window.$ = window.jQuery = require('jquery');

// Pacifico font
require('typeface-pacifico');

// Bootstrap
window.Popper = require('popper.js').default; // pay attention to "default"
require('bootstrap/dist/js/bootstrap');

// Yolistli Components
require('./utils');
function requireAll (req) { req.keys().forEach(req); }
requireAll(require.context('./components/', true, /\.js$/));

// Handlebars
require('./lib/yo-handlebars');

// Intro
require('./lib/intro');
