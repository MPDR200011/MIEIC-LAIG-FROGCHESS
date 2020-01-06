class PlayingPhase extends GamePhase {
    constructor(controller) {
        super(controller);

        this.pickedPos = null;
        this.jumped = false;

        this.stateQueue = [];
        this.posQueue = [];


        this.lastTime = null;
        this.player1Time = 3 * 60 * 1000;
        this.player2Time = 3 * 60 * 1000;

        this.times = [this.player1Time, this.player2Time];
    }
    //ask prolog to check if the the player is in a swap position, and removes the piece if the case
    async checkSwamp(currentPlayer) {
        let model = this.state.board;

        let requestString =
            `http://localhost:8081/checkSwamp(${JSON.stringify(model.board)},${this.pickedPos[0]+1},${this.pickedPos[1]+1})`;
        let response = await fetch(requestString, {
            method: 'GET'
        });

        if (await response.json()) {
            let frog = model.frogs[this.pickedPos[1]][this.pickedPos[0]];

            let otherPlayer = currentPlayer === 1 ? 2 : 1;

            this.scene.animationController
                .animateFromTableToTray(frog, otherPlayer);

            model.board[this.pickedPos[1]][this.pickedPos[0]] = -1;
            model.frogs[this.pickedPos[1]][this.pickedPos[0]] = null;

            model.groups[otherPlayer - 1].pieces.push(frog);
        }
    }
    /**
     * asks prolog to check if there are no more moves left for the currentPlayer
     *if the game is over creates the animator for the replay
     */
    async checkEnd(currentPlayer) {
        let board = this.state.board.board;

        const otherPlayer = currentPlayer === 1 ? 2 : 1;

        let requestString =
            `http://localhost:8081/game_over(${JSON.stringify(board)},${otherPlayer},${currentPlayer})`;
        let response = await fetch(requestString, {
            method: 'GET'
        });

        let result = await response.json();

        if (result) {
            this.controller.createAnimator();
            this.controller.switchPhase(new GameOverPhase(this.controller, result));
        }


        this.pickedPos = null;
        this.jumped = false;
        this.stateQueue = [];

    }
/**
 * ask prolog to make an ai move and applies it to the board model
 */
    async aiMove() {
        let board = this.state.board.board
        let aiLevel = this.controller.aiDifficultyIndex;
        let requestString = `http://localhost:8081/choose_move(${JSON.stringify(board)},${aiLevel},${this.controller.currentPlayer})`;

        let response = await fetch(requestString, {
            method: 'GET'
        })
        let move = await response.json();
        move = move.map(x => x - 1);

        console.warn("ai move: " + move);
        this.state.board.executeMove(this.controller.currentPlayer, move);
        this.updateScores();
        this.jumped = true;
        this.pickedPos = [move[2], move[3]];
        this.endTurn();
    }
    /**
     * checks the conditions after passing the turn
     */
    async checkConditions() {
        let currentPlayer = this.controller.currentPlayer;
        this.controller.waiting = true;
        await this.checkSwamp(currentPlayer);
        await this.checkEnd(currentPlayer);
        this.controller.waiting = false;
    }
    /**
     * ends the current player's turn
     */
    endTurn() {
        if (!this.jumped) {
            return;
        }
        this.stateQueue = [];
        this.checkConditions();

        this.controller.switchTurn();
    }
    /**
     * resets the board to the state stores on a stack
     */
    undo() {
        if (this.stateQueue.length < 1) {
            return;
        }

        let savedState = this.stateQueue[this.stateQueue.length - 1];
        this.stateQueue.pop();
        let pos = this.posQueue[this.posQueue.length - 1];
        this.posQueue.pop();
        this.pickedPos = pos;
        this.state.board.resetState(savedState);
    }
    /**
     * updates the scores on the interface
     */
    updateScores() {
        this.player1ScoreElement.innerHTML = 'Player 1 Score: ' + this.state.board.player1Group.pieces.length;
        this.player2ScoreElement.innerHTML = 'Player 2 Score: ' + this.state.board.player2Group.pieces.length;
    }
    /**
     * 
     * formats the time t to minutes and seconds
     */
    formatTime(t) {
        let min = Math.floor(t / 60);
        let sec = Math.floor(t % 60);

        return `${min}:${sec}`;
    }
    /**
     * 
     * updates the logic on the phase
     */
    update(t) {
        if (this.lastTime == null) {
            this.lastTime = t;
        }

        let currentPlayer = this.controller.currentPlayer;
        let elem = this.timeElements[currentPlayer - 1];
        this.times[currentPlayer - 1] -= t - this.lastTime;
        if (this.times[currentPlayer - 1] <= 0) {
            this.controller.createAnimator();
            this.controller.switchPhase(new GameOverPhase(this.controller, currentPlayer === 1 ? 2 : 1));
        }
        elem.innerHTML = 'Player ' + currentPlayer + " Time: " + this.formatTime(Math.floor(this.times[currentPlayer - 1] / 1000));

        this.lastTime = t;

    }
    /**
     * removes scoreboard
     */
    destroy() {
        document.body.removeChild(this.scoreboard);
    }

    buildInterface(int) {
        int.gui.destroy();
        int.gui = new dat.GUI();
        int.gui.add(this, 'undo').name('Undo');
        int.gui.add(this, 'endTurn').name("End Turn");

        this.scoreboard = document.createElement('div');
        this.scoreboard.id = 'scoreboard';

        this.player1ScoreElement = document.createElement('p');
        this.player1ScoreElement.innerHTML = 'Player 1 Score: 0';
        this.scoreboard.appendChild(this.player1ScoreElement);

        this.player2ScoreElement = document.createElement('p');
        this.player2ScoreElement.innerHTML = 'Player 2 Score: 0';
        this.scoreboard.appendChild(this.player2ScoreElement);

        this.scoreElements = [this.player1ScoreElement, this.player2ScoreElement];

        this.player1TimeElement = document.createElement('p');
        this.player1TimeElement.innerHTML = 'Player 1 Time: ' + this.formatTime(Math.floor(this.player1Time / 1000));
        this.scoreboard.appendChild(this.player1TimeElement);

        this.player2TimeElement = document.createElement('p');
        this.player2TimeElement.innerHTML = 'Player 2 Time: ' + this.formatTime(Math.floor(this.player2Time / 1000));
        this.scoreboard.appendChild(this.player2TimeElement);

        this.timeElements = [this.player1TimeElement, this.player2TimeElement];

        document.body.prepend(this.scoreboard);
    }

    async tick() {
        this.controller.waiting = true;
        let currentPlayer = this.controller.currentPlayer;

        if (!this.controller.playerKinds[currentPlayer - 1]) {
            if (this.controller.currentTime <= this.controller.botThreshold) {
                this.controller.waiting = false;
                return;
            }
            await this.aiMove();
            this.controller.botThreshold = this.controller.currentTime + 1000;
            this.controller.waiting = false;
            return;
        }

        const coords = this.controller.inputQueue[0];

        if (!coords) {
            this.controller.waiting = false;
            return;
        }
        this.controller.inputQueue.splice(0, 1);

        let board = this.state.board.board;
        if (!this.pickedPos) {
            if (board[coords[1]][coords[0]] !== currentPlayer) {
                this.controller.waiting = false;
                return;
            }

            this.pickedPos = coords;

            this.controller.waiting = false;
            return;
        }

        if (board[coords[1]][coords[0]] === currentPlayer && !this.jump) {
            if (this.jumped) {
                this.controller.waiting = false;
                return;
            }
            this.pickedPos = coords;
            this.controller.waiting = false;
            return;
        }

        let move = [...this.pickedPos, ...coords];
        let reqMove = move.map(x => x + 1);
        let requestString =
            `http://localhost:8081/valid_move(${currentPlayer},${JSON.stringify(board)},${JSON.stringify(reqMove)})`;
        let response = await fetch(requestString, {
            method: 'GET'
        })

        if (!await response.json()) {
            this.controller.waiting = false;
            return;
        }

        this.stateQueue.push(new SavedState(this.state));
        this.posQueue.push(this.pickedPos);
        this.state.board.executeMove(currentPlayer, move);
        this.updateScores();
        this.jumped = true;
        this.pickedPos = coords;

        this.controller.waiting = false;
        return;
    }


}