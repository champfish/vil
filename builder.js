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
        game.things = {};
        game.peopleKeys = [];
        
        var adam = new person(100,0, 0, "Adam");
        game.things[adam.id]=adam;
        game.peopleKeys.push(adam.id);

        var jean = new person(101,50, 50, "Jean");
        game.things[jean.id]=jean;
        game.peopleKeys.push(jean.id);

        var bush = new blueberryBush(200,0, -150);
        game.things[bush.id]=bush;

        var bedi = new bed(201,50, 150);
        game.things[bedi.id]=bedi;

        return game;
    }
}

module.exports = builder;