window.utils = {};

/**
 * Helper to get center point of face.
 */
window.utils.getFaceCenter = (function () {
    return function (mesh, face, targetVec3) {
        targetVec3 = targetVec3 || new THREE.Vector3();
        return targetVec3
            .copy(mesh.geometry.vertices[face.a])
            .add(mesh.geometry.vertices[face.b])
            .add(mesh.geometry.vertices[face.c])
            .divideScalar(3);
    };
})();

window.utils.assetPath = function (asset) {
    if(typeof AFRAME.scenes[0] !== 'undefined') {
        return AFRAME.scenes[0].dataset.isHome === 'true' ? asset : `../${asset}`;
    }
};
