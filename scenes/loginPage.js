function loginPage(event) {
	let logoff_event = false;
    //var mesh = getPlaneCanvas([0, 0], 4, 'login');
	/* Login form */
	var loginCanvas = getPlaneCanvas([0, 0], 2, 'login');

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
		console.log('Clicked!')
		scene.remove(loginCanvas);
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

	

    //return mesh;
}

function dispLogin(ctx, w, h) {
	textPrint("PLEASE LOGIN", ctx, 40, [w * 0.5, h * 0.1], "#0f0", "c");
	textPrint("Voucher Code", ctx, 30, [w * 0.5, h * 0.3], "#0f0", "c");
	boxFill(ctx, [w * 0.3, h * 0.4], [w * 0.4, h * 0.2], "#fff", 2);

}



