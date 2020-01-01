class FrogDictionary {
    constructor() {
        this.frogs = {};
    }

    addFrog(frog) {
        this.frogs[frog.id] = frog;
    }
}