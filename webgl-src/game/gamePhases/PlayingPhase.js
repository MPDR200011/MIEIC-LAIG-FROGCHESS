class PlayingPhase extends GamePhase {
    constructor(controller) {
        super(controller);

        this.pickedPos = null;
        this.jumped = false;

        this.stateQueue = [];


        this.lastTime = null;
        this.player1Time = 3 * 60 * 1000;
        this.player2Time = 3 * 60 * 1000;

        this.times = [this.player1Time, this.player2Time];
    }

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

            model.groups[otherPlayer-1].pieces.push(frog);
        }
    }

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

    async aiMove(){
        let board = this.state.board.board
        let aiLevel = this.controller.aiDifficultyIndex;
        let requestString=`http://localhost:8081/choose_move(${JSON.stringify(board)},${aiLevel},${this.controller.currentPlayer})`;

        let response = await fetch(requestString, {
            method: 'GET'
        })
        let move = await response.json();
        move = move.map(x => x - 1);

        console.warn("ai move: "+move);
        this.state.board.executeMove(this.controller.currentPlayer,move);
        this.updateScores();
        this.jumped = true;
        this.pickedPos = [move[2],move[3]];
        this.endTurn();
    }

    async checkConditions() {
        let currentPlayer = this.controller.currentPlayer;
        this.controller.waiting = true;
        await this.checkSwamp(currentPlayer);
        await this.checkEnd(currentPlayer);
        this.controller.waiting = false;
    }

    endTurn() {
        if (!this.jumped) {
            return;
        }
        this.stateQueue = [];
        this.checkConditions();

        this.controller.switchTurn();
    }

    undo() {
        if (this.stateQueue.length < 1) {
            return;
        }

        let savedState = this.stateQueue[this.stateQueue.length-1];
        this.stateQueue.pop();
        
        this.state.board.resetState(savedState);
    }

    updateScores() {
        this.player1ScoreElement.innerHTML = 'Player 1 Score: ' + this.state.board.player1Group.pieces.length;
        this.player2ScoreElement.innerHTML = 'Player 2 Score: ' + this.state.board.player2Group.pieces.length;
    }

    formatTime(t) {
        let min = Math.floor(t/60);
        let sec = Math.floor(t%60);

        return `${min}:${sec}`;
    }

    update(t) {
        if (this.lastTime == null) {
            this.lastTime = t;
        }

        let currentPlayer = this.controller.currentPlayer;
        let elem = this.timeElements[currentPlayer - 1];
        this.times[currentPlayer-1] -= t - this.lastTime;
        if (this.times[currentPlayer-1] <= 0) {
            this.controller.switchPhase(new GameOverPhase(this.controller, currentPlayer === 1 ? 2 : 1));
        }
        elem.innerHTML = 'Player ' + currentPlayer + " time: " + this.formatTime(Math.floor(this.times[currentPlayer-1]/1000));

        this.lastTime = t;

    }

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
        this.player1TimeElement.innerHTML = 'Player 1 Time: ' + Math.floor(this.player1Time / 1000);
        this.scoreboard.appendChild(this.player1TimeElement);

        this.player2TimeElement = document.createElement('p');
        this.player2TimeElement.innerHTML = 'Player 2 Time: ' + Math.floor(this.player2Time / 1000);
        this.scoreboard.appendChild(this.player2TimeElement);

        this.timeElements = [this.player1TimeElement, this.player2TimeElement];

        document.body.prepend(this.scoreboard);
    }

    async tick() {
        this.controller.waiting = true;
        let currentPlayer = this.controller.currentPlayer;

        if(!this.controller.playerKinds[currentPlayer-1]){
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
        this.controller.inputQueue.splice(0,1);

        console.log(coords);
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
        console.log(move);
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
        this.state.board.executeMove(currentPlayer, move);
        this.updateScores();
        this.jumped = true;
        this.pickedPos = coords;

        this.controller.waiting = false;
        return;
    }


}