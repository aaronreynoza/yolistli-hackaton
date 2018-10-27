module.exports = function (property, options) {
    const hash = options.hash;
    const portal = {
        id: hash.id,
        name: hash.name,
        href: hash.href,
        img: hash.img,
        position: hash.position
    };

    return `<a-entity class="portal"
                      id="${portal.id}"
                      mixin="portal hoverAnimation"
                      yo-portal="href: ${portal.href}"
                      material="pano: ${portal.img}"
                      position="${portal.position}">
                <a-entity class="portalEffect1"
                          obj-model="obj: /assets/models/portal/portal.obj"
                          additive
                          material="color: #03c1e2; opacity: 0.6; depthWrite: false; shader: flat; transparent: true; src: #portalImg"
                          position="0 0 -0.017"
                          rotation="0 90 90"
                          scale="3.116 3.116 3.116"
                          animation="property: object3D.rotation.x; from: 0; to: 6.283185; dur: 10000; loop: true; easing: linear"></a-entity>
                <a-entity class="portalEffect2"
                          obj-model="obj: /assets/models/portal/portal.obj"
                          additive
                          material="color: #f37132; opacity: 0.6; depthWrite: false; shader: flat; transparent: true; src: #portalImg"
                          position="0 0 -0.058"
                          rotation="0 90 90"
                          scale="3.078 0.969 3.078"
                          animation="property: object3D.rotation.x; from: 0; to: 6.283185; dur: 15000; loop: true; easing: linear"></a-entity>
                <a-entity class="portalText"
                          mixin="slice"
                          slice9="color:  #111; height: 0.3; width: 2.5; opacity: 0.7"
                          text="color: #4ef580; align: center; value: ${portal.name}; side: double; width: 4; zOffset: 0.01"
                          position="0 1.3 0"></a-entity>
            </a-entity>`;
};
