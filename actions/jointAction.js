const action = require('./action');


class jointAction extends action {
    constructor() {
        super();
        this.actionProgressLength = 10;
        this.jointAction = true;
    }

    // gets the desire of a to do this action on b
    getDesire(a, b) {
        var aDesire = a.libido + a.distMod(Math.max(1, a.dist(b)));
        var bDesire = b.libido + b.distMod(Math.max(1, b.dist(a)));
    }

    // a does this action to b
    do(a, b) {
        if (a.dist(b) < 50) {
            if (!a.taskStarted) {
                a.startTask();
                b.startTask;
            }
        } else {
            a.targetX = b.x;
            a.targetY = b.y;
        }
    }
}

module.exports = jointAction;