var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

resize();

var dim = [canvas.width, canvas.height];

boxFill(ctx, [0, 0], dim, "#00ff00");
boxStroke(ctx, [0, 0], dim, "#ff0000", 2);

ctx.fillText("WELCOME ABOARD!", 0.5 * dim[0], 0.5 * dim[1]);