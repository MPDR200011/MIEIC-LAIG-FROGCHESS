class GameOverPhase extends GamePhase {
    constructor(controller, winner) {
        super(controller);

        this.winner = winner;
    }

    buildInterface(int) {
        int.gui.destroy();
        int.gui = new dat.GUI();

        int.gui.add(this, 'foo').name("Player " + this.winner + ' Won!!!!!');
        int.gui.add(this, 'replay').name("Replay")
    }

    foo() {}
    replay() {
        this.controller.state.board.reset();
        this.controller.animator.start();

    }

    update(t) {
        if (this.controller.animator === null) {
            return
        }
        if (this.controller.animator) {
            this.controller.animator.update(t);
        }
    }
}