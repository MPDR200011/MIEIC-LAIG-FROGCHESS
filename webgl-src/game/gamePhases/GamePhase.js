/**
 * Class responsible for representing a phase in the game
 * Each phase has a associated interface, logic, etc. and all.
 * 
 * It is used by the GameController to specify what actions to take,
 * what interface to build at a specific moment, etc.
 */
class GamePhase {
    constructor(controller) {
        this.controller = controller;
        this.scene = controller.scene;
        this.state = controller.state;
    }

    // Used when the game phase requires any time oriented logic
    update(t) {}

    // Called by the GameController every frame, is mainly used to 
    // update the game state base on user input
    tick() {
    }

    // Called when the game switches phase to build the interface for the new
    // phase
    buildInterface(int) {
        int.gui.destroy();
        int.gui = new dat.GUI();
    }

    // Called when the phase is over
    destroy() {}
}