/**
 * Class responsible for animating the camera between predefined positions
 * 
 * Works mainly by orbiting the camera around the Y axis.
 * 
 * Has a position queue, that is periodically checked, when there is a position
 * to animate to, it will animate the camera to that position.
 */
class CameraAnimator {
    constructor(scene) {
        this.scene = scene;
        
        this.queue = [];

        this.angles = [
            0,
            Math.PI,
            Math.PI/2
        ];

        this.positions = [
            [0,60,20],
            [0,60,-20],
            [20,60,0]
        ];

        this.transitionTime = 0.5;
        this.lastTime = 0;
        this.startTime = null;

        this.currentAngle = 0;
        this.angleIncrement = 0;
    }

    // Directly sets the scene cameras position
    setPosition(pos) {
        this.scene.camera.setPosition(this.positions[pos]);
        this.currentAngle = this.angles[pos];
    }

    // Adds a position to animate the camera to to the queue
    animateToPos(i) {
        //console.log('animating to pos ' + i);
        
        if (i < 0 || i > 2) {
            return;
        }

        this.queue.push(i);
    }

    // Called periodically to update camera position
    update(t) {
        if (this.queue.length < 1) {
            return;
        }

        if (this.startTime === null) {
            this.startTime = t;
            this.lastTime = t;
            this.angleIncrement = (this.angles[this.queue[0]] - this.currentAngle) / (this.transitionTime*1000);
        }

        const dT = t - this.lastTime;
        
        const tT = t - this.startTime;

        this.lastTime = t;

        if (tT >= this.transitionTime*1000) {
            this.scene.camera.setPosition(this.positions[this.queue[0]]);
            this.currentAngle = this.angles[this.queue[0]];
            this.startTime = null;
            this.queue.splice(0,1);
            return;
        }

        let angleInc = dT * this.angleIncrement;

        this.scene.camera.orbit(CGFcameraAxis.Y, angleInc);

    }
}