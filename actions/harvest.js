const action = require('./action');


class harvest extends action {
    constructor() {
        super();
        this.actionProgressLength = 10;
    }

    // gets the desire of a to do this action on b
    getDesire(a, b) {
        return a.hunger + a.distMod(Math.max(1, a.dist(b)));
    }

    // a does this action to b. Returns true if finished, else false
    do(a, b) {
        if (a.actionProgress >= this.actionProgressLength) {
            a.hunger = 0;
            return true;
        } else {
            super.do(a, b);
        }
        return false;
    }
}

module.exports = harvest;