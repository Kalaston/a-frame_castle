//Community Components
require('aframe');
require('aframe-animation-component');
require('aframe-event-set-component');
require('aframe-layout-component');
require('aframe-simple-sun-sky');
require('aframe-look-at-component');
require('aframe-slice9-component');
require('aframe-teleport-controls');

//User Components
require('./utils');
function requireAll (req) { req.keys().forEach(req); }
requireAll(require.context('./components/', true, /\.js$/));

window.addEventListener('DOMContentLoaded', () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js').then(registration => {
            console.log('SW registered: ', registration);
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    } else {
        console.log('Service workers are not supported.');
    }
});

