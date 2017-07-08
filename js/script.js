var canvas = document.getElementById('canvas');
canvas.width = window.innerWidth -20;
canvas.height = window.innerHeight -20;
var ctx = canvas.getContext('2d');

var red_img = new Image();   // using optional size for image
var green_img = new Image();   // using optional size for image
red_img.onload = main; // draw when image has loaded

// load an image of intrinsic size 300x227 in CSS pixels
red_img.src = 'assets/Evil_Cell_Animation_GIF.gif';
green_img.src = 'assets/Neutral_Cell_Animation.gif';

function drawImageActualSize() {
    // use the intrinsic size of image in CSS pixels for the canvas element
    canvas.width = this.naturalWidth;
    canvas.height = this.naturalHeight;

    // will draw the image as actual size ignoring the custom size of 60x45
    // given in the constructor
    // ctx.drawImage(this, 0, 0);

    // To use the custom size we'll have to specify the scale parameters
    // using the element's width and height properties - lets draw one
    // on top in the corner:
    ctx.drawImage(this, 0, 0, this.width, this.height);
}

function main() {

    redcell1 = new RedCell(50);
    redcell2 = new RedCell(150);
    redcell3 = new GreenCell(200);
    redcell4 = new GreenCell(250);
    redcell5 = new RedCell(300);
    redcell6 = new RedCell(350);
    redcell7 = new GreenCell(400);
    redcell8 = new GreenCell(450);

    window.setInterval(update, 1000 / 30);
}
function update() {
	ctx.fillStyle = "#ffffff";
	ctx.fillRect(0,0,canvas.width,canvas.height);

	redcell1.update();
	redcell1.draw();
	redcell2.update();
	redcell2.draw();
	redcell3.update();
	redcell3.draw();
    redcell4.update();
    redcell4.draw();
    redcell5.update();
    redcell5.draw();
    redcell6.update();
    redcell6.draw();
    redcell7.update();
    redcell7.draw();
    redcell8.update();
    redcell8.draw();
}
