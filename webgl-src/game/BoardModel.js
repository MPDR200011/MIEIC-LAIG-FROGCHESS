class BoardModel extends CGFobject {
    constructor(scene) {
        super(scene);
        this.serverURL = 'http://localhost:8081/';
        this.board = [];
        this.player1Group = new FrogGroup(this.scene, 1);
        this.player2Group = new FrogGroup(this.scene, 2);
        this.groups = [this.player1Group, this.player2Group];

        const player1Mat = new CGFappearance(this.scene);
        player1Mat.setAmbient(0,0.3,0,1)
        player1Mat.setDiffuse(0,1,0,1);

        const player2Mat = new CGFappearance(this.scene);
        player2Mat.setAmbient(0.3,0,0,1)
        player2Mat.setDiffuse(1,0,0,1);

        this.materials= {
            1: player1Mat,
            2: player2Mat
        }

    }


    executeMove(player, move) {
        let board = this.board;
        let valid = board[move[1]][move[0]] === player;
        if (!valid) {
            return;
        }

        //record moves here

        board[move[3]][move[2]] = player;
        board[move[1]][move[0]] = 0;

        let midpoint = [
            Math.floor((move[0] + move[2]) / 2),
            Math.floor((move[1] + move[3]) / 2)
        ]

        board[midpoint[1]][midpoint[0]] = 0;
    }

    placeFrog(player, x, y) {
        let group = this.groups[player - 1];

        group.pieces.pop();

        this.board[y][x] = player;
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
        this.materials[1].apply();
        this.player1Group.display();
        this.scene.pushMatrix()
        this.scene.rotate(Math.PI, 0, 1, 0)
        this.materials[2].apply();
        this.player2Group.display();
        this.scene.popMatrix();

        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                let cell = this.board[i][j];
                if (cell !== 0 && cell !== -1) {
                    let index = i * 8 + j + 1;
                    this.scene.registerForPick(index, [j, i]);
                    this.scene.pushMatrix()
                    this.scene.translate(-17.5 + 5 * j, 0, -17.5 + 5 * i);
                    if (cell === 2) {
                        this.scene.rotate(Math.PI, 0, 1, 0)
                    }
                    this.materials[cell].apply();
                    this.scene.frogModel.display();
                    this.scene.popMatrix();
                    this.scene.clearPickRegistration();
                }
            }
        }

    }

}