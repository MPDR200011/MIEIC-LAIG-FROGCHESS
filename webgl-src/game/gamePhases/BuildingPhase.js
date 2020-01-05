class BuildingPhase extends GamePhase {
    constructor(controller) {
        super(controller);
    }

    async aiMove(){

        let currentPlayer = this.controller.currentPlayer;
        let board = this.state.board.board
        let requestString = `http://localhost:8081/place_frog(${JSON.stringify(board)})`
        let response = await fetch(requestString, {
            method: 'GET'
        })
        let move = await response.json();
        let coords = move.map(x => x - 1);
        console.log("Placing at: "+coords)

        this.state.board.placeFrog(currentPlayer, coords[0], coords[1]);

        let boardString = JSON.stringify(this.state.board.board);
        requestString = `http://localhost:8081/boardComplete(${boardString})`;
        response = await fetch(requestString, {
            method: 'GET',
        });

        if (await response.json()) {
            console.log("complete");
            this.controller.switchPhase(new PlayingPhase(this.controller));
            return;
        }
        
        this.controller.switchTurn();
    }


    async tick() {
        this.controller.waiting = true;
        let currentPlayer = this.controller.currentPlayer;

        let kind =this.controller.playerKinds[currentPlayer-1];
         
        if (!kind) {
            if (this.controller.currentTime <= this.controller.botThreshold) {
                this.controller.waiting = false;
                return;
            }
            await this.aiMove();
            this.controller.botThreshold = this.controller.currentTime + 100;
            this.controller.waiting = false;
            return;
        }

        let coords = this.controller.inputQueue[0];

        if (!coords) {
            this.controller.waiting = false;
            return;
        }
        this.controller.inputQueue.splice(0,1);

        let boardString = JSON.stringify(this.state.board.board);
        let coordsString = JSON.stringify([coords[0]+1, coords[1]+1]);

        let requestString = `http://localhost:8081/isPlaceable(${boardString},${coordsString})`;
        let response = await fetch(requestString, {
            method: 'GET',
        });
        
        if (await response.json()) {
            const x = coords[0];
            const y = coords[1];

            this.state.board.placeFrog(currentPlayer, x, y);
        } else {
            this.controller.waiting = false;
            return;
        }

        boardString = JSON.stringify(this.state.board.board);
        requestString = `http://localhost:8081/boardComplete(${boardString})`;
        response = await fetch(requestString, {
            method: 'GET',
        });

        if (await response.json()) {
            console.log("complete");
            this.controller.switchPhase(new PlayingPhase(this.controller));
            this.controller.waiting = false;
            return;
        }

        this.controller.switchTurn();

        this.controller.waiting = false;
        return;
    }
}