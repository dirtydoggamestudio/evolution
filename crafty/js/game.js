Crafty.init(Crafty.viewport.x,Crafty.viewport.y, document.getElementById('game'));
// Crafty.e('2D, DOM, Color').attr({x: 0, y: 0, w: 100, h: 100}).color('#F00');
Crafty.background('#FFFFFF url(imgs/bg.png) no-repeat center center');


var viewWX = Crafty.viewport.x;
var viewHY = Crafty.viewport.y;


// load assets
var assetsObj = {
    /*"audio": {
        "beep": ["beep.wav", "beep.mp3", "beep.ogg"],
        "boop": "boop.wav",
        "slash": "slash.wav"
    },*/
    "images": {
        "bg": "imgs/bg.png"
    },
    "sprites": {
        "imgs/bacteria_spritesheet.gif": {
            "tile": 128,
            "tileh": 128,
            "map": { "bac1": [0,0], "bac2": [0,1], "bac3": [2,1],
                    "bac4": [2,3], "bac5": [3,2], "bac6": [3,0],
                    "bac7": [0,3], "bac8": [1,3], "bac9": [5,1],
                    "bac10": [5,0], "bac11": [5,2], "bac12": [0,2],
                    "bac13": [0,3], "bac14": [1,3], "bac15": [5,1],
                    "bac16": [0,3]
            },
            "paddingX": 0,
            "paddingY": 0,
            "paddingAroundBorder": 0
        },
        /*"vehicles.png": {
            "tile": 150,
            "tileh": 75,
            "map": { "car": [0,0], "truck": [0,1] }
        }*/
    },
};

Crafty.load(assetsObj, // preload assets
    function() { //when loaded
        // Crafty.scene("main"); //go to main scene
        // Crafty.audio.play("boop"); //Play the audio file
        Crafty.e('2D, DOM, bg'); // create entity with sprite
        Crafty.e('2D, DOM, bac1').attr({x: 0, y: 0}); // create entity with sprite
        Crafty.e('2D, DOM, bac2').attr({x: 128, y: 0}); // create entity with sprite
        Crafty.e('2D, DOM, bac3').attr({x: 256, y: 0}); // create entity with sprite
        Crafty.e('2D, DOM, bac10').attr({x: 384, y: 0}); // create entity with sprite
        Crafty.e('2D, DOM, bac4').attr({x: 0, y: 128}); // create entity with sprite
        Crafty.e('2D, DOM, bac5').attr({x: 128, y: 128}); // create entity with sprite
        Crafty.e('2D, DOM, bac6').attr({x: 256, y: 128}); // create entity with sprite
        Crafty.e('2D, DOM, bac11').attr({x: 384, y: 128}); // create entity with sprite
        Crafty.e('2D, DOM, bac7').attr({x: 0, y: 256}); // create entity with sprite
        Crafty.e('2D, DOM, bac8').attr({x: 128, y: 256}); // create entity with sprite
        Crafty.e('2D, DOM, bac9').attr({x: 256, y: 256}); // create entity with sprite
        Crafty.e('2D, DOM, bac12').attr({x: 384, y: 256}); // create entity with sprite
    },

    function(e) { //progress
    },

    function(e) { //uh oh, error loading
    }
);





//image follows mouse