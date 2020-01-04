class GameSequence {
    constructor() {
        this.sequence = [];
        this.final = false;
    }

    addMove(move) {
        this.sequence.push(move);
    }

    undo(){
        return this.sequence.pop()
    }
}