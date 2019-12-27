class GameController {
    constructor(scene, state) {
        this.scene = scene;
    
        this.currentPlayer = 1;
        this.waiting = true;

        this.state = state;

    }

    switchTurn() {
        this.currentPhase.switchTurn();
        this.currentPlayer = this.currentPlayer === 1 ? 2 : 1; 

        console.log("It is now player " + this.currentPlayer + " turn.");
    }

    switchPhase(newPhase) {
        this.currentPlayer = 1;
        this.currentPhase = newPhase;
        this.currentPhase.buildInterface(this.scene.interface);
    }

    async picked(coords) {
        if (this.waiting) {
            return;
        }

        this.waiting = true;

        await this.currentPhase.handlePick(coords);

        this.waiting = false;
    }

    initialize() {
        this.board = this.scene.graph.primitives['boardPiece'];
        this.switchPhase(new PlayingPhase(this));
        this.waiting = false;
    }
}