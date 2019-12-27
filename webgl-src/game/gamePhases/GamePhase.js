class GamePhase {
    constructor(controller) {
        this.controller = controller;
        this.state = controller.state;
    }

    handlePick(coords) {
        throw TypeError("Methdo handlePick() must be implemented.");
    }

    buildInterface(int) {
    }

    switchTurn() {}
}