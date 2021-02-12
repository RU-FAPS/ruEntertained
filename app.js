import * as THREE from './Library/THREE/three.module.js';
import { OrbitControls } from './Library/THREE/jsm/OrbitControls.js';
import { GLTFLoader } from './Library/THREE/jsm/GLTFLoader.js';
import { FBXLoader } from './Library/THREE/jsm/FBXLoader.js';
// import { VRButton } from './Library/THREE/jsm/VRButton.js';
// import { ARButton } from './Library/THREE/jsm/ARButton.js';
// import { XRControllerModelFactory } from './Library/THREE/jsm/XRControllerModelFactory.js';
import { BoxLineGeometry } from './Library/THREE/jsm/BoxLineGeometry.js';
import { Stats } from './Library/stats.module.js';
import { LoadingBar } from './Library/LoadingBar.js';
import { vector3ToString } from './Library/DebugUtils.js';
import { CanvasUI } from './Library/CanvasUI.js';
import { CanvasKeyboard } from './Library/CanvasKeyboard.js';
// import { XRWorldMeshes } from './Library/XRWorldMeshes.js';
// import { TeleportMesh } from './Library/TeleportMesh.js';
import { Player } from './Library/Player.js';
import { RGBELoader } from './Library/THREE/jsm/RGBELoader.js';
import { Interactable } from './Library/Interactable.js';
// import {
//     Constants as MotionControllerConstants,
//     fetchProfile,
//     MotionController
// } from './Library/THREE/jsm/motion-controllers.module.js';

class App {
    constructor() {
        var container = document.createElement("div");
        document.body.appendChild(container);
        
        var scene = new THREE.Scene();
        scene.background = new THREE.Color("#808080");

        var camera = new THREE.PerspectiveCamera(75,
            window.innerWidth / window.innerHeight,
            0.1, 1000
        );
        camera.position.set(0, 0, 4);

        var renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.outputEncoding = new THREE.sRGBEncoding;
        render.shadowMap.enabled = true;
        container.appendChild(renderer.domElement);
        
        this.init();
        this.update();
        this.animate();
        
        window.addEventListener("resize", this.resize.bind(this));
    }

    init() {

    }
    
    update()    {
        
    }
    
    resize()    {
        
    }

    animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
}

export {App};
