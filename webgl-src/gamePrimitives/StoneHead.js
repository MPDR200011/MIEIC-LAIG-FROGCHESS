/**
 * StoneHead primitive
 */
class StoneHead extends CGFobject{
    constructor(scene){
        super(scene);
        this.model = this.scene.stoneHead;//stoneHead model
    }

    updateScaleFactors(){
        return;
    }

    display(){
        this.model.display();
    }
}