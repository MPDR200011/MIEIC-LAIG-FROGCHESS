class Frog extends CGFobject{
    constructor(scene,frogModel){
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