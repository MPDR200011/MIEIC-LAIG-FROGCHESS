class Board extends CGFobject {
    constructor(scene) {
        super(scene);
        this.piece = new BoardPiece(scene);
    }



    updateScaleFactors() {
        this.piece.updateScaleFactors();
    }

    display() {

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {

                this.scene.pushMatrix();
                this.scene.translate(-17.5 +  5*i, 0, -17.5 + 5*j);
                this.piece.display();
                this.scene.popMatrix();
            }
        }
    }


}