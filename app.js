const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const light = new THREE.AmbientLight(0xaaaaaa); // soft white light
scene.add(light);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

boxDraw([1, 1, 1], "#2194ce", [0, 0, 0], [0, 0, 0], 1, true, 0.5);

camera.position.z = 5;

const animate = function () {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
};

animate();

function boxDraw(size, color, position, rotation, reflectivity, transparent, opacity) {
	const geometry = new THREE.BoxGeometry(size[0], size[1], size[2]);
	//const texture = new THREE.TextureLoader().load(urls);
	const material = new THREE.MeshBasicMaterial({
		color: color,
		transparent: transparent,
		opacity: opacity,
		//envMap: camera.renderTarget,
		reflectivity: reflectivity
	});

	const cube = new THREE.Mesh(geometry, material);
	scene.add(cube);

	cube.position.x = position[0];
	cube.position.y = position[1];
	cube.position.z = position[2];

	cube.rotation.x = deg2rad(rotation[0]);
	cube.rotation.y = deg2rad(rotation[1]);
	cube.rotation.z = deg2rad(rotation[2]);
}