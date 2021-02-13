class App {
    constructor() {
        var canvas = getElementById("CanvasMain");
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(0, 0, 150, 75);
    }
}

export {App};
