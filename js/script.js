var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var red_img = new Image(64, 54);   // using optional size for image
var green_img = new Image(64, 54);   // using optional size for image
red_img.onload = main; // draw when image has loaded

// load an image of intrinsic size 300x227 in CSS pixels
red_img.src = 'assets/cell_evil.png';
green_img.src = 'assets/cell_neutral.png';

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

function update() {
	ctx.fillStyle = "#ffffff";
	ctx.fillRect(0,0,canvas.width,canvas.height);

	redcell1.update();
	redcell1.draw();
	redcell2.update();
	redcell2.draw();
	redcell3.update();
	redcell3.draw();
}

function main() {
	redcell1 = new RedCell(100);
	redcell2 = new RedCell(150);
	redcell3 = new GreenCell(200);

	window.setInterval(update, 1000 / 30);
}


