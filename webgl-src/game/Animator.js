/***
 * Class responsible for the replay of a game
 * Receives a gameSequence which stores all the moves made in a game.
 * works by manipulating the Animation Controller
 */
class Animator {
    constructor(controller, gameSequence) {
        this.controller = controller
        this.gameSequence = gameSequence
        this.pointer = -1
        this.startTime = 0
    }

    //starts playing the replay and makes sure that the new moves made by the replay aren't stored
    start() {
        this.pointer = 0;
        this.startTime = null;
        this.gameSequence.final = true;
        this.pushNextAnimation();
    }

    //responsible for timing the push of next animation into the animation controller
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
    //pushes the next animation into the AnimationController
    pushNextAnimation() {
        this.controller.scene.animationController.addAnimation(this.gameSequence.sequence[this.pointer]);
        this.gameSequence.sequence[this.pointer].start();
    }

}