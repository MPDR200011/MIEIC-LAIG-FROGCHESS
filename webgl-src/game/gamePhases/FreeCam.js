class FreeCam extends GamePhase {
    constructor(controller) {
        super(controller);

        this.camPos = this.scene.camera.position;
        this.scene.interface.setActiveCamera(this.scene.camera);
    }

    backToSetup() {
        this.scene.camera.setPosition(...this.camPos);
        this.scene.camera._up=vec3.fromValues(0,1,0);
        this.scene.interface.setActiveCamera(null);
        this.controller.switchPhase(new SetupPhase(this.controller));
    }

    buildInterface(int) {
        int.gui.destroy();
        int.gui = new dat.GUI();

        int.gui.add(this,'backToSetup').name('Back to Setup');
    }
}