class Animator {
    constructor(controller, gameSequence) {
        this.controller = controller
        this.gameSequence = gameSequence
        this.pointer = -1
        this.startTime = 0
    }


    start() {
        this.pointer = 0;
        console.log(this.gameSequence)
        this.gameSequence.final = true;
    }

    update(t) {
        if (this.pointer != -1) {
            console.log("animating: " + this.pointer)
            if (this.startTime === null) {
                this.startTime = t;
            }
            const dT = t - this.startTime;

            if (dT >= 1500) {
                this.pointer++;
                this.startTime = t;
                this.pushNextAnimation();
            }
        }
    }

    pushNextAnimation() {
        this.controller.scene.animationController.addAnimation(this.gameSequence.sequence[this.pointer]);
        this.gameSequence.sequence[this.pointer].start();
        console.log(this.gameSequence.sequence[this.pointer])
    }

}