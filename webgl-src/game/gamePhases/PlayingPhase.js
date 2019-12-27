class PlayingPhase extends GamePhase {
    constructor(controller) {
        super(controller);

        this.pickedPos = null;
        this.jumped = false;
    }

    async checkSwamp() {
        let board = this.state.board;

        this.controller.waiting = true;

        let requestString =
        `http://localhost:8081/checkSwamp(${JSON.stringify(board)},${this.pickedPos[0]+1},${this.pickedPos[1]+1})`;
        let response = await fetch(requestString, {
            method: 'GET'
        });

        if (await response.json()) {
            board[this.pickedPos[1]][this.pickedPos[0]] = 0;
        }

        this.pickedPos = null;
        this.jumped = false;

        this.controller.waiting = false;

    }

    endTurn() {
        if (!this.jumped) {
            return;
        }

        this.checkSwamp();

        this.controller.switchTurn();
    }

    buildInterface(int) {
        int.resetControlsFolder();
        let folder = int.controlsFolder;
        folder.add(this, 'endTurn');
    }

    async handlePick(coords) {
        let currentPlayer = this.controller.currentPlayer;

        console.log(coords);
        let board = this.state.board;
        if (!this.pickedPos) {
            if (board[coords[1]][coords[0]] !== currentPlayer) {
                return null;
            }

            this.pickedPos = coords;

            return null;
        }

        if (board[coords[1]][coords[0]] === currentPlayer && !this.jump) {
            this.pickedPos = coords;
            return null;
        }

        let move = [...this.pickedPos, ...coords];
        console.log(move);
        let reqMove = move.map(x => x + 1);
        let requestString = 
        `http://localhost:8081/valid_move(${currentPlayer},${JSON.stringify(board)},${JSON.stringify(reqMove)})`;
        let response = await fetch(requestString, {
            method: 'GET'
        })

        if (!await response.json()) {
            return null;
        } 

        this.state.executeMove(currentPlayer, move);
        this.jumped = true;
        this.pickedPos = coords;

        return null;
    }
}