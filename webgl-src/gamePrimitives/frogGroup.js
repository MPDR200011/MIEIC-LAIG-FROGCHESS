class FrogGroup extends CGFobject {
    constructor(scene, player) {
        super(scene);
        this.pieces = [];
        let frogModel = new CGFOBJModel(scene,"scenes/models/Frog.obj")
        if (player === 1) {
            for (let i = 0; i < 18; i++) {
                this.pieces.push(new Frog(scene,-25 + i*5,25, frogModel) )


            }
        } else {

            for (let i = 0; i < 18; i++) {
                this.pieces.push(new Frog(scene,-25 + i*5,-25, frogModel) )
                

            }
        }

    }

    updateScaleFactors() {
        for (let i = 0; i < this.pieces.length; i++) {
            this.pieces[i].updateScaleFactors();
        }
    }


    display() {
        for (let i = 0; i < this.pieces.length; i++) {
            let frog = this.pieces[i]
            this.scene.pushMatrix()
            this.scene.translate(frog.coords[0],0,frog.coords[1])
            frog.display();
            this.scene.popMatrix()
        }
    }
}