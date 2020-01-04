class AnimationController {
    constructor(scene) {
        this.animations = {};
        this.scene = scene;
        this.state = scene.state;
        this.gameSequence = new GameSequence();
    }

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

    animateToTable(frog, x, y) {
        let dest = this.state.board.getAbsoluteBoardCoords(x, y);

        let animation = new FrogMovement(this.scene, frog, 1, frog.pos, dest);
        this.addAnimation(animation);
        animation.start();
    }

    animateInBoard(x1, y1, x2, y2) {
        let board = this.state.board;
        let movedFrog = board.frogs[y1][x1];
        let moveAnimation = new FrogMovement(this.scene, movedFrog, 0.5, movedFrog.pos, board.getAbsoluteBoardCoords(x2,y2));
        this.scene.animationController.addAnimation(moveAnimation);
        moveAnimation.start();
    }

    animateFromTableToTray(frog, player) {
        let model = this.state.board;
        let group = model.groups[player-1];

        //let frog = model.frogs[y][x];
        let animation = new FrogMovement(this.scene, frog, 0.5, frog.pos, group.getNextPosition());
        this.addAnimation(animation);
        animation.start();
    }

    removeAnimation(animation) {
        const index = this.animations.indexOf(animation);
        if (index > -1) {
            this.animations.splice(index, 1);
        }
    }

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