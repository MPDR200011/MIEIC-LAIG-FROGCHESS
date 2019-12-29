class GamePhase {
    constructor(controller) {
        this.controller = controller;
        this.scene = controller.scene;
        this.state = controller.state;
    }

    tick() {
        throw TypeError("Methdo handlePick() must be implemented.");
    }

    buildInterface(int) {
    }

    switchTurn() {}
}