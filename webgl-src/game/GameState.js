class GameState {
    constructor(scene) {
        this.scene = scene;

        this.serverURL = 'http://localhost:8081/';

        this.board=[];
    }

    initialize() {
        let request = new XMLHttpRequest();
        request.open('GET', this.serverURL + 'defaultBoard', true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

        request.addEventListener('load', e => {
            console.log(e.currentTarget.responseText);
        });

        request.send();
    }
}