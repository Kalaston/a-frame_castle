AFRAME.registerComponent('teleport-refresh', {
    init: function() {
        // Back to the previous location after use a portal
        var repositionateCamera = false;
        var homePageName = '/index.html';
        var previousZone = localStorage.getItem('previousZone');
        var homeLocation = localStorage.getItem('homeLocation');
        var portalLocation = localStorage.getItem('portalLocation');

        if(this.el.sceneEl.dataset.isHome) {
            if(!previousZone || !homeLocation || !portalLocation) {
                repositionateCamera = false;
            } else {
                repositionateCamera = !(previousZone === window.location.href || previousZone === window.location.href + '/' + homePageName);
            }

            console.log(repositionateCamera);
            if(repositionateCamera) {
                var cameraRig = document.getElementById('cameraRig');
                var homePosition = JSON.parse(homeLocation);
                var portalPosition = JSON.parse(portalLocation);

                cameraRig.object3D.position.set(homePosition.x, portalPosition.y - 1.6, homePosition.z);
            }
        }

        // Toggle extra teleport controls
        var noHandControl = document.getElementById('no-hand');
        var leftHand = document.getElementById('left-hand');
        var rightHand = document.getElementById('right-hand');

        document.querySelector('a-scene').addEventListener('enter-vr', function () {
            noHandControl.object3D.visible = false;
            leftHand.object3D.visible = true;
            rightHand.object3D.visible = true;
        });
        document.querySelector('a-scene').addEventListener('exit-vr', function () {
            noHandControl.object3D.visible = true;
            leftHand.object3D.visible = false;
            rightHand.object3D.visible = false;
        });
    },
    play: function () {
        var i;
        var teleportEntities;

        setTimeout(() => {
            teleportEntities = document.querySelectorAll('a-entity[teleport-controls]');
            for (i = 0; i < teleportEntities.length; i++) {
                teleportEntities[i].components['teleport-controls'].refreshMeshes();
            }
        }, 250);
    }
});
