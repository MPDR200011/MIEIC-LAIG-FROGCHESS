class UnitCube extends CGFobject{
    constructor(scene){
        super(scene);
        this.plane = new MyRectangle(scene,"",-0.5,0.5,-0.5,0.5);
        
    }



    updateScaleFactors(){
        this.plane.updateScaleFactors();
    }

    display(){
        let ninty = Math.PI/2;
        this.plane.display();

        this.scene.pushMatrix();
        this.scene.translate(0,0.5,0);
        this.scene.rotate(-ninty,1,0,0);
        this.plane.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,-0.5,0);
        this.scene.rotate(ninty,1,0,0);
        this.plane.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,0,-0.5);
        this.scene.rotate(Math.PI,0,1,0);
        this.plane.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,0,0.5);
        this.plane.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.5,0,0);
        this.scene.rotate(-ninty,0,1,0);
        this.plane.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.5,0,0);
        this.scene.rotate(ninty,0,1,0);
        this.plane.display();
        this.scene.popMatrix();


    }

}