class Board extends CGFobject{
    constructor(scene){
        super(scene);
        this.piece = new BoardPiece(scene);
    }



    updateScaleFactors(){
        this.piece.updateScaleFactors();
    }

    display(){
        this.scene.pushMatrix();
        this.scene.translate(2.5,0,2.5);
        this.piece.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(2.5,0,-2.5);
        this.piece.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-2.5,0,-2.5);
        this.piece.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-2.5,0,2.5);
        this.piece.display();
        this.scene.popMatrix();
    }

}