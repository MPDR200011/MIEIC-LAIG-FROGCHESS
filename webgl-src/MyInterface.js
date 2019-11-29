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
        console.log("Building interface");
        let mapper = {};
        let keys =Object.keys(graph.views);
        for (let key of keys) {
            mapper[key] = key;
        }
        this.gui.add(graph, 'activeView', mapper)
        .name("Camera")
        .onChange(graph.changeCamera.bind(graph));
        
        this.gui.add(this.scene, 'securityView', mapper)
        .name('Security Camera')
        .onChange(this.scene.changeSecCamera.bind(this.scene));

        //lights
        var folder = this.gui.addFolder('Lights');
        for(let i = 0; i < graph.numberOfLights; i++) {
            folder.add(this.scene.lights[i], 'enabled')
            .name("Light: " + i);
        }

        //shader switching
        this.gui.add(this.scene, 'shaderIndex', this.scene.shaderMap).name("Shading Method: ").onChange(this.scene.changeShader.bind(this.scene));
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
    }

    processKeyUp(event) {
        this.activeKeys[event.code]=false;
    }

    isKeyPressed(keyCode) {
        return this.activeKeys[keyCode] || false;
    }
}