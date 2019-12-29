class MaterialDict {
    constructor(scene) {
        this.scene = scene;

        const player1Mat = new CGFappearance(this.scene);
        player1Mat.setAmbient(0,0.3,0,1)
        player1Mat.setDiffuse(0,1,0,1);

        const player2Mat = new CGFappearance(this.scene);
        player2Mat.setAmbient(0.3,0,0,1)
        player2Mat.setDiffuse(1,0,0,1);

        this.playerMaterials= {
            1: player1Mat,
            2: player2Mat
        }
    }
}