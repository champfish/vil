var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 80;
var builder = require('./builder');

const build = new builder();
const staticData = build.getStatic();
const game = build.getGame();

app.use(express.static(__dirname + '/public')); //Serves resources from public folder

io.on('connection', function(socket) {
    socket.emit('staticData', staticData);
});

function update() {
    io.emit('game', game);
}
setInterval(updateGame, 16);

http.listen(port, function() {
    console.log('listening on *:' + port);
});

var lastTime = Date.now();

function updateGame() {
    var thisTime = Date.now();
    var deltaTime = (thisTime - lastTime) / 1000;
    lastTime = thisTime;
    for (var i = 0; i < game.people.length; i++) {
        game.people[i].doAction(game.people, game.things, staticData.actions);
        game.people[i].update(deltaTime);
    }
    update();

}