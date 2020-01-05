class StoneHead extends CGFobject{
    constructor(scene){
        super(scene);
        this.model = this.scene.stoneHead;
    }

    updateScaleFactors(){
        return;
    }

    display(){
        this.model.display();
    }
}