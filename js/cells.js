// base cell

function Cell(image) {
	Sprite.call(this, image);

	this.dx = 0;
	this.dy = 0;

	this.delta = 1;
	this.max = 2;
}

Cell.prototype = Object.create(Sprite.prototype)

// red cell

function RedCell(pos) {
	Cell.call(this, red_img);

	this.x = pos;
	this.y = pos;
}

RedCell.prototype = Object.create(Cell.prototype)

RedCell.prototype.update = function(dt) {
	//change dx and dy by random value
	var d2x = (Math.random() * this.delta - this.delta / 2);
	var d2y = (Math.random() * this.delta - this.delta / 2);

	// start slowing down if going too fast
	if (Math.abs(d2x + this.dx) > this.max) {
		d2x *= -1;
	}
	if (Math.abs(d2y + this.dy) > this.max) {
		d2y *= -1;
	}

	this.dx += d2x;
	this.dy += d2y;

	// bounce off walls
	if((this.x + this.dx) < 0 || (this.x + this.dx) > canvas.width) {
		this.dx *= -1;
	}
	if ((this.y + this.dy) < 0 || (this.y + this.dy) > canvas.height) {
		this.dy *= -1;
	}

	this.x += this.dx;
	this.y += this.dy;
}

// green cell
function GreenCell(pos) {
    Cell.call(this, green_img);

    this.x = pos;
    this.y = pos;
}

GreenCell.prototype = Object.create(Cell.prototype)

GreenCell.prototype.update = function(dt) {
    //change dx and dy by random value
    var d2x = (Math.random() * this.delta - this.delta / 2);
    var d2y = (Math.random() * this.delta - this.delta / 2);

    // start slowing down if going too fast
    if (Math.abs(d2x + this.dx) > this.max) {
        d2x *= -1;
    }
    if (Math.abs(d2y + this.dy) > this.max) {
        d2y *= -1;
    }

    this.dx += d2x;
    this.dy += d2y;

    // bounce off walls
    if((this.x + this.dx) < 0 || (this.x + this.dx) > canvas.width) {
        this.dx *= -1;
    }
    if ((this.y + this.dy) < 0 || (this.y + this.dy) > canvas.height) {
        this.dy *= -1;
    }

    this.x += this.dx;
    this.y += this.dy;
}


