function init() {
	var scene = new THREE.Scene();
	var clock = new THREE.Clock();
	var stats = new THREE.Stats();
	document.body.appendChild(stats.dom);

    var camera = new THREE.PerspectiveCamera(
        45,                                         // FOV
        window.innerWidth / window.innerHeight,     // Aspect Ratio
        .1,                                          // Near plane
        1000                                        // Far Plane
    );

	camera.position.z = 5;
	camera.lookAt(new THREE.Vector3(0, 0, 0));

    // lighting
	getAmbientLight(1);
	var pLight = getPointLight(1);
	var pLightSphere = getSphere(0.1);
	pLight.add(pLightSphere);
    var dLight = getDirectionalLight(2);
    dLight.position.set(13, 10, 10);

    scene.add(getBox([1, 1, 1], [0, 0, 0], [deg2rad(2), deg2rad(5), 0], 'rgb(255, 255, 0)'));

    var renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor('rgb(120, 120, 120)');
    document.getElementById('webgl').appendChild(renderer.domElement);

    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    update(scene, camera, renderer, controls, clock, stats);

    return scene;
}

function getBox(size, position, rotation, color) {
	var geometry = new THREE.BoxGeometry(size[0], size[1], size[2]);
	var material = new THREE.MeshStandardMaterial();
	var mesh = new THREE.Mesh(
		geometry,
		material
	);
	//mesh.castShadow = true;

	mesh.position.set(position[0], position[1], position[2]);
	mesh.position.set(rotation[0], rotation[1], rotation[2]);

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

function getPlane(size) {
	var geometry = new THREE.PlaneGeometry(size, size);
	var material = new THREE.MeshPhongMaterial({
		color: 'rgb(120, 120, 120)',
		side: THREE.DoubleSide
	});
	var mesh = new THREE.Mesh(
		geometry,
		material
	);
	mesh.receiveShadow = true;

	return mesh;
}

function getSphere(size) {
	var geometry = new THREE.SphereGeometry(size, 24, 24);
	var material = new THREE.MeshBasicMaterial({
		color: 'rgb(255, 255, 255)'
	});
	var mesh = new THREE.Mesh(
		geometry,
		material
	);

	return mesh;
}

function getAmbientLight(intensity) {
	var light = new THREE.AmbientLight(0xffffff, intensity);
	return light;
}

function getPointLight(intensity) {
	var light = new THREE.PointLight(0xffffff, intensity);
	light.castShadow = true;

	return light;
}

function getSpotLight(intensity) {
	var light = new THREE.SpotLight(0xffffff, intensity);
	light.castShadow = true;

	light.shadow.bias = 0.001;
	light.shadow.mapSize.width = 2048;
	light.shadow.mapSize.height = 2048;

	return light;
}

function getDirectionalLight(intensity) {
	var light = new THREE.DirectionalLight(0xffffff, intensity);
	light.castShadow = true;

	light.shadow.camera.left = -40;
	light.shadow.camera.bottom = -40;
	light.shadow.camera.right = 40;
	light.shadow.camera.top = 40;

	light.shadow.mapSize.width = 4096;
	light.shadow.mapSize.height = 4096;

	return light;
}

function update(scene, camera, renderer, controls, clock, stats) {
	controls.update();
	stats.update();

    renderer.render(scene, camera);
    requestAnimationFrame(function () {
        update(scene, camera, renderer, controls, clock, stats);
    })
}

var scene = init();