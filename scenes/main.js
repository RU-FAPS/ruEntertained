/* Variable declarations */
var scene, camera, raycaster, mouse;
let loginClickEvent = false;

/* Scene setup */
scene = new THREE.Scene();
scene.name = "scene";

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
	document.body.appendChild(stats.dom);

	camera.position.z = 5;
	camera.lookAt(new THREE.Vector3(0, 0, 0));

/* Lighting setup */
	//var aLight = getAmbientLight(5);
 //   var dLight = getDirectionalLight(10);
	//dLight.position.set(13, 10, 10);

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
	var loginBtn = document.getElementById('login');
	loginBtn.style.bottom = "0";
	loginBtn.style.margin = "auto";
	loginBtn.style.display = "block";
	loginBtn.style.width = "100%";
	loginBtn.style.height = "20%";
	loginBtn.style.fontSize = "300%";
	loginBtn.style.fontFamily = "cursive";
	loginBtn.style.color = "#fff";
	loginBtn.style.backgroundColor = "#e63800";
	//loginBtn.style.backgroundImage = "url('./Assets/Images/login.png')";
	//loginBtn.style.backgroundSize = "cover";

	/* Canvas contents */
	var canvas1 = getPlaneCanvas([-2, 1], 2, 'flight_info');
	var canvas2 = getPlaneCanvas([2, 1], 2, 'clock');
/*var canvas3 = getPlaneCanvas([0, 1.3], 1.3, 'live_flight');*/

/* Live 3D map */
	var earthMat = getMaterial('basic');
	var earth = getSphere(0.5, [0, 1.3, 0], earthMat);
	scene.add(earth);
	earth.name = 'earth';
	earthMat.map = loader.load(imgPath + 'earthmap1k.jpg');
	var earthMap = earthMat.map;
	earthMap.wrapS = THREE.RepeatWrapping;
	earthMap.wrapT = THREE.RepeatWrapping;
	earthMap.repeat.set(1, 1);

	//var planeTrajectory = getCurve4Points(
	//	new THREE.Vector3(-10, 0, 0),
	//	new THREE.Vector3(-5, 15, 0),
	//	new THREE.Vector3(20, 15, 0),
	//	new THREE.Vector3(10, 0, 0),
	//	"#f00"
	//);
	//scene.add(planeTrajectory);

	loginBtn.addEventListener("click", function (event) {

		console.log('Clicked!');
		loginClickEvent = true;
		scene.remove(box1);
		scene.remove(canvas1);
		scene.remove(canvas2);
		scene.remove(earth);
		loginPage();

		//loginBtn.parentNode.removeChild(loginBtn);

	}, false);
	
/* Set up the renderer */
    var renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.setSize(window.innerWidth, window.innerHeight, false);
	document.getElementById('webgl').appendChild(renderer.domElement);

	/* Interaction */
	//var controls = new THREE.OrbitControls(camera, renderer.domElement);

	update(renderer, clock, stats/*, controls*/);

    return scene;
}

function loginPage() {
	var login_event = false;
	//var mesh = getPlaneCanvas([0, 0], 4, 'login');
	/* Login form */
	var voucherLogin = getPlaneCanvas([-1, 0], 2, 'voucher');
	var emailLogin = getPlaneCanvas([1, 0], 2, 'email');

	var loginBtn2 = document.getElementById('login');
	loginBtn2.style.width = "10%";
	loginBtn2.style.height = "10%";
	loginBtn2.style.fontSize = "100%";
	loginBtn2.style.bottom = "15%";
	loginBtn2.style.left = "30%";
	loginBtn2.style.margin = "auto";
	loginBtn2.style.display = "block";
	loginBtn2.style.fontFamily = "cursive";
	loginBtn2.style.color = "#fff";
	loginBtn2.style.backgroundColor = "#e63800";

	var cancelLogin = document.getElementById('cancel_login');
	cancelLogin.style.bottom = "15%";
	cancelLogin.style.right = "30%";
	cancelLogin.style.margin = "auto";
	cancelLogin.style.display = "block";
	cancelLogin.style.width = "10%";
	cancelLogin.style.height = "10%";
	cancelLogin.style.fontSize = "100%";
	cancelLogin.style.fontFamily = "cursive";
	cancelLogin.style.color = "#fff";
	cancelLogin.style.backgroundColor = "#e63800";

	loginBtn2.addEventListener("click", function (event) {
		loginBtn2.parentNode.removeChild(loginBtn2);
		cancelLogin.parentNode.removeChild(cancelLogin);
		login_event = true;
		//let voucherLogin = document.getElementById('voucherLogin');
		//let emailLogin = document.getElementById('emailLogin');
		if (login_event) {
			scene.remove(voucherLogin);
			scene.remove(emailLogin);
			console.log('loginPage closed!')
			desktopPage();
		}
	});

	cancelLogin.addEventListener("click", function (event) {
		location.reload();
	});

	/*    return loginCanvas;*/
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

function getCurve4Points(start, end, controlPt1, controlPt2, color) {
	const curve = new THREE.CubicBezierCurve3(
		new THREE.Vector3(-10, 0, 0),
		new THREE.Vector3(-5, 15, 0),
		new THREE.Vector3(20, 15, 0),
		new THREE.Vector3(10, 0, 0)
	);

	const points = curve.getPoints(50);
	const geometry = new THREE.BufferGeometry().setFromPoints(points);

	const material = new THREE.LineBasicMaterial({ color: 0xff0000 });

	// Create the final object to add to the scene
	const curveObject = new THREE.Line(geometry, material);

	return curveObj;
}

function getSphere(size, position, material) {
	var geometry = new THREE.SphereGeometry(size, 24, 24);
	var mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(position[0], position[1], position[2]);

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

function resize() {
	
}

function update(renderer, clock, stats/*, controls*/) {
	stats.update();
	//controls.update();
	//inputManager.requestAnimationFrame();

	if (!loginClickEvent) {
		var box1 = scene.getObjectByName('box1');
		box1.rotation.y += 0.01;

		//var earth = scene.getObjectByName('earth');
		//earth.rotation.y += 0.01;
    }

	window.addEventListener('resize', resize);
    renderer.render(scene, camera);
	requestAnimationFrame(function () {
		update(renderer, clock, stats/*, controls*/);
	});
}