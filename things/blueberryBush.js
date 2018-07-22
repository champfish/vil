const thing = require('./thing');

class blueberryBush extends thing {
    constructor(id,x,y) {
        super(id,x,y,"Blueberry Bush", 'blueberryBush');
    }

    fillActions(){
    	this.actions.push('harvest');
    }
}

module.exports = blueberryBush;