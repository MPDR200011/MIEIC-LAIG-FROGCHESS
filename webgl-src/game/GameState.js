class GameState extends CGFobject {
    constructor(scene) {
        super(scene);

        this.serverURL = 'http://localhost:8081/';
        this.board = new BoardModel(scene);
    }

    async initialize() {
        this.board.initialize();
    }

    display() {
        this.board.display();
    }
}