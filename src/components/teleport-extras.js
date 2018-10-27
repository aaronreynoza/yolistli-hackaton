AFRAME.registerComponent('teleport-extras', {
    init: function () {
        var targetEl = this.el;
        var executeAction = false;

        function isActionable() {
            return localStorage.getItem('vrModeActive') != 'true';
        }

        //Create the touchstart event
        document.querySelector('a-scene').addEventListener('touchstart', function () {
            executeAction = isActionable();
            if(executeAction) { targetEl.emit('startteleport'); }
        });

        document.querySelector('a-scene').addEventListener('mousedown', function () {
            executeAction = isActionable();
            if(executeAction) { targetEl.emit('startteleport'); }
        });

        document.body.addEventListener('keydown', function (e) {
            if (e.keyCode === 32) {
                executeAction = isActionable();
                if(executeAction) { targetEl.emit('startteleport'); }
            }
        });

        //Create the touchend event
        document.querySelector('a-scene').addEventListener('touchend', function () {
            executeAction = isActionable();
            if(executeAction) { targetEl.emit('endteleport'); }
        });

        document.querySelector('a-scene').addEventListener('mouseup', function () {
            executeAction = isActionable();
            if(executeAction) { targetEl.emit('endteleport'); }
        });

        document.body.addEventListener('keyup', function (e) {
            if (e.keyCode === 32) {
                executeAction = isActionable();
                if(executeAction) { targetEl.emit('endteleport'); }
            }
        })
    }
});
