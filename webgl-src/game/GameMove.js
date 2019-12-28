class GameMove{
    constructor(player,xi,zi,xf,zf){
        this.xi = xi;
        this.xf = xf;
        this.zi = zi;
        this.zf = zf;
        this.player = player;
    }


    apply(board){
        return;
    }


    undo(board){

    }

}