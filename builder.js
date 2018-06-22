const fs = require('fs');
const person = require('./things/person');
const blueberryBush = require('./things/blueberryBush');
const bed = require('./things/bed');
var action = require('./actions/action');
class builder {
    constructor() {}
    getStatic() {
        var staticData = {};
        staticData.actions = new Map();
        fs.readdirSync('./actions').forEach(file => {
            console.log(file + ' action loaded.');
            var a = require('./actions/' + file);
            staticData.actions.set(file.substring(0, file.lastIndexOf('.')), new a());
        });

        staticData.sprites = [];
        fs.readdirSync('./public/img').forEach(file => {
            console.log(file + ' sprite name loaded.');
            staticData.sprites.push(file.substring(0, file.lastIndexOf('.')));
        });
        return staticData;
    }

    getGame() {
        var game = {};
        game.people = [];
        var adam = new person(0, 0, "Adam");
        game.people.push(adam);

        var jean = new person(50, 50, "Jean");
        game.people.push(jean);

        game.things = [];
        var bush = new blueberryBush(0, -150);
        game.things.push(bush);

        var bedi = new bed(50, 150);
        game.things.push(bedi);

        return game;
    }
}

module.exports = builder;