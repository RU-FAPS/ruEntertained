function loginPage() {
    //var mesh = getPlaneCanvas([0, 0], 4, 'login');

/* Home/Log off button */
	var homeBtn = document.getElementById('home');
	homeBtn.style.bottom = "0";
	homeBtn.style.right = "0";
	homeBtn.style.margin = "auto";
	homeBtn.style.display = "block";
	homeBtn.style.width = "10%";
	homeBtn.style.height = "10%";
	homeBtn.style.fontSize = "100%";
	homeBtn.style.fontFamily = "cursive";
	homeBtn.style.backgroundColor = "white";

	homeBtn.addEventListener("click", function (event) {
		console.log('Clicked!')
		dispLogOff();
	}, false);

    //return mesh;
}

function dispLogin(ctx, w, h) {
    
}

function dispLogOff() {
	location.reload();
}