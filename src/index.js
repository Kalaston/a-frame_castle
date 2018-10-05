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

document.onreadystatechange = function(){
    document.querySelector('a-assets').addEventListener('loaded', function () {
        console.log("OK LOADED");
    });
};
