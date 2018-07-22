const jointAction = require('./jointAction');


class sex extends jointAction {
    constructor() {
        super();
        this.actionProgressLength = 10;
    }

    // gets the desire of a to do this action on b
    getDesire(a, b) {
        var aDesire = a.libido + a.distMod(Math.max(1, a.dist(b)));
        var bDesire = b.libido + b.distMod(Math.max(1, b.dist(a)));
        if(bDesire<b.currentDesire) {
            aDesire = -1000;
        }
        return aDesire;
    }

    // a does this action to b
    do(a, b) {
        console.log('doing the sex');
        if (a.actionProgress >= this.actionProgressLength) {
            a.libido = 0;
            b.libido = 0;
            return true;
        }else{
            super.do(a,b);
        }
        return false;
    }
}

module.exports = sex;
