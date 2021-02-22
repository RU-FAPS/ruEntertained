const canvas = document.getElementById("renderCanvas"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

// Add your code here matching the playground format
var createScene = function () {

    const scene = new BABYLON.Scene(engine);

    BABYLON.SceneLoader.ImportMeshAsync("", "https://assets.babylonjs.com/meshes/", "box.babylon");

    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

    return scene;
};

//var createScene = async function () {
//     wait for the polyfill to kick in
//    await xrPolyfillPromise;
//    console.log(navigator.xr); // should be there!
//    console.log(await BABYLON.WebXRSessionManager.IsSessionSupportedAsync("immersive-vr")); // should be true
//     create your scene
//    var scene = new BABYLON.Scene(engine);
//    var camera = new BABYLON.DeviceOrientationCamera("DevOr_camera", new BABYLON.Vector3(-30, -30, -30), scene);
//    camera.setTarget(BABYLON.Vector3.Zero());
//    camera.attachControl(canvas, true);
//    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 0, 0), scene);
//    scale = 100;
//     initialize XR
//    var xr = await scene.createDefaultXRExperienceAsync();
//    return scene;
//};

const scene = createScene(); //Call the createScene function

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {

    scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
    engine.resize();
});