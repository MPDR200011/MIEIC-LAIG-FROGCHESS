class Animator {
    constructor(controller, gameSequence) {
        this.controller = controller
        this.gameSequence = gameSequence
        this.pointer = -1
        this.startTime = 0
    }


    start() {
        this.pointer = 0;
        this.startTime = null;
        console.log(this.gameSequence)
        this.gameSequence.final = true;
        this.pushNextAnimation();
    }

    update(t) {
        if (this.pointer != -1) {
            if (this.startTime === null) {
                this.startTime = t;
            }
            const dT = t - this.startTime;

            if (dT >= 1500) {
                this.pointer++;
                if (this.pointer >= this.gameSequence.sequence.length) {
                    this.pointer = -1;
                    this.startTime = null;
                    return;
                }
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