class GameOverPhase extends GamePhase {
    constructor(controller, winner) {
        super(controller);

        this.winner = winner;
    }

    buildInterface(int) {
        int.gui.destroy();
        int.gui = new dat.GUI();

        int.gui.add(this, 'foo').name("Player " + this.winner + ' Won!!!!!');
    }

    foo(){}
}