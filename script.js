var container, canvas, context;
var WIDTH, HEIGHT;
var MAX_LIFE = 500;
var LINE_WIDTH = 3;

var branches, mouseX, mouseY;

init();
setInterval(loop, 1000/60);

function init() {
    container = document.getElementById('container');

    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;

    canvas = document.createElement("canvas");
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    container.appendChild(canvas);

    context =  canvas.getContext("2d");
    context.fillStyle="rgb(0, 0, 0)";
    context.fillRect(0, 0, WIDTH, HEIGHT);

    branches = new Array();

    window.addEventListener('mousedown', onMouseDown, false);
}

function onMouseDown(e) {
    if(!e)
        var e = window.event;
    
        mouseX = e.clientX;
        mouseY = e.clientY;

        branches.push(new Branch(mouseX, mouseY, MAX_LIFE));
}

function loop() {
    context.beginPath();
    context.strokeStyle = "#fff6";
    context.lineWidth = LINE_WIDTH

    for(var i = 0; i < branches.length; i++) {
        var branch = branches[i];
        branch.life++;

        context.moveTo(branch.x, branch.y);

        branch.rw += Math.random() - .5;
        branch.x += Math.cos(branch.rw) * branch.speed;
        branch.y += Math.sin(branch.rw) * branch.speed;

        context.lineTo(branch.x, branch.y);

        if(branch.life > branch.max_life || branch.x < 0 || branch.y < 0 || branch.x > WIDTH || branch.y > HEIGHT)
            branches.splice(i,1);
        
        if(Math.random() > 0.95 && branches.length < MAX_LIFE)
            branches.push(new Branch(branch.x, branch.y, branch.max_life / 10));
    }
    
    context.stroke();
    context.closePath();

    context.fillStyle = "rgba(0, 25, 25, 0.05)";
    context.fillRect(0, 0, WIDTH, HEIGHT);
}

var Branch = function(x, y, max_life) {
    this.life = 0;
    this.max_life = max_life;
    this.speed = Math.random() + 3;
    this.x = x;
    this.y = y;
    this.rw = Math.random() * 360;
}