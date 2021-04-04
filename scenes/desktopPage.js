function desktopPage() {
	//var scene2 = new THREE.Scene();
	// Meshes
	imgPath += 'Icons/';
	var imgFormat = ".png";

	getPlaneCanvas16by9([0, .4], 5.5, 'recommender');

	var appList = [
		'airbnb', 'amazon', 'BBC', 'citymapper',
		'dailymai', 'disney', 'Duolingo', 'ESPN',
		'Foursquare', 'Google_Translate', 'groupon',
		'headspace', 'kindle', 'Netflix_icon', 'pandora',
		'Prime', 'spotify', 'TheWeatherChannel', 'ticketmaster',
		'Turo', 'twitch', 'uber', 'youtube', 'zomato'];
	
	for (i = 0; i < appList.length; i++) {
		getIcon(appList[i], imgFormat);
    }
	
	logoff_btn_click();
}

function logoff_btn_click() {
	let logoff_event = false;
	/* Home/Log off button */
	var homeBtn = document.getElementById('log_off');
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
		logoff_event = true;
		dispLogOff();
		logoff_event = false;
		homeBtn.style.bottom = "20%";
		homeBtn.style.right = "auto";
		homeBtn.style.left = "35%";
		homeBtn.addEventListener("click", () => {
			logoff_event = true;
			if (logoff_event) location.reload();
		});
	}, false);
}

function getIcon(app, imgFormat, url) {
	console.log(app + imgFormat);

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
}