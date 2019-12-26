class GameController {
    constructor(scene, state) {
        this.scene = scene;
    
        this.phases = ['loading','building','playing','end', 'awaiting'];
        this.currentPhase = 'building';

        this.currentPlayer = 1;

        this.state = state;

    }

    async picked(coords) {
        if (this.currentPhase === 'awaiting') {
            return;
        }

        let boardString = JSON.stringify(this.state.board);
        let reqCoords = [coords[0]+1, coords[1]+1];
        let coordsString = JSON.stringify(reqCoords);

        switch (this.currentPhase) {
            case 'building':
                this.currentPhase = 'awaiting';

                let requestString = `http://localhost:8081/is_empty_cell(${boardString},${coordsString})`;
                let response = await fetch(requestString, {
                    method: 'GET',
                });
                
                if (await response.json()) {
                    this.state.board[coords[1]][coords[0]] = this.currentPlayer;
                } else {
                    this.currentPhase = 'building';
                    console.log('you idiot');
                    return;
                }

                boardString = JSON.stringify(this.state.board);
                requestString = `http://localhost:8081/boardComplete(${boardString})`;
                response = await fetch(requestString, {
                    method: 'GET',
                });

                if (await response.json()) {
                    //next phase
                } else {
                    this.currentPlayer = this.currentPlayer == 1 ? 2 : 1;
                    this.currentPhase = 'building';
                }
        }
    }

    initialize() {
        this.board = this.scene.graph.primitives['boardPiece'];
    }
}