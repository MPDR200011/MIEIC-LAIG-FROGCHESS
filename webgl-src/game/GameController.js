class GameController {
    constructor(scene) {
        this.scene = scene;
    
        this.phases = ['loading','building','playing','end'];
        this.curentPhase = 'building';

        this.currentPlayer = 1;

        
    }
}