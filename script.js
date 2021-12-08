var container, canvas, context, btn;
var WIDTH, HEIGHT;
var MAX_LIFE = 300;
var LINE_WIDTH = 3;
var switched = false;
var color = `rgba(0, 25, 25, 0.05)`

var branches, mouseX, mouseY;

// Speed slider
var slider = document.getElementById("myRange");
var sliderSpeed = document.getElementById("slider--output");
sliderSpeed.innHTML = slider.value;

init();
setInterval(loop, 1000/60);

function init() {
    container = document.getElementById('container');
    btn = document.getElementsByClassName("switch-up")[0];

    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;

    canvas = document.createElement("canvas");
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    container.appendChild(canvas);

    context =  canvas.getContext("2d");
    context.fillStyle="rgba(0, 0, 0, 0.05)";
    context.fillRect(0, 0, WIDTH, HEIGHT);

    branches = new Array();

    window.addEventListener('mousedown', onMouseDown, false);
    btn.addEventListener('click', switchUp);
}

function onMouseDown(e) {
    if(!e)
        var e = window.event;
    
    // calculations made to get the branch starting point to match cursor
    mouseX = e.clientX - 8;
    mouseY = e.clientY - 10;

    branches.push(new Branch(mouseX, mouseY, MAX_LIFE));
}

// This function will change the background and colors
function switchUp() {
    // Example of how switched can be used for a one time use
    if(!switched)
        alert("This button will change the color of the background to any color, do you still wish to continue?");
    switched = true;    // made for additional addons to mark the switchup button has been preseed (one time use for now)
    color = `rgba(${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)}, 0.05)`;
    context.fillStyle = color;
    // context.fillRect(0, 0, WIDTH, HEIGHT);
    console.log(color);
}

function loop() {
    context.beginPath();
    context.strokeStyle = "#fff6";
    context.lineWidth = LINE_WIDTH

    for(var i = 0; i < branches.length; i++) {
        var branch = branches[i];
        branch.life++;

        context.moveTo(branch.x, branch.y);

        var random = 0;
        if(Math.random() < 0.15)
            random = Math.random() < 0.5 ? (Math.random()*10*(-1)) : (Math.random()*10);
        // console.log(random);
        branch.rw += Math.random() - .5;
        branch.x += Math.cos(branch.rw) * branch.speed + random / Math.PI;
        branch.y += Math.sin(branch.rw) * branch.speed + random / Math.PI;

        context.lineTo(branch.x, branch.y);

        if(branch.life > branch.max_life || branch.x < 0 || branch.y < 0 || branch.x > WIDTH || branch.y > HEIGHT)
            branches.splice(i,1);
        
        if(Math.random() > 0.95 && branches.length < MAX_LIFE)
            branches.push(new Branch(branch.x, branch.y, branch.max_life / 10));
    }
    
    context.stroke();
    context.closePath();

    context.fillStyle = `rgba(75, 25, 50, 0.05)`;
    context.fillStyle = color;
    context.fillRect(0, 0, WIDTH, HEIGHT);
}

var Branch = function(x, y, max_life) {
    this.life = 0;
    this.max_life = max_life;
    this.speed = Math.random() + 10;
    // console.log(sliderSpeed.value)
    this.x = x;
    this.y = y;
    this.rw = Math.random() * 360;
}

slider.oninput = function() {
    sliderSpeed.innerHTML = this.value;
    sliderSpeed.value = this.value
    // console.log(sliderSpeed.value);
}