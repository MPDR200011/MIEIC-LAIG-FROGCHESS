class Frog extends CGFobject{
    constructor(scene, x,z, frogModel){
        super(scene)
        this.frog = frogModel;
    }


    updateScaleFactors(){
        return;
    }
    
    display(){
        this.frog.display();
    }

}