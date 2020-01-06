/**
 * Class to store a copy of a game state for the undo feature
 */
class SavedState {
    constructor(state) {
        this.board = state.board.board.map(arr => arr.slice());
        this.player1Tray = state.board.player1Group.pieces.map(frog => [frog.id, frog.pos]);
        this.player2Tray = state.board.player2Group.pieces.map(frog => [frog.id, frog.pos]);

        this.frogs = state.board.frogs.map(arr => arr.map(frog => frog === null ? null : [frog.id, frog.pos]));
    }
}