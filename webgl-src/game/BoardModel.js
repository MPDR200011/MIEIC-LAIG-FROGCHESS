/**
 * Class responsible for storing the model of the board and handling some logic
 */
class BoardModel extends CGFobject {
    constructor(scene) {
        super(scene);
        this.serverURL = 'http://localhost:8081/';
        this.board = [];//board representation of the board
        this.frogs = [];//reference for the frog objects
        this.player1Group = new FrogGroup(this.scene, 1);
        this.player2Group = new FrogGroup(this.scene, 2);
        this.groups = [this.player1Group, this.player2Group];
    }

    /**Recieves a saved state the updates the model to mirror it
     * Used for the undo feature
     * @param {Array} savedState - board model 
     */
    resetState(savedState) {
        this.board = savedState.board;

        this.frogs = savedState.frogs.map(arr => 
            arr.map(info => {
                if (info === null) {
                    return null;
                }

                let frog = this.scene.frogsDict.frogs[info[0]];
                frog.pos = info[1];

                return frog;
            })
        );

        this.player1Group.pieces = savedState.player1Tray.map(info => {
            let frog = this.scene.frogsDict.frogs[info[0]];
            frog.pos = info[1];
            return frog;
        });

        this.player2Group.pieces = savedState.player2Tray.map(info => {
            let frog = this.scene.frogsDict.frogs[info[0]];
            frog.pos = info[1];
            return frog;
        });
        
    }

    //converts x and y coordinates in the board to absolute coordinates
    getAbsoluteBoardCoords(x, y) {
        return [-17.5 + 5 * x, 0, -17.5 + 5 * y];
    }

    /**
     * Responsible for executing the move: updating the model and calling the animation of the frog
     * @param {int} player - number of the player that made the move
     * @param {Array} move -stores the origin and destin coordinates
     */
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

       // setTimeout( _ => {
                this.scene.animationController
                .animateFromTableToTray(jumpedFrog, player);

                group.pieces.push(jumpedFrog);

                board[move[3]][move[2]] = player;
                board[move[1]][move[0]] = 0;
                frogs[move[3]][move[2]] = movedFrog;
                frogs[move[1]][move[0]] = null;

                board[midpoint[1]][midpoint[0]] = 0;
                frogs[midpoint[1]][midpoint[0]] = null;
           // }, 
           // 250); 
    }

    /**
     * 
     * @param {int} player - player of the game
     * @param {int} x - x coordinate of the board
     * @param {int} y - y coordinate of the board
     */
    placeFrog(player, x, y) {
        let group = this.groups[player-1];

        let frog = group.getTailFrog();

        this.scene.animationController
        .animateToTable(frog, x, y); 

        this.board[y][x] = player;
        this.frogs[y][x] = frog;
        group.removeTailFrog();
    }
/**
 * get the empty board representation from the prolog and stores it
 * also initializes the frogs in the board
 */
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
/**
 * resets the board to its original state and prepares it for the replay
 */
    async reset(){
        let response = await fetch(this.serverURL + 'defaultBoard', {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
        });

        this.board = await response.json();

        this.player1Group.reset();
        this.player2Group.reset();
      
    }
    /**
     * responsible for displaying the frogs on the board
     */
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