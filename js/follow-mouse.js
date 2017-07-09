// Source code: http://jsbin.com/conuloxiwo/edit?html,css,js,output

var canvas, ctx, width, height;
var rect = {x:0, y:0, radius:30, width:0, height:0, v:1};
var mousepos = {x:0, y:0};
var spritesZombie = {
    // As many sprites as direction
    // Each element in this array contains n images
    sprites : []
};

DIR_SW = 0;
DIR_W  = 1;
DIR_NW = 2;
DIR_N  = 3;
DIR_NE = 4;
DIR_E  = 5;
DIR_SE = 6;
DIR_S  = 7;


// info about spritesheet
//var SPRITE_WIDTH = 129;
//var SPRITE_HEIGHT = 130;
var SPRITE_WIDTH = 128;
var SPRITE_HEIGHT = 128;
var scale = 1;
var ZOMBIE_WIDTH = SPRITE_WIDTH*scale;
var ZOMBIE_HEIGHT = SPRITE_HEIGHT*scale;
var NB_DIRECTIONS = 8;
var NB_FRAMES_PER_POSTURE = 1;
var ZOMBIES_NUM = 1;
var ZombiesFramesOfAnimationBetweenRedraws = 1;
var SPEED  = 1;
var FIRSTFRAME = 1;
var zombieArray = [];
var dir = DIR_S;

var moving = false;
var x = 0;
var y = 0;


function mainloop() {
    // 1) clear screen
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    cellsArr.forEach(function(cell){
        console.log('cellsArr function');
        // ctx.drawImage(spritesheet, cell.cellX, cell.cellY);

        ctx.drawImage(spritesheet, 0, 0, 128, 128, cell.cellX, cell.cellY, 128, 128);
    });

    // 2) move object
    var dx = rect.x - mousepos.x;
    var dy = rect.y - mousepos.y;
    var angle = Math.atan2(dy, dx);

    rect.x -= rect.v*Math.cos(angle);
    rect.y -= rect.v*Math.sin(angle);

    // 3) draw object
    //drawRectangle(angle);

    // For each zombie in the array
    for(var i=0; i < zombieArray.length; i++) {
        var zomb = zombieArray[i];

        // 1) Move the zombie
        zomb.move();

        // 2) collision test with walls
        //collisionTestWithWalls(zomb);

        // 3) draw the zombie
        zomb.draw();
    }

    // 4) request new frame
    window.requestAnimationFrame(mainloop);
}

window.onload = function(){
    canvas = document.querySelector("#canvas");
    ctx = canvas.getContext("2d");
    width = canvas.width;
    height = canvas.height;
    canvas.addEventListener('mousemove', function (evt) {
        mousepos = getMousePos(canvas, evt);
    }, false);

    // load the spritesheet
    spritesheet = new Image();
    spritesheet.src = "assets/green1c.gif";

    spritesheet.onload = function() {

        initSprites(spritesheet, SPRITE_WIDTH, SPRITE_HEIGHT,
            NB_DIRECTIONS, NB_FRAMES_PER_POSTURE);

        //Create zombies
        createZombies(ZOMBIES_NUM);
        createCells();
        mainloop();
    };

    //mainloop();
};

//************************************************************

function drawRectangle(angle) {
    ctx.save();

    // These two lines move the coordinate system
    ctx.translate(rect.x, rect.y);
    ctx.rotate(angle);
    // recenter the coordinate system in the middle
    // the rectangle. Like that it will rotate around
    // this point instead of top left corner
    ctx.translate(-rect.width/2, -rect.height/2);

    ctx.fillRect(0, 0, rect.width, rect.height);
    ctx.restore();
}

function getMousePos(canvas, evt) {
    // necessary to take into account CSS boudaries
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function createCell(cellX, cellY, cellType){
    this.cellX = cellX;
    this.cellY = cellY;
    this.cellType = cellType;

}

var cellsArr = [];

function createCells(){
    // console.log('cellsArr function');
    for(var x=0; x<10; x++){
        cellsArr.push(new createCell(Math.random() * 500, Math.random() * 500, 0));
    }
}


//****************************************************************
function Zombie(x, y, angle, speed, diameter) {
    this.x = x;
    this.y = y;
    this.width = SPRITE_WIDTH;
    this.height = SPRITE_HEIGHT;
    //this.vx = vx;
    //this.vy = vy;
    this.angle = angle;
    this.speed = speed;
    this.speed = SPEED;
    this.dir = DIR_W;
    this.radius = diameter/2;

    this.nbCurrentTicks = 0;
    this.currentFrame = 0;

    this.draw = function() {

        spritesZombie[this.dir].renderMoving(this, scale);

    };


    this.move = function() {

        var dx = (this.x+ZOMBIE_WIDTH/2) - mousepos.x,
            dy = (this.y+ZOMBIE_HEIGHT/2) - mousepos.y;

//   var dx = (this.x) - mousepos.x,
        //  dy = (this.y) - mousepos.y;


        this.angle = Math.atan2(dy, dx);
        //console.log('angle:',this.angle);

        this.x -= this.speed*Math.cos(this.angle);
        this.y -= this.speed*Math.sin(this.angle);

    };
}
//****************************************************************
function SpriteImage(img, x, y, width, height) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    // xPos and yPos = position where the sprite should be drawn,
    // scale = rescaling factor between 0 and 1
    this.render = function(xPos, yPos, scale, w, h, angle) {
        ctx.save();

        ctx.translate(xPos, yPos);
        ctx.translate(w/2, h/2);
        ctx.rotate(angle);
        ctx.translate(-w/2, -h/2);
        //ctx.fillRect(0, 0, w, h);

        //console.log('angle:',angle);
        ctx.drawImage(this.img,
            this.x, this.y,
            w, h,
            0, 0,
            width*scale, height*scale);
        ctx.restore();
    };
}
//****************************************************************
function Sprite(spritesheet, x, y, width, height, nbImages,
                nbFramesOfAnimationBetweenRedraws) {
    this.spriteImages = [];
    this.currentFrame = 0;
    this.nbFrames = nbImages;
    this.nbTicksBetweenRedraws = nbFramesOfAnimationBetweenRedraws;
    this.nbCurrentTicks=0;

    // let's process the row in the big image, and extract all sprites
    // for a given posture
    // of animation
    // we extract the subimage of WALKING
    for(var i = FIRSTFRAME; i < nbImages + FIRSTFRAME; i++) {

        this.spriteImages[i - FIRSTFRAME] = new SpriteImage(spritesheet,
            x+i*width, y, width, height);
    }

    // we extract the subimage of ATACKING
    for(var j = FIRSTFRAME; j < nbImages + FIRSTFRAME; j++) {

        this.spriteImages[j - FIRSTFRAME] = new SpriteImage(spritesheet,
            x+j*width, y, width, height);
    }

    this.renderMoving = function(zombie, scale) {
        // renders animated sprite, changed every nbTicksBetweenRedraws
        // the frame number
        z = zombie;

        // These two lines move the coordinate system
        //ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        // recenter the coordinate system in the middle
        // the rectangle. Like that it will rotate around
        // this point instead of top left corner
        //ctx.translate(z.x -this.width/2, z.y -this.height/2);

        // draw the sprite with the current image
        this.spriteImages[z.currentFrame].render(z.x, z.y,
            scale,z.width, z.height, z.angle);


        // increment the number of ticks of animation
        z.nbCurrentTicks++;

        if(z.nbCurrentTicks > this.nbTicksBetweenRedraws) {
            // enough time elapsed, let's go to the next image
            z.currentFrame++;
            if(z.currentFrame == this.nbFrames) {
                z.currentFrame=0;
            }
            z.nbCurrentTicks = 0;
        }

    };
    this.render = function(x, y, scale) {
        // draws always frame 0, static position
        this.spriteImages[0].render(x, y, scale,z.width, z.height);
    };
}
//****************************************************************
function initSprites(spritesheet, spriteWidth, spriteHeight, nbLinesOfSprites,
                     nbSpritesPerLine) {

    // sprite extraction
    for(var i= 0 ; i < nbLinesOfSprites ; i++) {
        var yLineForCurrentDir = i*spriteHeight;

        var sprite = new Sprite(spritesheet, 0, yLineForCurrentDir,
            spriteWidth, spriteHeight,
            nbSpritesPerLine,
            ZombiesFramesOfAnimationBetweenRedraws); // draw every 1s
        spritesZombie[i] = sprite;
    }
}
//****************************************************************
function createZombies(numberOfZombies) {
    for(var i=0; i < numberOfZombies; i++) {
        x = (width-ZOMBIE_WIDTH)*Math.random();
        y = (height-ZOMBIE_HEIGHT)*Math.random();

        console.log('x',x);
        console.log('y',y);

        // Create a zombie with random position and speed
        var zombie =  new Zombie(x,
            y,
            //(10*Math.random())-5,
            (2*Math.PI)*Math.random(),//angle
            //angle,
            //(10*Math.random())-5,
            SPEED,
            ZOMBIE_WIDTH); // diameter, change if you like.

        // Add it to the array
        zombieArray[i] = zombie;
    }

}

