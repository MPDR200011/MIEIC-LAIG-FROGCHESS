class PieceAnimation extends KeyframeAnimation{
    constructor(scene,id,xi,zi,xf,zf,steps,maxY,duration){
    super(scene,id);
        this.id = id;
        let xInc = (xf-xi )/ steps
        let yInc = floor(maxY/(steps/2))
        let zInc = (zf-zi)/steps
        let timeStep = duration/steps

    for(let i = 0; i <steps; i++){

        if(i > steps/2 ){
            yInc*= -1
        }
        let translation = [xInc*i,yInc*i,zInc *i]
        
        this.addKeyframe(new Keyframe(timeStep* i,translation,[],[] ))

    }

}



}