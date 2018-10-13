var AFRAME = require('aframe');

var previousZone = localStorage.getItem('previousZone');
var visitedZones = JSON.parse(localStorage.getItem('visitedZones') || '{}');

AFRAME.registerComponent('yolisyli-portal', {
    schema: {
        color: {type: 'string'},
        href: {type: 'string'},
        isBackPortal: {default: false},
        isHomePortal: {default: false}
    },

    init: function () {
        var el = this.el;

        // Hide back portal if there is no back to go to.
        if (this.data.isBackPortal) {
            if (!previousZone || previousZone === window.location.href) {
                el.object3D.visible = false;
                return;
            }
        }

        // Navigate.
        el.addEventListener('click', () => {
            setTimeout(() => {
                if (this.data.isBackPortal) {
                    window.location.href = localStorage.getItem('previousZone');
                } else {
                    visitedZones[this.data.href] = true;
                    localStorage.setItem('previousZone', window.location.href);
                    localStorage.setItem('visitedZones', JSON.stringify(visitedZones));
                    window.location.href = this.data.href;
                }
            }, 500);
        });

        el.addEventListener('mouseenter', () => {
            this.setColor('#FFF');
        });

        el.addEventListener('mouseleave', () => {
            this.setColor(this.originalColor);
            setTimeout(() => {
                el.object3D.scale.set(1, 1, 1);
            });
        });

        this.originalColor = '#999';
        if (this.data.isBackPortal) {
            this.originalColor = '#6688cc';
        } else if (this.data.isHomePortal) {
            this.originalColor = '#33aa33';
        } else if (localStorage.getItem('waybackmachine') === 'true' &&
            visitedZones[this.data.href] === true) {
            // Change border color if visited already.
            this.originalColor = '#AF55AF';
        }

        this.setColor(this.originalColor);
    },

    update: function () {
        if (this.data.color) { this.originalColor = this.data.color; }
    },

    setColor: function (color) {
        var el = this.el;
        el.querySelector('.portalEffect1').setAttribute('material', 'color', color);
        el.querySelector('.portalText').setAttribute('text', 'color', color);

        el.setAttribute('animation__mouseenter', 'from', color);
        el.setAttribute('animation__mouseleave', 'to', color);
    }
});

AFRAME.registerShader('yolistliPortal', {
    schema: {
        backgroundColor: {default: 'red', type: 'color', is: 'uniform'},
        isGrayscale: {type: 'int', is: 'uniform', default: 0.0},
        pano: {type: 'map', is: 'uniform'},
        time: {type: 'time', is: 'uniform'}
    },

    vertexShader: require('../assets/shaders/oasisPortalVertex.glsl'),
    fragmentShader: require('../assets/shaders/oasisPortalFragment.glsl')
});
