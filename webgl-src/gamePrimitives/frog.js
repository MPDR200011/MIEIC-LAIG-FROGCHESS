class Frog extends CGFobject{
    constructor(scene, pos, player){
        super(scene)
        this.frog = this.scene.frogModel;
        this.pos = pos;
        this.player = player;
    }

    updateScaleFactors(){
        return;
    }
    
    display(){
        this.scene.materialDict.playerMaterials[this.player].apply();
        this.scene.pushMatrix();
        this.scene.translate(...this.pos);
        if (this.player == 2) {
            this.scene.rotate(Math.PI, 0, 1, 0);
        }
        this.frog.display();
        this.scene.popMatrix();
    }

}