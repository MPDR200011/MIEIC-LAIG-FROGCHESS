class BuildingPhase extends GamePhase {
    constructor(controller) {
        super(controller);
    }

    async aiMove(){
        
        let currentPlayer = this.controller.currentPlayer;
        let board = this.state.board.board
        let requestString = `http://localhost:8081/place_frog(${JSON.stringify(board)},${'X'})`
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


    async handlePick(coords) {
        let currentPlayer = this.controller.currentPlayer;

        let boardString = JSON.stringify(this.state.board.board);
        let coordsString = JSON.stringify([coords[0]+1, coords[1]+1]);

        let requestString = `http://localhost:8081/isPlaceable(${boardString},${coordsString})`;
        let response = await fetch(requestString, {
            method: 'GET',
        });
        
        if (await response.json()) {
            this.state.board.placeFrog(currentPlayer, coords[0], coords[1]);
        } else {
            console.log('you idiot');
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
            return;
        }

        this.controller.switchTurn();

        return;
    }
}