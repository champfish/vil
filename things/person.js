const thing = require('./thing');

class person extends thing {
    constructor(id, x, y, name) {
        super(id, x, y, name, 'adam');
        this.targetX = false;
        this.targetY = false;
        this.speed = 10;

        this.hunger = 0;
        this.hungerRate = 0.1;
        this.sleepiness = 0;
        this.sleepinessRate = 0.1;
        this.libido = 0;
        this.libidoRate = 0.025;

        this.taskStarted = false;
        this.actionProgress = 0;

        this.currentAction = false;
        this.currentDesire = 0;

        this.isPerson = true;
    }

    fillActions() {
        this.actions.push('sex');
        this.selfActions.push('wander');
    }

    // selects the most desireable action and then does it
    doAction(peopleKeys, things, actions) {
        if (this.currentAction !== false) {
            this.currentDesire = this.currentAction.getDesire(this, things[this.currentDesireThing]); // update desire to do current action
        }
        var bestDesire = 0;
        var bestAction;
        var bestDesireThing;

        var keys = Object.keys(things);
        for (var i = 0; i < keys.length; i++) {
            var actionNames = things[keys[i]].actions;
            for (var n = 0; n < actionNames.length; n++) {
                // get the desire of this to do actionName[n] towards thing[i]
                var action = actions.get(actionNames[n]);
                var desire = action.getDesire(this, things[keys[i]]);
                if (desire > bestDesire) {
                    bestDesire = desire;
                    bestAction = actions.get(actionNames[n]);
                    bestDesireThing = keys[i];
                }
            }
        }

        for (var i = 0; i < this.selfActions.length; i++) {
            var action = actions.get(this.selfActions[i]);
            var desire = action.getDesire(this, this);
            if (desire > bestDesire) {
                bestDesire = desire;
                bestAction = action;
                bestDesireThing = null;
            }
        }

        if (bestDesire > 1.5 * this.currentDesire) {
            console.log('staring with ' + bestDesire);
            this.resetAction();
            bestAction.start(this, bestDesireThing); // start the new action
            this.currentAction = bestAction;
            this.currentDesire = bestDesire;
            this.currentDesireThing = bestDesireThing;
        } else if (this.currentAction != false) {
            var complete = this.currentAction.do(this, things[this.currentDesireThing]);
            if (complete) {
                if (this.currentAction.isJointAction) {
                    game.things[this.currentDesireThing].resetAction(); // resets joint action person too
                }
                this.resetAction();
            }
        }
    }

    resetAction() {
        this.taskStarted = false;
        this.currentAction = false;
        this.currentDesire = 0;
        this.currentDesireThing = false;
        this.actionProgress = 0;
        this.targetX = false;
        this.targetY = false;
    }

    update(deltaTime) {
        if (this.taskStarted) {
            this.actionProgress += deltaTime;
        }
        this.hunger += this.hungerRate * deltaTime;
        this.sleepiness += this.sleepinessRate * deltaTime;
        this.libido += this.libidoRate * deltaTime;
        if (this.targetX !== false && this.targetY !== false) { // 0 == false for some reason
            var distToTarget = Math.sqrt(Math.pow(this.targetX - this.x, 2) + Math.pow(this.targetY - this.y, 2));
            if (distToTarget != 0) {
                var distTraveled = this.speed * deltaTime;
                var dX = distTraveled * ((this.targetX - this.x) / distToTarget);
                var dY = distTraveled * ((this.targetY - this.y) / distToTarget);
                this.x += dX;
                this.y += dY;
            }
        }
    }
    startTask() {
        this.taskStarted = true;
        this.targetX = false;
        this.targetY = false;
    }

    distMod(dist) {
        return -0.3 * Math.log(dist / this.speed);
    }
}

module.exports = person;