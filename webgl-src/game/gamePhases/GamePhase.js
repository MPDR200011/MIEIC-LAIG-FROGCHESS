class GamePhase {
    constructor(controller) {
        this.controller = controller;
        this.scene = controller.scene;
        this.state = controller.state;
    }

    tick() {
    }

    buildInterface(int) {
        int.gui.destroy();
        int.gui = new dat.GUI();
    }

    switchTurn() {}
}