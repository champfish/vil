class action {
    constructor() {}

    // gets the desire of a to do this action on b
    getDesire(a, b) {
        return a.dist(b);
    }

    // a starts doign this action to b
    start(a,b){
    }

    // a does this action to b
    do(a, b) {
        if (a.dist(b) < 50) {
            a.targetX = false;
            a.targetY = false;
            if (!a.taskStarted) {
                a.startTask();
            }
        } else {
            a.targetX = b.x;
            a.targetY = b.y;
        }
    }

    getRand() {
        return 4;
    }
}

module.exports = action;