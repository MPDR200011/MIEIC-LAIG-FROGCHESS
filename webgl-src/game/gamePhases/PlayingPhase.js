class PlayingPhase extends GamePhase {
    constructor(controller) {
        super(controller);

        this.pickedPos = null;
        this.jumped = false;
    }

    async checkSwamp(currentPlayer) {
        let model = this.state.board;

        let requestString =
        `http://localhost:8081/checkSwamp(${JSON.stringify(model.board)},${this.pickedPos[0]+1},${this.pickedPos[1]+1})`;
        let response = await fetch(requestString, {
            method: 'GET'
        });

        if (await response.json()) {
            this.scene.animationController
            .animateFromTableToTray(...this.pickedPos, currentPlayer);

            let frog = model.frogs[this.pickedPos[1]][this.pickedPos[0]];

            model.board[this.pickedPos[1]][this.pickedPos[0]] = 0;
            model.frogs[this.pickedPos[1]][this.pickedPos[0]] = null;

            model.groups[currentPlayer-1].pieces.push(frog);
        }

        this.pickedPos = null;
        this.jumped = false;


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
            console.log(result + " victory.");
        }

    }

    async aiMove(){
        let board = this.state.board.board
        let aiLevel = this.controller.aiDifficultyIndex;
        let requestString=`http://localhost:8081/choose_move(${JSON.stringify(board)},${aiLevel},${this.controller.currentPlayer},${'X'})`;

        let response = await fetch(requestString, {
            method: 'GET'
        })
        let move = await response.json();
        move = move.map(x => x - 1);

        console.warn("ai move: "+move);
        this.state.board.executeMove(this.controller.currentPlayer,move);
        this.jumped= true
        this.pickedPos = [move[2],move[3]]
        this.endTurn();
        return null;


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

        this.checkConditions();

        this.controller.switchTurn();
    }

    buildInterface(int) {
        //int.resetControlsFolder();
        let folder = int.controlsFolder;
        folder.add(this, 'endTurn').name("End Turn");
    }


    async handlePick(coords) {
        if(this.controller.isAIturn === true){
            console.log("yes it ai turn, ")
            return;
        }
        let currentPlayer = this.controller.currentPlayer;

        console.log(coords);
        let board = this.state.board.board;
        if (!this.pickedPos) {
            if (board[coords[1]][coords[0]] !== currentPlayer) {
                return null;
            }

            this.pickedPos = coords;

            return null;
        }

        if (board[coords[1]][coords[0]] === currentPlayer && !this.jump) {
            if (this.jumped) {
                return null;
            }
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

        this.state.board.executeMove(currentPlayer, move);
        this.jumped = true;
        this.pickedPos = coords;

        return null;
    }


}