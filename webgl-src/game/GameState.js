class GameState {
    constructor(scene) {
        this.scene = scene;

        this.serverURL = 'http://localhost:8081/';

        this.board=[];

        this.player1Tray = [];
        this.player2Tray = [];
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