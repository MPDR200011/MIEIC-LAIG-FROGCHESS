class frogGroup extends CGFobject{
    constructor(scene){
        super(scene);
        this.pieces = [];
        for(let i = 0; i < 18; i++){
        


        }

    }

    updateScaleFactors() {
        for (let i = 0; i < this.pieces.length; i++) {
            this.pieces[i].updateScaleFactors();
        }
    }


    display() {
        for (let i = 0; i < this.pieces.length; i++) {
            this.pieces[i].display();
        }
    }
}