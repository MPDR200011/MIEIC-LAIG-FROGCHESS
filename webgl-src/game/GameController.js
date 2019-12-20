class GameController {
    constructor(scene, state) {
        this.scene = scene;
    
        this.phases = ['loading','building','playing','end'];
        this.curentPhase = 'building';

        this.currentPlayer = 1;

        this.state = state;

    }

    initialize() {
        this.board = this.scene.graph.primitives['boardPiece'];
    }
}