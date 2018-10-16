AFRAME.registerComponent('teleport-extras', {
    init: function () {
        var targetEl = this.el;

        function isNoHandVisible() {
            return targetEl.getAttribute('visible');
        }

        //Create the touchstart event
        document.querySelector('a-scene').addEventListener('touchstart', function () {
            if(isNoHandVisible) { targetEl.emit('startteleport'); }
        });

        document.querySelector('a-scene').addEventListener('mousedown', function () {
            if(isNoHandVisible) { targetEl.emit('startteleport'); }
        });

        document.body.addEventListener('keydown', function (e) {
            if (e.keyCode === 32) {
                if(isNoHandVisible) { targetEl.emit('startteleport'); }
            }
        });

        //Create the touchend event
        document.querySelector('a-scene').addEventListener('touchend', function () {
            if(isNoHandVisible) { targetEl.emit('endteleport'); }
        });

        document.querySelector('a-scene').addEventListener('mouseup', function () {
            if(isNoHandVisible) { targetEl.emit('endteleport'); }
        });

        document.body.addEventListener('keyup', function (e) {
            if (e.keyCode === 32) {
                if(isNoHandVisible) { targetEl.emit('endteleport'); }
            }
        })
    }
});
