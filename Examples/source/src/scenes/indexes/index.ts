const examples = [
    "example1-lvl0-hello-world",
    "example2-lvl0-hello-image",
    "example3-lvl0-hello-sprite",
    "example4-lvl0-hello-tilesprite",
    "example5-lvl0-hello-group",
    "example6-lvl0-hello-container",
    "example7-lvl1-hello-tween-1-simple",
    "example7-lvl1-hello-tween-2-advanced",
    "example8-lvl1-hello-sound",
    "example9-lvl1-hello-time",
    "example9-lvl1-hello-timeline",
    "example10-lvl2-hello-scene-communication-1",
    "example11-lvl2-hello-scene-communication-2",
    "example12-lvl2-hello-scene-communication-3",
    "example13-lvl3-hello-camera",
    "example14-lvl3-hello-camera-follow",
    "example15-lvl3-hello-camera-pan",
    "example16-lvl3-hello-camera-zoom",
    "example17-lvl3-hello-camera-flash",
    "example18-lvl3-hello-camera-shake",
    "example19-lvl3-hello-camera-fade",
    "example20-lvl4-hello-physics-hello-body",
    "example21-lvl4-hello-physics-body-size-circle",
    "example22-lvl4-hello-physics-body-acceleration",
    "example23-lvl4-hello-physics-body-velocity",
    "example24-lvl4-hello-physics-body-collideworldbounds-bounce",
    "example25-lvl4-hello-physics-accelerateTo",
    "example26-lvl4-hello-physics-moveTo",
    "example27-lvl4-hello-physics-closest-furthest",
    "example28-lvl4-hello-physics-angular-velocity",
    "example29-lvl4-hello-physics-collide-1",
    "example29-lvl4-hello-physics-collide-2",
    "example30-lvl4-hello-physics-overlap",
    "example31-lvl5-hello-custom-player",
    "example32-lvl5-hello-custom-bonus",
    "example33-lvl5-hello-custom-enemy",
    "example34-lvl5-hello-custom-weapon",
    "example35-lvl6-hello-map-4-direzioni",
    "example36-lvl6-hello-map-platform",
    "example37-lvl6-virtual-joystick",
];


let _ul = document.getElementById("example-list");

window.addEventListener("load", () => {

    examples.forEach((example) => {
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.href = `/${example}.html`;
        a.innerText = example;
        li.appendChild(a);
        _ul.appendChild(li);
    });

});
