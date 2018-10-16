AFRAME.registerComponent('teleport-extras', {
    init: function () {
        var targetEl = this.el;
        var isExtraControllerVisible = true;

        function isNoHandVisible() {
            return document.getElementById('no-hand').getAttribute('visible');
        }

        //Create the touchstart event
        document.querySelector('a-scene').addEventListener('touchstart', function () {
            isExtraControllerVisible = isNoHandVisible();
            if(isExtraControllerVisible) { targetEl.emit('startteleport'); console.log('VISIBLE'); console.log(isExtraControllerVisible) } else { console.log('NO VISIBLE') }
        });

        document.querySelector('a-scene').addEventListener('mousedown', function () {
            isExtraControllerVisible = isNoHandVisible();
            if(isExtraControllerVisible) { targetEl.emit('startteleport'); }
        });

        document.body.addEventListener('keydown', function (e) {
            if (e.keyCode === 32) {
                isExtraControllerVisible = isNoHandVisible();
                if(isExtraControllerVisible) { targetEl.emit('startteleport'); }
            }
        });

        //Create the touchend event
        document.querySelector('a-scene').addEventListener('touchend', function () {
            isExtraControllerVisible = isNoHandVisible();
            if(isExtraControllerVisible) { targetEl.emit('endteleport'); }
        });

        document.querySelector('a-scene').addEventListener('mouseup', function () {
            isExtraControllerVisible = isNoHandVisible();
            if(isExtraControllerVisible) { targetEl.emit('endteleport'); }
        });

        document.body.addEventListener('keyup', function (e) {
            if (e.keyCode === 32) {
                isExtraControllerVisible = isNoHandVisible();
                if(isExtraControllerVisible) { targetEl.emit('endteleport'); }
            }
        })
    }
});
