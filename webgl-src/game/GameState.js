class GameState {
    constructor(scene) {
        this.scene = scene;

        this.serverURL = 'http://localhost:8081/';

        this.board=[];

        this.player1Tray = [];
        this.player2Tray = [];
    }

    setPosition(coords) {
        let component = this.scene.graph.components['test'];

        let mat = mat4.create();
        mat4.translate(mat, mat, [-17.5 +  5*coords[0], 0, -17.5 + 5*coords[1]]);

        component.transformationMatrix = mat;

    }

    initialize() {
        let request = new XMLHttpRequest();
        request.open('GET', this.serverURL + 'defaultBoard', true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

        request.addEventListener('load', e => {
            this.board = JSON.parse(e.currentTarget.responseText);
        });

        request.send();

        for (let i = 0; i < 18; i++) {
            this.player1Tray.push(new BoardPiece(this.scene));
            this.player2Tray.push(new BoardPiece(this.scene));
        }
    }
}