/**
 * Class to represent the animation of a frog jump
 * 
 * Takes a start and end position and interpolates between the two
 * while emulating an arc. This makes it seem like the frog "jumped" to that position.
 */
class FrogMovement {
    constructor(scene, frog, time, sCoords, fCoords) {
        this.scene = scene;

        this.frog = frog;
        this.sCoords = [...sCoords];
        this.fCoords = [...fCoords];

        this.time = time;
        this.startTime = null;

        this.animating = false;
        this.finished = false;
    }

    // Start the animation
    start() {
        this.animating = true;
        this.finished = false;
        this.startTime = null;
    }

    // Stop the animation
    stop() {
        this.animating = false;
    }

    // Auxiliary function to interpolate between two values
    interpolate(i, f, p) {
        return i + ((f-i)*p);
    }

    // Interpolate between to coordinates
    interpolateCoords(i, f, p) {
        return [
            this.interpolate(i[0],f[0],p),
            this.interpolate(i[1],f[1],p),
            this.interpolate(i[2],f[2],p)
        ];
    }

    // Called periodically o update frog position
    update(t) {
        if (!this.animating || this.finished) {
            return;
        }

        if (this.startTime === null) {
            this.startTime = t;
            this.sCoords = [...this.frog.pos];
        }

        const dT = t - this.startTime;

        if (dT >= this.time * 1000) {
            this.frog.pos = this.fCoords;
            this.finished = true;
            return;
        }

        const percentage = dT/(this.time*1000);



        this.frog.pos = this.interpolateCoords(this.sCoords, this.fCoords, percentage);
        this.frog.pos[1] = 10*Math.sin(Math.PI*percentage); 

    }
}