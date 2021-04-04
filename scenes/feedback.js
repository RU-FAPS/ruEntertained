function dispLogOff() {
	var feedbackForm = getPlaneCanvas([0, 0], 3, 'feedback');
}

function dispFeedback(ctx, w, h) {
	textPrint("PLEASE RATE THE IFEC SERVICE!", ctx, 20, [w * 0.5, h * 0.1], "#0f0", "c");
	textPrint("COMMENTS", ctx, 20, [w * 0.5, h * 0.3], "#0f0", "c");
	boxFill(ctx, [w*0.1, h*0.38], [0.8*w, 0.35*h], "#fff");
	send_feedback(ctx, w, h);
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

	console.log('Send report button loaded!')

	//ctx.clearRect(0, 0, w, h);
	send_report_btn.addEventListener("click", function (event) {
		var cmd1 = ctx.clearRect(0,0,w,h);
		console.log(cmd1)
	});
}