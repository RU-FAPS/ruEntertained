class App {
    constructor() {
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(0, 0, 150, 75);
        
        this.init();
        this.update();
        this.animate();
                
//         window.addEventListener("resize", this.resize.bind(this));
    }

    init() {

    }
    
    update()    {
        
    }
    
    resize()    {
        
    }

    animate() {

    }
}

export {App};
