module.exports = function SoundPool (src, volume, size) {
    var currSound = 0;
    var i;
    var pool = [];
    var sound;

    if (typeof src === 'undefined') { return; }

    var fileExt = src.split('.').pop();
    for (i = 0; i < size; i++) {
        sound = new Audio(src);
        sound.volume = volume;
        sound.type = 'audio/' + fileExt;
        sound.load();
        pool.push(sound);
    }

    return {
        play: function () {
            if (pool[currSound].currentTime === 0 || pool[currSound].ended) {
                var promise = pool[currSound].play();

                if (promise !== undefined) {
                    promise.catch(error => {
                        // Auto-play was prevented
                        // Show a UI element to let the user manually start playback
                        console.log(error);
                    }).then(() => {
                        // Auto-play started
                    });
                }
            }
            currSound = (currSound + 1) % size;
        }
    };
};
