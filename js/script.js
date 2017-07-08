var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var image = new Image(64, 54);   // using optional size for image
image.onload = drawImageActualSize; // draw when image has loaded

// load an image of intrinsic size 300x227 in CSS pixels
image.src = 'assets/red.png';

function drawImageActualSize() {
    // use the intrinsic size of image in CSS pixels for the canvas element
    canvas.width = this.naturalWidth;
    canvas.height = this.naturalHeight;

    // will draw the image as actual size ignoring the custom size of 60x45
    // given in the constructor
    ctx.drawImage(this, 0, 0);

    // To use the custom size we'll have to specify the scale parameters
    // using the element's width and height properties - lets draw one
    // on top in the corner:
    // ctx.drawImage(this, 0, 0, this.width, this.height);
}