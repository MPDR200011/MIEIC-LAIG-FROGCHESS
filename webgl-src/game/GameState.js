class GameState extends CGFobject{
    constructor(scene) {
        super(scene);

        this.serverURL = 'http://localhost:8081/';

        this.board = [];
        this.player1Group = new FrogGroup(this.scene, 1);
        this.player2Group = new FrogGroup(this.scene, 2);
        this.groups = [this.player1Group, this.player2Group];
    }

    placeFrog(player, x, y) {
        let group = this.groups[player-1];

        group.pieces.pop();

        this.board[y][x] = player;
    }

    setPosition(coords) {
        let component = this.scene.graph.components['test'];

        let mat = mat4.create();
        mat4.translate(mat, mat, [-17.5 +  5*coords[0], 0, -17.5 + 5*coords[1]]);

        component.transformationMatrix = mat;

    }

    async initialize() {
        let response = await fetch(this.serverURL + 'defaultBoard', {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
        });

        this.board = await response.json();
        this.player1Group = new FrogGroup(this.scene, 1);
        this.player2Group = new FrogGroup(this.scene, 2);
        this.groups = [this.player1Group, this.player2Group];
    }

    display() {
        this.player1Group.display();
        this.scene.pushMatrix()
        this.scene.rotate(Math.PI,0,1,0)
        this.player2Group.display();
        this.scene.popMatrix();

        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                let cell = this.board[i][j];
                if (cell !== 0 && cell !== -1) {
                    this.scene.pushMatrix()
                    this.scene.translate(-17.5 +  5*j, 0, -17.5 + 5*i);
                    this.scene.frogModel.display();
                    this.scene.popMatrix();
                }
            }
        }
    }
}