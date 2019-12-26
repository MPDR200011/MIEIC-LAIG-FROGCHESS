class Frog extends CGFobject{
    constructor(scene, x,z, frogModel){
        super(scene)
        this.coords= []
        this.coords.push(x)
        this.coords.push(z)
        this.frog = frogModel;
    }


    updateScaleFactors(){
        return;
    }

    updateCoords(x,y){
        this.coords=[x,y]
    }
    
    display(){
        this.frog.display();
    }

}