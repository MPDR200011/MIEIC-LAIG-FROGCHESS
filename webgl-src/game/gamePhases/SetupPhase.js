class SetupPhase extends GamePhase {
    constructor(controller) {
        super(controller);
    }

    startGame(){
        this.controller.switchPhase(new BuildingPhase(this.controller));
    }
    
    buildInterface(int) {
        int.gui.destroy();
        int.gui = new dat.GUI();
        
        int.gui.add(this.scene.controller,'gameModeIndex',this.scene.controller.gameMode)
        .name("Game Mode: ")
        .onChange(this.scene.controller.changeMode.bind(this.scene.controller));

        int.gui.add(this.scene.controller,'aiDifficultyIndex',this.scene.controller.aiDifficulty)
        .name("Ai Difficulty: ");
        int.gui.add(this,'startGame').name("Start Game");
    }
}