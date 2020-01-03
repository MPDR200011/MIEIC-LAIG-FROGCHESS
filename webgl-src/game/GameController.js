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
        this.shouldRotateCam = true;

        this.inputQueue = [];

        this.currentTime = 0;
        this.botThreshold = null;
    }

    update(t) {
        if (this.botThreshold === null) {
            this.botThreshold = t + 2000;
        }
        this.currentTime = t;
        if (this.currentPhase)
            this.currentPhase.update(t);
    }

    changeMode(mode) {
        
        switch(parseInt(mode)) {
            case 0: {
                this.playerKinds[0] = true;
                this.playerKinds[1] = true;
                this.scene.camera.setPosition([0,60,20]);
                this.shouldRotateCam = true;
                break;
            }
            case 1: {
                this.playerKinds[0] = true;
                this.playerKinds[1] = false;
                this.scene.camera.setPosition([0,60,20]);
                this.shouldRotateCam = false;
                break;
            }
            case 2: {
                this.playerKinds[0] = false;
                this.playerKinds[1] = true;
                this.scene.camera.setPosition([0,60,20]);
                this.shouldRotateCam = false;
                break;
            }
            case 3: {
                this.playerKinds[0] = false;
                this.playerKinds[1] = false;
                this.scene.camera.setPosition([20,60,0]);
                this.shouldRotateCam = false;
                break;
            }
        }
    }

    switchTurn() {
        this.currentPhase.switchTurn();
        this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
        this.inputQueue = [];
        if (this.shouldRotateCam) {
            this.scene.camAnimator.animateToPos(this.currentPlayer-1);
        }

        console.log("It is now player " + this.currentPlayer + " turn.");
    }

    switchPhase(newPhase) {
        if (this.currentPhase) {
            this.currentPhase.destroy();
        }
        this.currentPlayer = 1;
        if (this.gameModeIndex !== '3') {
            this.scene.camAnimator.animateToPos(this.currentPlayer-1);
        }
        this.currentPhase = newPhase;
        this.currentPhase.buildInterface(this.scene.interface);
        this.inputQueue = [];
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
        this.switchPhase(new SetupPhase(this));
        this.waiting = false;
    }

}