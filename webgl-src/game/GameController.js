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

        this.playerKinds = [true, true];

        this.inputQueue = [];
    }

    changeMode(mode) {
        console.log(mode);
        
        switch(parseInt(mode)) {
            case 0: {
                this.playerKinds[0] = true;
                this.playerKinds[1] = true;
                break;
            }
            case 1: {
                this.playerKinds[0] = true;
                this.playerKinds[1] = false;
                break;
            }
            case 2: {
                this.playerKinds[0] = false;
                this.playerKinds[1] = true;
                break;
            }
            case 3: {
                console.log(1);
                this.playerKinds[0] = false;
                this.playerKinds[1] = false;
                break;
            }
        }
    }

    switchTurn() {
        this.currentPhase.switchTurn();
        this.currentPlayer = this.currentPlayer === 1 ? 2 : 1; 

        console.log("It is now player " + this.currentPlayer + " turn.");
    }

    switchPhase(newPhase) {
        this.currentPlayer = 1;
        this.currentPhase = newPhase;
        this.currentPhase.buildInterface(this.scene.interface);
        console.log("switching phase: " + newPhase)
    }

    picked(coords) {
        this.inputQueue.push(coords);
    }

    async tick() {
        if (this.waiting) {
            return;
        }

        this.currentPhase.tick();
    }

    initialize() {
        this.board = this.scene.graph.primitives['boardPiece'];
        this.switchPhase(new BuildingPhase(this));
        this.waiting = false;
    }
    startGame(){
        
    }
}