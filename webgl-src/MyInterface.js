/**
* MyInterface class, creating a GUI interface.
*/
class MyInterface extends CGFinterface {
    /**
     * @constructor
     */
    constructor() {
        super();
    }

    /**
     * Initializes the interface.
     * @param {CGFapplication} application
     */
    init(application) {
        super.init(application);
        // init GUI. For more information on the methods, check:
        //  http://workshop.chromeexperiments.com/examples/gui

        this.gui = new dat.GUI();

        // add a group of controls (and open/expand by defult)

        this.initKeys();

        return true;
    }

    /**
     * Generates the cameres drop down and the light checkboxes in the interface
     */
    build(graph) {
        //cameras
        /*
        console.log("Building interface");
        
        let settings = this.gui.addFolder('settings')
        let mapper = {};
        let keys =Object.keys(graph.views);
        for (let key of keys) {
            mapper[key] = key;
        }
        settings.add(graph, 'activeView', mapper)
        .name("Camera")
        .onChange(graph.changeCamera.bind(graph));
        //lights
        var folder = settings.addFolder('Lights');
        for(let i = 0; i < graph.numberOfLights; i++) {
            folder.add(this.scene.lights[i], 'enabled')
            .name("Light: " + i);
        }
        */
        //shader switching
        
        //this.gui.add(this.scene, 'shaderIndex', this.scene.shaderMap).name("Shading Method: ").onChange(this.scene.changeShader.bind(this.scene));

        //this.controlsFolder = this.gui.addFolder('Game Controls');
        this.gui.add(this.scene.controller,'gameModeIndex',this.scene.controller.gameMode)
        .name("Game Mode: ")
        .onChange(this.scene.controller.changeMode.bind(this.scene.controller));

        this.gui.add(this.scene.controller,'aiDifficultyIndex',this.scene.controller.aiDifficulty)
        .name("Ai Difficulty: ");
        this.controlsFolder.add(this.scene.controller,'startGame').name("Start Game");
    }

    resetControlsFolder() {
        this.gui.removeFolder(this.controlsFolder);
        this.controlsFolder = this.gui.addFolder('Game Controls');
    }

    /**
     * initKeys
     */
    initKeys() {
        this.scene.gui=this;
        this.processKeyboard=function(){};
        this.activeKeys={};
    }

    processKeyDown(event) {
        this.activeKeys[event.code]=true;
        if(event.code == "KeyM"){
            this.scene.graph.updateMaterials();
        }
        if(event.code == "KeyC"){
            console.warn("implement camera change!")
        }
        
    }

    processKeyUp(event) {
        this.activeKeys[event.code]=false;
    }

    isKeyPressed(keyCode) {
        return this.activeKeys[keyCode] || false;
    }
}