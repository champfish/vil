const thing = require('./thing');

class blueberryBush extends thing {
    constructor(x,y) {
        super(x,y,"Blueberry Bush", 'blueberryBush');
    }

    fillActions(){
    	this.actions.push('harvest');
    }
}

module.exports = blueberryBush;