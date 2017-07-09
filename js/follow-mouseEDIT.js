

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var image = new Image(60, 45);   // using optional size for image
image.onload = drawImageActualSize; // draw when image has loaded

// load an image of intrinsic size 300x227 in CSS pixels
image.src = 'assets/red.png';

function drawImageActualSize() {
    // use the intrinsic size of image in CSS pixels for the canvas element
    canvas.width = this.naturalWidth;
    canvas.height = this.naturalHeight;

    // will draw the image as 300x227 ignoring the custom size of 60x45
    // given in the constructor
    ctx.drawImage(this, 0, 0);
}

// move at specific rate


// follow mouse
function showCoords(evt){
    console.log(
        "clientX value: " + evt.clientX + "\n" +
        "clientY value: " + evt.clientY + "\n"
    );
}
