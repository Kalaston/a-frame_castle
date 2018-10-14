/**
 * Allow teleport into portal.
 * Update line and hit entity colors.
 */
var AFRAME = require('aframe');
AFRAME.registerComponent('teleport-listener', {
    dependencies: ['teleport-controls'],

    init: function () {
        var el = this.el;
        var hitEntity;
        var intersections;

        this.currentIntersection = null;
        intersections = el.components['teleport-controls'].intersections;

        // Listen to teleported for blink effect and play sound.
        this.el.addEventListener('teleported', () => {
            if (!intersections.length) { return; }

            if (intersections[0].object.el.classList.contains('portal')) {
                intersections[0].object.el.emit('click');
            }
        });

        // Apply effects to hitEntity.
        hitEntity = this.hitEntity = el.components['teleport-controls'].hitEntity;
        hitEntity.setAttribute('material', 'emissiveIntensity', 0.9);
        hitEntity.setAttribute('material', 'emissiveColor', '#ff9f2b');
        hitEntity.setAttribute('animation__scale', {
            property: 'scale',
            from: '1 1 1',
            to: '2 2 2',
            easing: 'easeInOutCubic',
            dir: 'alternate',
            dur: 600,
            loop: true
        });

        // Apply effects to teleportRay.
        this.teleportEntity = el.components['teleport-controls'].teleportEntity;
        this.teleportEntity.getObject3D('mesh').material.opacity = 0.5;
    },

    tick: function () {
        var el = this.el;
        var intersection;
        var intersectingPortal;

        if (!el.components['teleport-controls'].active) { return; }

        intersection = el.components['teleport-controls'].intersections[0];

        if (!intersection) {
            if (this.currentIntersection) { this.currentIntersection.emit('mouseleave'); }
            this.currentIntersection = null;
            return;
        }

        if (intersection.object.el === this.currentIntersection) { return; }

        intersectingPortal = intersection.object.el.classList.contains('portal');
        this.hitEntity.children[0].object3D.visible = !intersectingPortal;
        this.hitEntity.children[1].object3D.visible = !intersectingPortal;
        this.teleportEntity.getObject3D('mesh').visible = intersectingPortal;

        if (this.currentIntersection) { this.currentIntersection.emit('mouseleave'); }
        intersection.object.el.emit('mouseenter');
        this.currentIntersection = intersection.object.el;
    }
});
