function desktopPage() {
	//var scene2 = new THREE.Scene();
	// Meshes
	imgPath += 'Icons/';
	var imgFormat = ".png";

	var appWindow = getPlaneCanvas16by9([0, .4], 5.5, 'recommender');
	//var appMat = getMaterial('basic');
	//var appWindow = getPlane16by9(5, appMat);
	//appWindow.position.set(0, 0.5, 0);
	//scene.add(appWindow);

//	var w = 1024;
//	var h = 576;
//	var url = "https://www.google.ca/";
//	var html = [
//		'<div style="width:' + w + 'px; height:' + h + 'px;">',
//		'<iframe src"' + url + '"width="' + '"height="' + h + '">',
//		'</iframe>',
//		'</div>'
//	].join('\n');

//	var iframeHome = document.createElement('div');

///*	$(div).html(html);*/
	
//	var cssObject = new THREE.CSS3DObject(iframeHome);

	var iFrameLoader = document.getElementById('url_loader');
	//iFrameLoader.src = "https://www.google.ca/";
	iFrameLoader.style.zIndex = -1;
	iFrameLoader.width = '1024px';
	iFrameLoader.height = '576px';
	console.log(iFrameLoader);

	var appList = [
		'airbnb', 'amazon', 'BBC', 'citymapper',
		'dailymai', 'disney', 'Duolingo', 'ESPN',
		'Foursquare', 'Google_Translate', 'groupon',
		'headspace', 'kindle', 'Netflix_icon', 'pandora',
		'Prime', 'spotify', 'TheWeatherChannel', 'ticketmaster',
		'Turo', 'twitch', 'uber', 'youtube', 'zomato',
		'marketwatch', 'reuters'
	];

	var iconButtons = [];
	for (i = 0; i < appList.length; i++) {
		iconButtons[i] = getIcon(appList[i], imgFormat);
    }
	
	/* Home/Log off button */
	var homeBtn = document.getElementById('log_off_request');
	homeBtn.style.top = "0";
	homeBtn.style.right = "0";
	homeBtn.style.margin = "auto";
	homeBtn.style.display = "block";
	homeBtn.style.width = "10%";
	homeBtn.style.height = "10%";
	homeBtn.style.fontSize = "100%";
	homeBtn.style.fontFamily = "cursive";
	homeBtn.style.color = "#fff";
	homeBtn.style.backgroundColor = "#e63800";

	homeBtn.addEventListener("click", function (event) {
		getPlaneCanvas([0, 0], 3, 'feedback');
		homeBtn.parentNode.removeChild(homeBtn);

		console.log("Loading icons...");
		sleep(1000);

		appWindow.parent.remove(appWindow);
		for (i = 0; i < appList.length; i++) {
			iconButtons[i].parent.remove(iconButtons[i]);
        }

		var feedback_form_load = document.getElementById("log_off");
		feedback_form_load.style.bottom = "20%";
		feedback_form_load.style.left = "35%";
		feedback_form_load.style.margin = "auto";
		feedback_form_load.style.display = "block";
		feedback_form_load.style.width = "10%";
		feedback_form_load.style.height = "10%";
		feedback_form_load.style.fontSize = "100%";
		feedback_form_load.style.fontFamily = "cursive";
		feedback_form_load.style.color = "#fff";
		feedback_form_load.style.backgroundColor = "#e63800";
		feedback_form_load.addEventListener("click", function (event) {
			console.log("Logging off...");
			sleep(3000);
			location.reload();
		});
	}, false);
}

function getIcon(app, imgFormat, url) {
	var appIconMat, appIcon, appIconTexture;
	appIconMat = getMaterial('Basic');
	appIcon = getBox(
		[.5, .5, .01],
		[Math.floor(Math.random() * 6 - 2.5), -1.5, 0],
		[0, 0, 0], appIconMat);
	scene.add(appIcon);

	appIconMat.map = loader.load(imgPath + app + imgFormat);
	appIconTexture = appIconMat.map;
	appIconTexture.wrapS = THREE.RepeatWrapping;
	appIconTexture.wrapT = THREE.RepeatWrapping;
	appIconTexture.repeat.set(1, 1);

	return appIcon;
}

function dispFeedback(ctx, w, h) {
	textPrint("PLEASE RATE THE IFEC SERVICE!", ctx, 20, [w * 0.5, h * 0.1], "#0f0", "c");
	starRating(ctx, 0, [0.5 * w, 0.2 * h], [0.1 * w, 0.1 * h]);
	textPrint("COMMENTS", ctx, 20, [w * 0.5, h * 0.3], "#0f0", "c");
	boxFill(ctx, [w * 0.1, h * 0.38], [0.8 * w, 0.35 * h], "#fff");
	writeComments(ctx, [0.15 * w, 0.42 * h], [0.8 * w, 0.4 * h]);
	send_feedback(ctx, w, h);
}

function writeComments(ctx, coords, size) {
	textPrint("Write comments here", ctx, 18, coords, "#222", "l");
}

function send_feedback(ctx, w, h) {
	var send_report_btn = document.getElementById('send_feedback');
	send_report_btn.style.bottom = "20%";
	send_report_btn.style.right = "35%";
	send_report_btn.style.margin = "auto";
	send_report_btn.style.display = "block";
	send_report_btn.style.width = "10%";
	send_report_btn.style.height = "10%";
	send_report_btn.style.fontSize = "100%";
	send_report_btn.style.fontFamily = "cursive";
	send_report_btn.style.color = "#fff";
	send_report_btn.style.backgroundColor = "#e63800";

	//ctx.clearRect(0, 0, w, h);
	send_report_btn.addEventListener("click", function (event) {
		console.log("Sending report...");
		sleep(5000);
		console.log("Report sent...");
		sleep(3000);
		location.reload();
	});
}

function starRating(ctx, rate_value, coords, size) {
	for (i = -2; i <= 2; i++) {
		drawStar(ctx, [
			coords[0] - 1.2 * i * size[0],
			coords[1]
		], size, 3);
    }
}

function drawStar(ctx, coords, size, thickness) {
	center = [coords[0] - 0.5 * size[0], coords[1] - 0.5 * size[1]]
	//boxFill(ctx, center, size, "#f00");
	multipleLines(ctx, [
		center[0] + 0.5 * size[0], center[1], // top
		center[0] + 0.6 * size[0], center[1] + 0.4 * size[1],
		center[0] + size[0], center[1] + 0.4 * size[1], // mid-right
		center[0] + 0.7 * size[0], center[1] + 0.6 * size[1],
		center[0] + 0.8 * size[0], center[1] + size[1], // bottom-right
		center[0] + 0.5 * size[0], center[1] + 0.7 * size[1],
		center[0] + 0.2 * size[0], center[1] + size[1], // bottom-left
		center[0] + 0.3 * size[0], center[1] + 0.6 * size[1],
		center[0], center[1] + 0.4 * size[1], // mid-left
		center[0] + 0.4 * size[0], center[1] + 0.4 * size[1],
		center[0] + 0.5 * size[0], center[1] // top
	], "#ff0", thickness);
}