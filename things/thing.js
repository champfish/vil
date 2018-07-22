class thing {
    constructor(id, x, y, name, spriteName) {
        this.id = id;
        this.x = x;
        console.log('this.x is ' + this.x);
        this.y = y;
        this.name = name;
        this.actions = []; // strings of action names
        this.selfActions = []; // string of action names that can do on oneself (for person)
        this.fillActions();
        this.sprite = spriteName;
    }

    fillActions() {
        console.log('this is defined');
    }

    dist(b) {
        return Math.sqrt(Math.pow(b.x - this.x, 2) + Math.pow(b.y - this.y, 2));
    }

    distCor(x,y) {
        return Math.sqrt(Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2));
    }
}

module.exports = thing;