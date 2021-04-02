function loginPage(loginBtn) {
	let login_event = false;
    //var mesh = getPlaneCanvas([0, 0], 4, 'login');
	/* Login form */
	let voucherLogin = getPlaneCanvas([-1, 0], 2, 'voucher');
	voucherLogin.name = 'voucherLogin';
	let emailLogin = getPlaneCanvas([1, 0], 2, 'email');
	emailLogin.name = 'emailLogin';

	//var loginBtn = document.getElementById('login');
	loginBtn.style.width = "10%";
	loginBtn.style.height = "10%";
	loginBtn.style.fontSize = "100%";
	loginBtn.style.bottom = "15%";
	loginBtn.style.left = "30%";

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

	loginBtn.addEventListener("click", function (event) {
		loginBtn.parentNode.removeChild(loginBtn);
		cancelLogin.parentNode.removeChild(cancelLogin);
		login_event = true;
		//let voucherLogin = document.getElementById('voucherLogin');
		//let emailLogin = document.getElementById('emailLogin');
		if (login_event) {
			var scene = document.getElementById("scene");
			scene.remove(voucherLogin);
			scene.remove(emailLogin);
			update;
			console.log('loginPage closed!')
			desktopPage();
		}
	});

	cancelLogin.addEventListener("click", function (event) {
		location.reload();
	});

/*    return loginCanvas;*/
}



