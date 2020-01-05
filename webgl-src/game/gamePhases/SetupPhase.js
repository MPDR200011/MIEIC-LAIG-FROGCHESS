class SetupPhase extends GamePhase {
    constructor(controller) {
        super(controller);

    }

    startGame(){
        if (!this.scene.sceneInited) {
            return;
        }
        this.controller.switchPhase(new BuildingPhase(this.controller));
    }

    toFreeCam() {
        this.controller.switchPhase(new FreeCam(this.controller));
    }

    changeScene(scene) {
        this.scene.sceneInited = false;
        this.scene.graph.reader.open('scenes/'+scene, this.scene.graph);
    }
    
    buildInterface(int) {
        int.gui.destroy();
        int.gui = new dat.GUI();

        int.gui.add(this.scene, 'sceneName', this.scene.sceneMapper).onChange(this.changeScene.bind(this));
        
        int.gui.add(this.scene.controller,'gameModeIndex',this.scene.controller.gameMode)
        .name("Game Mode: ")
        .onChange(this.scene.controller.changeMode.bind(this.scene.controller));

        int.gui.add(this.scene.controller,'aiDifficultyIndex',this.scene.controller.aiDifficulty)
        .name("Ai Difficulty: ");
        int.gui.add(this,'toFreeCam').name("Free Cam");
        int.gui.add(this,'startGame').name("Start Game");
    }
}