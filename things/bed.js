const thing = require('./thing');

class bed extends thing {
    constructor(x,y) {
        super(x,y,"bed",'bed');
    }

    fillActions(){
    	this.actions.push('sleep');
    }
}

module.exports = bed;