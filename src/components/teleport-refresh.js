AFRAME.registerComponent('teleport-refresh', {
    init: function() {
        // Back to the previous location after use a portal
        var repositionateCamera = false;
        var lastPortal = localStorage.getItem('lastPortal');
        var homeLocation = localStorage.getItem('homeLocation');
        var portalLocation = localStorage.getItem('portalLocation');

        if(this.el.sceneEl.dataset.isHome) {
            if(!lastPortal || !homeLocation || !portalLocation) { repositionateCamera = false; }
            else { repositionateCamera = (lastPortal !== 'pyramid-portal'); }

            if(repositionateCamera) {
                var cameraRig = document.getElementById('cameraRig');
                var homePosition = JSON.parse(homeLocation);
                var portalPosition = JSON.parse(portalLocation);

                if (window.performance) {
                    var perfEntries = performance.getEntriesByType('navigation')[0];
                    if (perfEntries.type !== 'reload') {
                        cameraRig.object3D.position.set(homePosition.x, portalPosition.y - 1.6, homePosition.z);
                    }
                } else {
                    cameraRig.object3D.position.set(homePosition.x, portalPosition.y - 1.6, homePosition.z);
                }
            }
        }

        // Toggle extra teleport controls
        document.querySelector('a-scene').addEventListener('enter-vr', function () {
            if (AFRAME.utils.device.checkHeadsetConnected()) {
                localStorage.setItem('vrModeActive', 'true');
            }
        });
        document.querySelector('a-scene').addEventListener('exit-vr', function () {
            if (!AFRAME.utils.device.checkHeadsetConnected()) {
                localStorage.setItem('vrModeActive', 'false');
            }
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
