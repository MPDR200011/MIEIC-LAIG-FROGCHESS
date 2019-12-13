class MySphere extends CGFobject {
    constructor(scene, radius, slices, stacks) {
        super(scene);
        this.radius = radius;
        this.slices = slices;
        this.stacks = stacks;

        this.initBuffers();
    }

    updateScaleFactors(length_s, length_t) {
        return;
    }

    initBuffers() {

        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        let dPhi = 2 * Math.PI / this.slices;
        let dTheta = Math.PI / (this.stacks * 2 - 1);

        let circVertNum = this.slices + 1;

        //One Pole
        for (let  i = 0; i < circVertNum; i++) {
            this.vertices.push(...[0,0,1]);
            this.normals.push(...[0,0,1]);
            this.texCoords.push(...[i/this.slices, 1]);
        }

        for (let i = 1; i <= (this.stacks * 2 - 1); i++) {
            let z = Math.cos(dTheta*i);
            for (let j = 0; j < circVertNum; j++) {
                let x = Math.sin(dTheta*i) * Math.cos(dPhi*j);
                let y = Math.sin(dTheta*i) * Math.sin(dPhi*j);

                this.normals.push(...[x,y,z]);
                this.vertices.push(...[this.radius*x, this.radius*y, this.radius*z]);
                let texC = [1 - j/this.slices, z * 0.5 + 0.5];
                this.texCoords.push(...texC);
            }
        }

        //Other pole
        for (let  i = 0; i < circVertNum; i++) {
            this.vertices.push(...[0,0,-1]);
            this.normals.push(...[0,0,-1]);
            this.texCoords.push(...[i/this.sclices, 0]);
        }

        for(let i = 0; i < this.stacks * 2; i++) {
            for(let j = 0; j < this.slices; j++) {
                let current = circVertNum*i + j;
                //First triangle
                this.indices.push(current);
                this.indices.push(current + circVertNum);
                this.indices.push(current + circVertNum + 1);

                //Second triangle
                this.indices.push(current);
                this.indices.push(current + circVertNum + 1);
                this.indices.push(current + 1);
            }
        }

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
    }
}