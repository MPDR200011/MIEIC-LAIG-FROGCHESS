class FrogGroup extends CGFobject {
    constructor(scene, player) {
        super(scene);
        this.pieces = [];
        for (let i = 0; i < 18; i++) {
            this.pieces.push(new Frog(scene,-25 + i*5,25, this.scene.frogModel) );
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

            let x = Math.floor(i/2);
            let y = i % 2;

            this.scene.pushMatrix();
            this.scene.translate(-20 + 5 * x, 0 , 28 - 5 * y);
            frog.display();
            this.scene.popMatrix();
        }
    }
}