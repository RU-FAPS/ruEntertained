/* Variable declarations */
let scene, camera, raycaster, mouse;

/* Scene setup */
scene = new THREE.Scene();

/* Camera Setup */
camera = new THREE.PerspectiveCamera(
	45,                                         // FOV
	window.innerWidth / window.innerHeight,     // Aspect Ratio
	.1,                                          // Near plane
	1000                                        // Far Plane
);

/* Add Raycaster for mouse or touch interaction */
raycaster = new THREE.Raycaster();
mouse = new THREE.Vector2();

init();

function init() {
	var clock = new THREE.Clock();
	var stats = new Stats();
	var gui = new dat.GUI();
	document.body.appendChild(stats.dom);

	camera.position.z = 5;
	camera.lookAt(new THREE.Vector3(0, 0, 0));

/* Lighting setup */
	var aLight = getAmbientLight(5);
    var dLight = getDirectionalLight(10);
	dLight.position.set(13, 10, 10);

/* Texture Setup */
	var loader = new THREE.TextureLoader();
	var imgPath = './Assets/Images/';

/* Environment Map */
	getEnvMaps(imgPath);

/* Rotating LOGO in the lock screen */
	// Meshes
	var box1Material = getMaterial('basic');
	var box1 = getBox([1, 1, 1], [0, 0, 0], [0, 0, 0], box1Material);
	box1.name = 'box1';
	//box1Material.roughness = 0.1;
	//box1Material.metalness = 0.25;
	scene.add(box1);

	// Texture Materials
	box1Material.map = loader.load(imgPath + 'logo1.png');
	var texture1 = box1Material.map;
	texture1.wrapS = THREE.RepeatWrapping;
	texture1.wrapT = THREE.RepeatWrapping;
	texture1.repeat.set(1, 1);

/* Login */
	var box2Material = getMaterial('basic');
	var box2 = getBox([1, 0.45, 0.1], [0, -1, 0], [-deg2rad(5), 0, 0], box2Material);
	scene.add(box2);
	box2.name = 'box2';

	// Texture Materials
	box2Material.map = loader.load(imgPath + 'login.png');
	var texture2 = box2Material.map;
	texture2.wrapS = THREE.RepeatWrapping;
	texture2.wrapT = THREE.RepeatWrapping;
	texture2.repeat.set(1, 1);

	/* Canvas contents */
	var canvas1 = getPlaneCanvas([-2, 1], 2, 'test');
	var canvas2 = getPlaneCanvas([2, 1], 2);

/* Set up the renderer */
    var renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.setSize(window.innerWidth, window.innerHeight, false);
	document.getElementById('webgl').appendChild(renderer.domElement);

	/* Interaction */
	var controls = new THREE.OrbitControls(camera, renderer.domElement);

	window.addEventListener('onclick', onMouseMove);

	update(renderer, clock, stats, controls);

    return scene;
}

function getPlaneCanvas(position2dVector, size2dSquareValue, content2display) {
	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	canvas.width = 256;
	canvas.height = 256;
	dispFunction(ctx, content2display);
	const texture = new THREE.CanvasTexture(canvas);
	var canvasMaterial = new THREE.MeshBasicMaterial({
		color: '#ff00ff',
		map: texture,
		side: THREE.DoubleSide
	});
	var canvasPlane = getPlane(size2dSquareValue, canvasMaterial);
	scene.add(canvasPlane);
	canvasPlane.position.x = position2dVector[0];
	canvasPlane.position.y = position2dVector[1];
	texture.name = 'canvasTexture';

	return canvasPlane;
}

function dispFunction(ctx, content) {
	var w = ctx.canvas.width;
	var h = ctx.canvas.height;
	switch (content){
		case 'test':
			testContent(ctx, w, h);
			break;
		default:
			helloWorld(ctx, w, h);
			break;
    }
}

function testContent(ctx, w, h) {
	singleLine(ctx, [
		0, 0,
		w, h
	], "#ff0000", 2);
	singleLine(ctx, [
		0, h,
		w, 0
	], "#ff0000", 2);
	textPrint("TEST", ctx, 15, [w / 2, h / 2], "#00ff00", "c");
}

function helloWorld(ctx, w, h) {
	textPrint("HELLO WORLD!", ctx, 15, [w / 2, h / 2], "#00ff00");
}

function getBox(size, position, rotation, material) {
	var geometry = new THREE.BoxGeometry(size[0], size[1], size[2]);
	var mesh = new THREE.Mesh(
		geometry,
		material
	);
	mesh.castShadow = true;

	mesh.position.set(position[0], position[1], position[2]);
	mesh.rotation.set(rotation[0], rotation[1], rotation[2]);

	return mesh;
}

function getBoxGrid(amount, separationMultiplier) {
	var group = new THREE.Group();

	for (var i = 0; i < amount; i++) {
		var obj = getBox(1, 3, 1);
		obj.position.x = i * separationMultiplier;
		obj.position.y = obj.geometry.parameters.height / 2;
		group.add(obj);
		for (var j = 1; j < amount; j++) {
			var obj = getBox(1, 3, 1);
			obj.position.x = i * separationMultiplier;
			obj.position.y = obj.geometry.parameters.height / 2;
			obj.position.z = j * separationMultiplier;
			group.add(obj);
		}
	}

	group.position.x = -(separationMultiplier * (amount - 1)) / 2;
	group.position.z = -(separationMultiplier * (amount - 1)) / 2;

	return group;
}

function getPlane(size, material) {
	var geometry = new THREE.PlaneGeometry(size, size);
	var mesh = new THREE.Mesh(geometry,	material);

	return mesh;
}

function getSphere(size) {
	var geometry = new THREE.SphereGeometry(size, 24, 24);
	var material = getMaterial('standard');
	var mesh = new THREE.Mesh(
		geometry,
		material
	);

	return mesh;
}

function getAmbientLight(intensity) {
	var light = new THREE.AmbientLight(0xffffff, intensity);
	scene.add(light);

	return light;
}

function getPointLight(intensity) {
	var light = new THREE.PointLight(0xffffff, intensity);
	light.castShadow = true;
	scene.add(light);

	return light;
}

function getSpotLight(intensity) {
	var light = new THREE.SpotLight(0xffffff, intensity);
	light.castShadow = true;
	scene.add(light);

	light.shadow.bias = 0.001;
	light.shadow.mapSize.width = 2048;
	light.shadow.mapSize.height = 2048;

	return light;
}

function getDirectionalLight(intensity) {
	var light = new THREE.DirectionalLight(0xffffff, intensity);
	light.castShadow = true;
	scene.add(light);

	light.shadow.camera.left = -40;
	light.shadow.camera.bottom = -40;
	light.shadow.camera.right = 40;
	light.shadow.camera.top = 40;

	light.shadow.mapSize.width = 4096;
	light.shadow.mapSize.height = 4096;

	return light;
}

function getMaterial(type, color) {
	var selectedMaterial;
	var materialOptions = {
		color: color === undefined ? 'rgb(255,255,255)' : color,
	};
	switch (type) {
		case 'basic':
			selectedMaterial = new THREE.MeshBasicMaterial(materialOptions);
			break;
		case 'standard':
			selectedMaterial = new THREE.MeshStandardMaterial(materialOptions);
			break;
		case 'phong':
			selectedMaterial = new THREE.MeshPhongMaterial(materialOptions);
			break;
		case 'lambert':
			selectedMaterial = new THREE.MeshLambertMaterial(materialOptions);
			break;
		default:
			selectedMaterial = new THREE.MeshBasicMaterial(materialOptions);
			break;
	}
	return selectedMaterial;
}

function getEnvMaps(path) {
	var format = '.jpg';
	var urls = [
		path + 'px' + format, path + 'nx' + format, 
		path + 'py' + format, path + 'ny' + format, 
		path + 'pz' + format, path + 'nz' + format, 
    ];
	var reflectionCube = new THREE.CubeTextureLoader().load(urls);
	reflectionCube.format = THREE.RGBFormat;
	scene.background = reflectionCube;
}

function onMouseMove(event) {	
	event.preventDefault();
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
	raycaster.setFromCamera(mouse, camera);

	var intersects = raycaster.intersectObjects(objects);

	if (intersects.length > 0) {

		intersects[0].object.callback();

	}

	console.log("Clicked!");
}

function clickEvents() {
	var box2 = scene.getObjectByName('box2');
	
}

function resize() {
	
}

function update(renderer, clock, stats, controls) {
	
	stats.update();
	controls.update();

	var canvasTexture = scene.getObjectByName('canvasTexture');

	var box1 = scene.getObjectByName('box1');
	box1.rotation.y += 0.01;

	raycaster.setFromCamera(mouse, camera);
	const intersects = raycaster.intersectObjects(scene.children);
	for (let i = 0; i < intersects.length; i++) {
		intersects[i].object.material.color.set(0xffffff);
	}

	window.addEventListener('resize', resize);
    renderer.render(scene, camera);
	requestAnimationFrame(function () {
		update(renderer, clock, stats, controls);
	});
}