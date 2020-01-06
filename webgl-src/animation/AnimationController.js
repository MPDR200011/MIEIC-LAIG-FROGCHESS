/**
 * Class to manage the animations from the FrogMovement class
 * 
 * Mostly keeps things consistent, by queueing animations per frog
 * so cases where the frog teleports to a location mid animation and 
 * start another animation happen.
 * 
 * Alse keeps a GameSequence instance to build the game replay.
 */
class AnimationController {
    constructor(scene) {
        this.animations = {};
        this.scene = scene;
        this.state = scene.state;
        this.gameSequence = new GameSequence();
    }

    // Adds an animation to the queue of the animations frog
    addAnimation(animation) {
        if (!this.animations[animation.frog.id]) {
            this.animations[animation.frog.id] = [];
        }
        this.animations[animation.frog.id].push(animation);
        if(!this.gameSequence.final){
        this.gameSequence.addMove(animation);
        }
        return animation;
    }

    // Creates an animation that animates the give frog
    // to the given coordinates on the game board
    animateToTable(frog, x, y) {
        let dest = this.state.board.getAbsoluteBoardCoords(x, y);

        let animation = new FrogMovement(this.scene, frog, 1, frog.pos, dest);
        this.addAnimation(animation);
        animation.start();
    }

    // Creates an animation that moves a frog between to position in the board
    animateInBoard(x1, y1, x2, y2) {
        let board = this.state.board;
        let movedFrog = board.frogs[y1][x1];
        let moveAnimation = new FrogMovement(this.scene, movedFrog, 0.5, movedFrog.pos, board.getAbsoluteBoardCoords(x2,y2));
        this.scene.animationController.addAnimation(moveAnimation);
        moveAnimation.start();
    }

    // Creates an animation that moves a frog from the table to the
    // specified player's tray
    animateFromTableToTray(frog, player) {
        let model = this.state.board;
        let group = model.groups[player-1];

        //let frog = model.frogs[y][x];
        let animation = new FrogMovement(this.scene, frog, 0.5, frog.pos, group.getNextPosition());
        this.addAnimation(animation);
        animation.start();
    }

    // Called periodically to update the animations
    update(t) {
        let frogs = Object.keys(this.animations);
        frogs.forEach(frog => {
            let animation = this.animations[frog][0];
            if (animation) {
                animation.update(t);
                this.animations[frog] = this.animations[frog].filter(animation => !animation.finished);
            }
        });
    }
}