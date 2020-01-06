/**
 * Phase in which the game settings are set, such as the gamemode, bot difficulty and
 * game scenery.
 */
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

    // Switch to a free camera mode where the user can explore the scene
    toFreeCam() {
        this.controller.switchPhase(new FreeCam(this.controller));
    }

    // Causes de scene to change
    changeScene(scene) {
        this.scene.sceneInited = false;
        this.scene.graph.reader.open('scenes/'+scene, this.scene.graph);
    }
    
    buildInterface(int) {
        int.gui.destroy();
        int.gui = new dat.GUI();

        int.gui.add(this.scene, 'sceneName', this.scene.sceneMapper).name("Scene: ").onChange(this.changeScene.bind(this));
        
        int.gui.add(this.scene.controller,'gameModeIndex',this.scene.controller.gameMode)
        .name("Game Mode: ")
        .onChange(this.scene.controller.changeMode.bind(this.scene.controller));

        int.gui.add(this.scene.controller,'aiDifficultyIndex',this.scene.controller.aiDifficulty)
        .name("Ai Difficulty: ");
        int.gui.add(this,'toFreeCam').name("Free Cam");
        int.gui.add(this,'startGame').name("Start Game");
    }
}