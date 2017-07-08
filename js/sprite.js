function Sprite(image) {
	this.x = 100;
	this.y = 0;
	this.width = 32;
	this.height = 32;
	this.image = image;
}

Sprite.prototype = {
	draw: function() {
		ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
	},

	update: function() {
	}
}

