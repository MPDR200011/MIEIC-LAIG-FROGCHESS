class BoardModel extends CGFobject {
    constructor(scene) {
        super(scene);
        this.serverURL = 'http://localhost:8081/';
        this.board = [];
        this.frogs = [];
        this.player1Group = new FrogGroup(this.scene, 1);
        this.player2Group = new FrogGroup(this.scene, 2);
        this.groups = [this.player1Group, this.player2Group];
    }

    getAbsoluteBoardCoords(x, y) {
        return [-17.5 + 5 * x, 0, -17.5 + 5 * y];
    }

    executeMove(player, move) {
        let board = this.board;
        let frogs = this.frogs;
        let group  = this.groups[player-1];
        let valid = board[move[1]][move[0]] === player;
        if (!valid) {
            return;
        }

        let midpoint = [
            Math.floor((move[0] + move[2]) / 2),
            Math.floor((move[1] + move[3]) / 2)
        ]

        let movedFrog = this.frogs[move[1]][move[0]];
        let jumpedFrog = this.frogs[midpoint[1]][midpoint[0]];

        this.scene.animationController
        .animateInBoard(...move);

        setTimeout( _ => {
                this.scene.animationController
                .animateFromTableToTray(midpoint[0], midpoint[1], player)

                group.pieces.push(jumpedFrog);

                board[move[3]][move[2]] = player;
                board[move[1]][move[0]] = 0;
                frogs[move[3]][move[2]] = movedFrog;
                frogs[move[1]][move[0]] = null;

                board[midpoint[1]][midpoint[0]] = 0;
                frogs[midpoint[1]][midpoint[0]] = null;
            }, 
            250); 
    }

    placeFrog(player, x, y) {
        let group = this.groups[player-1];

        let frog = group.getTailFrog();

        this.scene.animationController
        .animateToTable(frog, x, y); 

        this.board[y][x] = player;
        this.frogs[y][x] = frog;
        group.removeTailFrog();
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
        this.frogs = [];
        for (let i = 0 ; i < this.board.length; i++){
            this.frogs.push([]);
            for (let j = 0; j < this.board[i].length; j++) {
                this.frogs[i].push(null);
            }
        }
        this.player1Group = new FrogGroup(this.scene, 1);
        this.player2Group = new FrogGroup(this.scene, 2);
        this.groups = [this.player1Group, this.player2Group];
    }


    display() {
        this.player1Group.display();
        this.player2Group.display();

        for (let i = 0; i < this.frogs.length; i++) {
            for (let j = 0; j < this.frogs[i].length; j++) {
                let frog = this.frogs[i][j];
                if (frog) {
                    let index = i * 8 + j + 1;
                    this.scene.registerForPick(index, [j, i]);
                    this.frogs[i][j].display();
                    this.scene.clearPickRegistration();
                }
            }
        }

    }

}