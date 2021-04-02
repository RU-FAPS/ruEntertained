function desktopPage() {
	//var scene2 = new THREE.Scene();

	let logoff_event = false;
/* Home/Log off button */
	var homeBtn = document.getElementById('log_off');
	homeBtn.style.bottom = "0";
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