import { Stats } from 'Library/stats.module.js';

class App {
    constructor() {
        this.init();
        this.update();
        this.animate();
    }

    init() {
        var container = document.createElement("div");
        document.body.appendChild(container);

        var scene = new THREE.Scene();
        scene.background = new THREE.Color("#808080");

        var camera = new THREE.PerspectiveCamera(75,
            window.innerWidth / window.innerHeight,
            0.1, 1000
        );

        var renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.outputEncoding = new THREE.sRGBEncoding;
        render.shadowMap.enabled = true;
        document.body.appendChild(renderer.domElement);
    }
    
    update()    {
        
    }

    animate() {
        requestAnimationFrame(this.animate);
        renderer.render(scene, camera);
    }
