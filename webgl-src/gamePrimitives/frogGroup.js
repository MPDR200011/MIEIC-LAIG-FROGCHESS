class FrogGroup extends CGFobject {
    constructor(scene, player) {
        super(scene);
        this.pieces = [];
        this.offset = player === 1 ? 28 : -23;
        for (let i = 0; i < 18; i++) {
            this.pieces.push(new Frog(scene, this.getAbsolutePositionAtIndex(i), player) );
        }
    }

    updateScaleFactors() {
        for (let i = 0; i < this.pieces.length; i++) {
            this.pieces[i].updateScaleFactors();
        }
    }

    getNextPosition() {
        return this.getAbsolutePositionAtIndex(this.pieces.length);
    }

    getAbsolutePositionAtIndex(i) {
        let x = Math.floor(i/2);
        let y = i % 2;
        return [-20 + 5 * x, 0 , this.offset - 5 * y];
    }

    getTailFrog() {
        return this.pieces[this.pieces.length-1];
    }

    removeTailFrog() {
        this.pieces.splice(this.pieces.length-1, 1);
    }

    display() {
        for (let i = 0; i < this.pieces.length; i++) {
            this.pieces[i].display();
        }
    }
}