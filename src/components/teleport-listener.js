var AFRAME = require('aframe');
AFRAME.registerComponent('teleport-listener', {
    dependencies: ['teleport-controls'],

    init: function () {
        var el = this.el;
        var hitEntity;
        var intersections;
        var soundPool;
        var teleportEntity;

        this.currentIntersection = null;
        intersections = el.components['teleport-controls'].intersections;
    }
});
