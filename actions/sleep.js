const action = require('./action');


class sleep extends action {
    constructor() {
        super();
        this.actionProgressLength = 60;
    }

    // gets the desire of a to do this action on b
    getDesire(a, b) {
        return a.sleepiness + a.distMod(Math.max(1, a.dist(b)));
    }

    // a does this action to b
    do(a, b) {
        if (a.actionProgress >= this.actionProgressLength) {
            a.sleepiness = 0;
            return true;
        }else{
            super.do(a,b);
            return false;
        }
    }
}

module.exports = sleep;
