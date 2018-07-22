const thing = require('./thing');

class bed extends thing {
    constructor(id,x,y) {
        super(id,x,y,"bed",'bed');
    }

    fillActions(){
    	this.actions.push('sleep');
    }
}

module.exports = bed;