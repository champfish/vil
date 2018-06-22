const action = require('./action');
const wanderMax = 200;


class wander extends action {
    constructor() {
        super();
        this.actionProgressLength = 5;
    }

    // gets the desire of a to do this action on b
    getDesire(a, b) {
        return 0.1;
    }

    // a does this action to b. Returns true if task completed false otherwise
    do(a, b) {
        if(a.distCor(a.targetX,a.targetY)<5 && !a.taskStarted){
            a.startTask();
        }
        if (a.actionProgress >= this.actionProgressLength) {
            console.log('wander done');
            return true;
        }
        return false;
    }

    start(a, b) {
        a.targetX = a.x + (Math.random()<0.5?1:-1) *Math.random() * wanderMax;
        a.targetY = a.y + (Math.random()<0.5?1:-1) *Math.random() * wanderMax;
    }

}

module.exports = wander;