class Patch extends CGFobject{
    constructor(scene,npointsU,npointsV,npartsU,npartsV,controlPoints){
        super(scene);
        this.npointsU = npointsU;
        this.npointsV = npointsV;
        this.npartsU = npartsU;
        this.npartsV = npartsV;
        this.controlPoints = controlPoints;
        /*
        if(controlPoints.length != npointsU*npointsV){
            console.error("wrong number of points");
        }
        */
       this.createSurface();
    }


    createSurface(){
        let controlPoints = [];
        for(let i = 0; i <this.npointsU;i++ ){
            let subBuffer = [];
            for(let j = 0; j < this.npointsV;j++){
               let point =  Object.values(this.controlPoints[i*this.npointsV+j]);
               point.push(1);
                subBuffer.push(point);
            }
            controlPoints.push(subBuffer);
        }

        this.surface = new CGFnurbsSurface(this.npointsU-1,this.npointsV-1,controlPoints);
        this.nurbsPatch = new CGFnurbsObject(this.scene,this.npartsU,this.npartsV,this.surface);
    }
    
    updateScaleFactors(length_s, length_t) {
        return;
    }

    display(){
        this.nurbsPatch.display();
    }
}