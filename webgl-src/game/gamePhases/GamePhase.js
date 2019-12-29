class GamePhase {
    constructor(controller) {
        this.controller = controller;
        this.scene = controller.scene;
        this.state = controller.state;
    }

    handlePick(coords) {
        throw TypeError("Methdo handlePick() must be implemented.");
    }

    buildInterface(int) {
    }

    async aiMove(){
        console.error("abstract class instanciated")
        throw TypeError("Methdo handlePick() must be implemented.");
    }

    switchTurn() {}
}