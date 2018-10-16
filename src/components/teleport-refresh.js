AFRAME.registerComponent('teleport-refresh', {
    init: function() {
        var previousZone = localStorage.getItem('previousZone');
        var homeLocation = localStorage.getItem('homeLocation');
        var portalLocation = localStorage.getItem('portalLocation');

        if (!previousZone || previousZone === window.location.href || previousZone === window.location.href + '/index.html') {
            if (this.el.sceneEl.dataset.isHome && homeLocation !== null) {
                var cameraRig = document.getElementById('cameraRig');
                var homePosition = JSON.parse(homeLocation);
                var portalPosition = JSON.parse(portalLocation);

                cameraRig.object3D.position.set(homePosition.x, portalPosition.y - 1.6, homePosition.z);
            }
        }
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
