class GameController {
    constructor(scene, state) {
        this.scene = scene;
    
        this.currentPlayer = 1;
        this.waiting = true;

        this.state = state;

        this.gameMode = {"P vs P" : 0, "P vs AI": 1, "AI vs P": 2, "AI vs AI":3};
        this.gameModeIndex = 0;

        this.aiDifficulty = {"level 0" : 0, "level 1": 1};
        this.aiDifficultyIndex = 0;

    }

    switchTurn() {
        this.currentPhase.switchTurn();
        this.currentPlayer = this.currentPlayer === 1 ? 2 : 1; 

        console.log("It is now player " + this.currentPlayer + " turn.");

        if(this.isAIturn()){
            console.log("ai turn")
            this.waiting = true;
            this.currentPhase.aiMove();
            this.waiting = false;
            console.log("end of ai turn")
        }
    }

    switchPhase(newPhase) {
        this.currentPlayer = 1;
        this.currentPhase = newPhase;
        this.currentPhase.buildInterface(this.scene.interface);
        console.log("switching phase: " + newPhase)
    }

    async picked(coords) {
        if (this.waiting) {
            return;
        }

        this.waiting = true;

        await this.currentPhase.handlePick(coords);

        this.waiting = false;
    }

    initialize() {
        this.board = this.scene.graph.primitives['boardPiece'];
        this.switchPhase(new BuildingPhase(this));
        this.waiting = false;
    }

    isAIturn(){
        if(this.currentPlayer == 1){
            return this.gameModeIndex == 2||this.gameModeIndex == 3
        }
        else return this.gameModeIndex == 1 || this.gameModeIndex ==3
    }

    startGame(){
        
    }

}