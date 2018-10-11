//Community Components
require('aframe');
require('aframe-physics-system');
require('aframe-physics-extras');
require('aframe-haptics-component');
require('super-hands');
require('aframe-teleport-controls');
require('aframe-ui-widgets');
require('aframe-event-set-component');
require('aframe-simple-sun-sky');

//User Components
//require('./components/change-sky.js');
//require('./components/change-mountains.js');
//require('./components/change-fog.js');
//require('./components/phase-shift.js');
require('./components/touch-listener.js');
require('./components/link-controls.js');

window.addEventListener('DOMContentLoaded', () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./service-worker.js').then(registration => {
            console.log('SW registered: ', registration);
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    } else {
        console.log('Service workers are not supported.');
    }
});
