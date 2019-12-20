class BoardPiece extends CGFobject{
    constructor(scene, index, coords){
        super(scene);

        this.index = index;
        this.coords = coords;

        this.cube = new UnitCube(scene);
    }

    updateScaleFactors(){
        this.cube.updateScaleFactors();
    }

    display(){
        this.scene.registerForPick(this.index+1, this);
        this.scene.pushMatrix();
        this.scene.translate(-17.5 +  5*this.coords[0], 0, -17.5 + 5*this.coords[1]);
        this.scene.scale(5,0.2,5);
        this.cube.display();
        this.scene.popMatrix();
    }

}