class BoardPiece extends CGFobject{
    constructor(scene){
        super(scene);
        this.cube = new UnitCube(scene);
    }

    updateScaleFactors(){
        this.cube.updateScaleFactors();
    }

    display(){
        this.scene.pushMatrix();
        this.scene.scale(5,0.2,5);
        this.cube.display();
        this.scene.popMatrix();
    }

}