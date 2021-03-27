var gui = new dat.GUI();

function getPlaneCanvas(position2dVector, size2dSquareValue, content2display) {
	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	canvas.width = 512;
	canvas.height = canvas.width;
	boxFill(ctx, [0, 0], [canvas.width, canvas.height], "#000");
	dispFunction(ctx, content2display);
	var texture = new THREE.CanvasTexture(canvas);
	var canvasMaterial = new THREE.MeshBasicMaterial({
		color: '#fff',
		transparent: true,
		alphaTest: 0.5,
		opacity: 0.8
	});
	//gui.add(canvasMaterial, 'opacity', 0.5, 1);
	var canvasPlane = getPlane(size2dSquareValue, canvasMaterial);
	scene.add(canvasPlane);
	canvasPlane.position.x = position2dVector[0];
	canvasPlane.position.y = position2dVector[1];

	texture.needsUpdate = true;
	canvasMaterial.map = texture;

	return canvasPlane;
}

function dispFunction(ctx, content) {
	var w = ctx.canvas.width;
	var h = ctx.canvas.height;
	switch (content) {
		case 'test':
			testContent(ctx, w, h);
			break;
		case 'flight_info':
			flight_info(ctx, w, h);
			break;
		case 'clock':
			dispClock(ctx, w, h);
			break;
		case 'login':
			dispLogin(ctx, w, h);
			break;
		case 'feedback':
			dispFeedback(ctx, w, h);
			break;
		case 'live_flight':
			dispLiveFlight(ctx, w, h);
			break;
		default:
			helloWorld(ctx, w, h);
			break;
	}
}

function dispClock(ctx, w, h) {
	var now = new Date();
	var date = [now.getDate(), now.getMonth(), now.getFullYear()];
	var time = [now.getHours(), now.getMinutes(), now.getSeconds(), 'AM'];
	time[3] = (time[0] < 12) ? 'AM' : 'PM';
	time[0] = (time[0] > 12) ? time[0] - 12 : time[0];

	textPrint(
		date[0] + "/" + date[1] + "/" + date[2],
		ctx, 40, [w / 2, h * 0.40], "#ffffff");
	textPrint(
		time[0] + ":" + nDigits(time[1], 2) + ":" + nDigits(time[2],2) + " "+time[3],
		ctx, 60, [w / 2, h * 0.70], "#ffffff");
}

function flight_info(ctx, w, h) {
	txtArray = [
		"FLIGHT INFO",
		"-------------------",
		"Departed from: Toronto",
		"Time: 10:49 AM",
		"", "", "",
		"Arriving at: Montreal",
		"Time: 12:00 PM"
	];

	var txtPos = [0.1 * w, 0.1 * h];
	for (text in txtArray) {
		txtPos[1] += 40;
		textPrint(txtArray[text], ctx, 40, txtPos, "#ffffff", "l");
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

function dispLiveFlight(ctx, w, h) {
	circleStroke(ctx, [w / 2, h / 2], 0.5 * w, "#fff");
	textPrint("<Outside View>", ctx, 40, [w / 2, h / 2], "#f00", "c");
	var img = new Image();
	img.src = './Assets/Images/copilotView.png';
	img.addEventListener("load", function (event) {
		ctx.drawImage(img, w/2, h/2);
	}, false);
}