class Totem extends CGFobject{
    constructor(scene){
        super(scene);
        this.model = this.scene.totem;
    }

    updateScaleFactors(){}
    display(){
        this.model.display();
    }
}
