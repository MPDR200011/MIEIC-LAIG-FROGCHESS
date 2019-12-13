class MyTorus extends CGFobject{
    constructor(scene,id,inner,outter,slices,loops){
        super(scene);
        this.inner = inner;
        this.outter = outter;
        this.slices = slices;
        this.loops = loops;

        this.initBuffers();

    }

    updateScaleFactors(length_s, length_t) {
        return;
    }

    initBuffers(){
        this.vertices = [];
		this.indices = [];
		this.normals = [];
		this.texCoords = [];

        let slice_angle = 2*Math.PI/this.slices; //increment in the outter radius
		let loop_angle = 2*Math.PI/this.loops;  //increment in the inner radius

        for(let i = 0;i <= this.slices;i++){
            for(let j = 0; j <=this.loops; j++){

                //only calculate trignometric functions once
                var cosL = Math.cos(loop_angle*j);
                var cosS = Math.cos(slice_angle*i);
                var sinL = Math.sin(loop_angle*j);
                var sinS = Math.sin(slice_angle*i);

                this.vertices.push(
                    (this.outter + this.inner*cosL) * cosS, 
					(this.outter + this.inner*cosL) * sinS, 
                    this.inner * sinL);

                let cInternal = cosL;

                this.texCoords.push(
					i*1/this.slices, 
					j*1/this.loops	
				);
                
                this.normals.push(
                    cInternal * cosS,
                    cInternal*sinS,
                    sinL
                );
            }
        }

        for (let i = 0; i < this.slices; i++) {
			for(let j = 0; j < this.loops; j++) {
				this.indices.push(
					(i+1)*(this.loops+1) + j, i*(this.loops+1) + j+1, i*(this.loops+1) + j,
					i*(this.loops+1) + j+1, (i+1)*(this.loops+1) + j, (i+1)*(this.loops+1) + j+1
				);
			}
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
    }

}