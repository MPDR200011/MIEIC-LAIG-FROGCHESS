class GameSequence {
    constructor() {
        this.sequence = []
    }

    addMove(move) {
        this.sequence.push(move);
    }

    undo(){
        return this.sequence.pop()
    }
}