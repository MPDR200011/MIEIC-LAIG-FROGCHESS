/**
 * Totem statue primitive
 */
class Totem extends CGFobject{
    constructor(scene){
        super(scene);
        this.model = this.scene.totem;//obj model
    }

    updateScaleFactors(){}
    display(){
        this.model.display();
    }
}
