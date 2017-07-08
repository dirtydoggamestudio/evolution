var canvas = document.getElementById('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var x = canvas.width / 2; //initial position
var y = canvas.height / 2;

var cxt = canvas.getContext('2d');
cxt.fillStyle = '#FF0000'; //color
var radius = 10;

var dx = 0;
var dy = 0;
var delta = 1; // range (from 0) of possible dx or dy change
var max = 2; // maximum dx or dy values
canvas.addEventListener("click", togglestart);

function togglestart() {
    if (interval == undefined) interval = window.setInterval(animate, 1000 / 30); // 60 FPS
    else {
        interval = clearInterval(interval);
        console.log(interval);
    }
}

var interval = window.setInterval(animate, 1000 / 30);

function animate() {
    var d2x = (Math.random() * delta - delta / 2); //change dx and dy by random value
    var d2y = (Math.random() * delta - delta / 2);

    if (Math.abs(d2x + dx) > max) // start slowing down if going too fast
        d2x *= -1;
    if (Math.abs(d2y + dy) > max) d2y *= -1;

    dx += d2x;
    dy += d2y;

    if ((x + dx) < 0 || (x + dx) > canvas.width) // bounce off walls
        dx *= -1;
    if ((y + dy) < 0 || (y + dy) > canvas.height) dy *= -1;

    x += dx;
    y += dy;


        cxt.beginPath(); //drawing circle
        cxt.arc(x, y, radius, 0, 2 * Math.PI, false);
        cxt.clearRect(0, 0, canvas.width, canvas.height); // wiping canvas
        cxt.fill();
}