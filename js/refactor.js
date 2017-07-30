var canvas, ctx, width, height;
var rect = {x:0, y:0, radius:30, width:0, height:0, v:1};
var mousepos = {x:0, y:0};
var isdead = false;

var spritesPlayer = {
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
var PLAYER_WIDTH = SPRITE_WIDTH*scale;
var PLAYER_HEIGHT = SPRITE_HEIGHT*scale;
var NB_DIRECTIONS = 8;
var NB_FRAMES_PER_POSTURE = 1;
var PLAYERS_NUM = 1;
var PlayersFramesOfAnimationBetweenRedraws = 1;
var SPEED  = 1;
var FIRSTFRAME = 1;
var playerArray = [];
// var dir = DIR_S;

// var moving = false;
var x = 0;
var y = 0;

var bgmusic = new Audio();

function updateCell(cell){
    var d2x = (Math.random() * 1 - 1 / 2); //change dx and dy by random value
    var d2y = (Math.random() * 1 - 1 / 2);

    if (Math.abs(d2x + cell.dx) > 2) // start slowing down if going too fast
        d2x *= -1;
    if (Math.abs(d2y + cell.dy) > 2) d2y *= -1;

    cell.dx += d2x;
    cell.dy += d2y;

    if ((cell.cellX + cell.dx) < 128 || (cell.cellX + cell.dx) > canvas.width) // bounce off walls
        cell.dx *= -1;
    if ((cell.cellY + cell.dy) < 128 || (cell.cellY + cell.dy) > canvas.height) cell.dy *= -1;

    cell.cellX += cell.dx;
    cell.cellY += cell.dx;
}

function mainloop() {

    var mousePX = mousepos.x;
    var mousePY = mousepos.y;
    var mouseconsole = "Mouse X,Y: " + mousePX + ", " + mousePY;
    console.log(mouseconsole);

    playeralive();

}



function playeralive()
{
    // 1) clear screen
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    cellArray();

    // 2) move object
    var dx = rect.x - mousepos.x;
    var dy = rect.y - mousepos.y;
    var angle = Math.atan2(dy, dx);

    rect.x -= rect.v*Math.cos(angle);
    rect.y -= rect.v*Math.sin(angle);

    // 3) draw object

    // For each player in the spritesheet array
    for(var i=0; i < playerArray.length; i++) {

        var play = playerArray[i];


        // 1) Move the player
        play.move();

        // 2) collision test with walls
        //collisionTestWithWalls(play);

        // 3) draw the player
        play.draw();



    }

   detectCollison(play,rect);

    if(isdead == false){
        window.requestAnimationFrame(mainloop);
    }
    if(isdead == true)
    {
        window.requestAnimationFrame(playerdead);
    }

}

function playerdead()
{
    console.log('you are dead');
    // 1) clear screen
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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

    bgmusic.src = "assets/audio/militaire_electronic.mp3";

    spritesheet.onload = function() {
        bgmusic.loop = true;
        bgmusic.play();

        initSprites(spritesheet, SPRITE_WIDTH, SPRITE_HEIGHT,
            NB_DIRECTIONS, NB_FRAMES_PER_POSTURE);

        //Create players
        createPlayers(PLAYERS_NUM);
        createCells();

        mainloop();
    };


};

function cellArray(){

    cellsArr.forEach(function(cell){
        // console.log('cellsArr function');

        updateCell(cell);

        ctx.drawImage(spritesheet, 0, 384, 128, 128, cell.cellX, cell.cellY, 128, 128);

    });
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
    this.dx = 0;
    this.dy = 0;
    this.cellType = cellType;

}

var cellsArr = [];

function createCells(){
    // console.log('cellsArr function');
    for(var x=0; x<1; x++){
        cellsArr.push(new createCell(Math.random() * canvas.width, Math.random() * canvas.height, 0));
    }
}


//****************************************************************
function Player(x, y, angle, speed, diameter) {
    this.x = x;
    this.y = y;
    this.width = SPRITE_WIDTH;
    this.height = SPRITE_HEIGHT;
    this.angle = angle;
    this.speed = speed;
    this.speed = SPEED;
    this.dir = DIR_W;
    this.radius = diameter/2;

    this.nbCurrentTicks = 0;
    this.currentFrame = 0;

    this.draw = function() {

        spritesPlayer[this.dir].renderMoving(this, scale);

    };


    this.move = function() {

        var dx = (this.x+PLAYER_WIDTH/2) - mousepos.x,
            dy = (this.y+PLAYER_HEIGHT/2) - mousepos.y;

        this.angle = Math.atan2(dy, dx);

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

    // we extract the subimage of ATACKING
    for(var j = FIRSTFRAME; j < nbImages + FIRSTFRAME; j++) {

        this.spriteImages[j - FIRSTFRAME] = new SpriteImage(spritesheet,
            x+j*width, y, width, height);
    }

    this.renderMoving = function(player, scale) {
        // renders animated sprite, changed every nbTicksBetweenRedraws
        // the frame number
        z = player;

        // These two lines move the coordinate system
        //ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        // recenter the coordinate system in the middle
        // the rectangle. Like that it will rotate around
        // this point instead of top left corner


        // draw the sprite with the current image
        this.spriteImages[z.currentFrame].render(z.x, z.y,
            scale,z.width, z.height, z.angle);

    };
    this.render = function(x, y, scale) {
        // draws always frame 0, static position
        this.spriteImages[0].render(x, y, scale,z.width, z.height);
    };
}


function initSprites(spritesheet, spriteWidth, spriteHeight, nbLinesOfSprites,
                     nbSpritesPerLine) {

    // sprite extraction
    for(var i= 0 ; i < nbLinesOfSprites ; i++) {
        var yLineForCurrentDir = i*spriteHeight;

        var sprite = new Sprite(spritesheet, 0, yLineForCurrentDir,
            spriteWidth, spriteHeight,
            nbSpritesPerLine,
            PlayersFramesOfAnimationBetweenRedraws); // draw every 1s
        spritesPlayer[i] = sprite;
    }
}
//****************************************************************
function createPlayers(numberOfPlayers) {
    for(var i=0; i < numberOfPlayers; i++) {
        x = (width-PLAYER_WIDTH)*Math.random();
        y = (height-PLAYER_HEIGHT)*Math.random();

        console.log('x',x);
        console.log('y',y);

        // Create a player with random position and speed
        var player =  new Player(x,y,
            //(10*Math.random())-5,
            (2*Math.PI)*Math.random(),//angle
            //angle,
            //(10*Math.random())-5,
            SPEED,
            PLAYER_WIDTH); // diameter, change if you like.

        // Add it to the array
        playerArray[i] = player;
    }

}



function detectCollison(PlayPos, CellPos){

    // set x and y to center
    var PlayH = PlayPos.width / 2;
    var PlayW = PlayPos.height / 2;
    var CellH = CellPos.width / 2;
    var CellW = CellPos.height /2;

    if (PlayPos.x < CellPos.x + CellPos.width &&
        PlayPos.x + PlayPos.width > CellPos.x &&
        PlayPos.y < CellPos.y + CellPos.height &&
        PlayPos.y + PlayPos.height > CellPos.y)
    /*cenPlayX < cenCellX + 50 &&
    cenPlayX + 50 > cenCellX &&
    cenPlayY < cenCellY + 50 &&
    cenPlayY + 50 > cenCellY)*/
     {
         var strPPX = PlayPos.x.toFixed(0);
         var strPPY = PlayPos.y.toFixed(0);
         var consoleplayer = strPPX + ", " + strPPY;
         console.log("Player X,Y: ");
         console.log(consoleplayer);

         var strCPX = CellPos.x.toFixed(0);
         var strCPY = CellPos.y.toFixed(0);
         var consolecell = strCPX + ", " + strCPY;
         console.log("Cell X,Y: ");
         console.log(consolecell);

         console.log('is dead detectedcollision');

         isdead = true;
         return isdead;
     }

     return isdead;
 }


















/** set width of gameplay area to size of viewport **/
(function() {
    var canvas = document.getElementById('canvas'),
        context = canvas.getContext('2d');

    // resize the canvas to fill browser window dynamically
    window.addEventListener('resize', resizeCanvas, false);

    function resizeCanvas() {
        canvas.width = window.innerWidth - 20; //user agent adds margin to body
        canvas.height = window.innerHeight - 20;

        /**
         * Your drawings need to be inside this function otherwise they will be reset when
         * you resize the browser window and the canvas goes will be cleared.
         */
        drawStuff();
    }
    resizeCanvas();

    function drawStuff() {
        // do your drawing stuff here
    }
})();

