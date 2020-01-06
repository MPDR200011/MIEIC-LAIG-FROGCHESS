/**
 * Class for keeping track of what frogs exist in the game.
 */
class FrogDictionary {
    constructor() {
        this.frogs = {};
    }

    addFrog(frog) {
        this.frogs[frog.id] = frog;
    }
}