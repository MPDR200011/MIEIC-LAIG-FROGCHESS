/**
 * Stores the moves made in the game
 */
class GameSequence {
    constructor() {
        this.sequence = [];
        this.final = false;//flag that makes sure that the moves made by the replay aren't stored
    }

    addMove(move) {
        this.sequence.push(move);
    }

    undo(){
        return this.sequence.pop()
    }
}