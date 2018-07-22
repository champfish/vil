var socket = io();

var staticData;

var game;

var sprites = new Map();


socket.on('staticData', function(data) {
    resizeCanvas();
    staticData = data;
    for (var i = 0; i < staticData.sprites.length; i++) {
        var s = new Image();
        s.src = 'img/' + staticData.sprites[i] + '.png';
        sprites.set(staticData.sprites[i], s);
    }
    console.log('Static Data Loaded');
});

socket.on('game', function(data) {
    game = data;
    draw();
});


var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
$(window).resize(function() { resizeCanvas(); });

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}


var camX = 0;
var camY = 0;
var leftCornerX = 0;
var leftCornerY = 0;

var spriteWidth = 50;

function draw() {
    leftCornerX = camX - canvas.width / 2;
    leftCornerY = camY - canvas.height / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    keys = Object.keys(game.things);
    for (var i = 0; i < keys.length; i++) {
        var thing = game.things[keys[i]];
        drawSprite(thing);
    }
}

function drawSprite(thing) {
    ctx.drawImage(sprites.get(thing.sprite), (thing.x - spriteWidth / 2) - leftCornerX,
        (thing.y - spriteWidth / 2) - leftCornerY, spriteWidth, spriteWidth);
}
