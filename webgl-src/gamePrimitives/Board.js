class Board extends CGFobject {
    constructor(scene) {
        super(scene);
        this.pieces = [];
        for (let i = 0; i < 64; i++) {
            let coords = [i%8, Math.floor(i/8)];
            this.pieces.push(new BoardPiece(this.scene, i, coords));
        }
    }

    updateScaleFactors() {
        for (let i = 0; i < this.pieces.length; i++) {
            this.pieces[i].updateScaleFactors();
        }
    }

    display() {
        for (let i = 0; i < this.pieces.length; i++) {
            this.pieces[i].display();
        }
    }

}