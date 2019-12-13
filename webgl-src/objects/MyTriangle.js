class MyTriangle extends CGFobject{
    constructor(scene, id, x1,y1,z1,x2,y2,z2,x3,y3,z3){
        super(scene);
        this.x1 = x1;
        this.x2 = x2;
        this.x3 = x3;
        this.y1 = y1;
        this.y2 = y2;
        this.y3 = y3;
        this.z1 = z1;
        this.z2 = z2;
        this.z3 = z3;
		this.origTexCoords = [];
        this.initBuffers();

    }

	updateScaleFactors(length_s, length_t) {
		let newTex = [...this.origTexCoords];
		for (let i = 0; i < this.origTexCoords.length; i++) {
			if (i % 2 == 0) {
				newTex[i] = this.origTexCoords[i]/length_s;
			} else {
				newTex[i] = this.origTexCoords[i]/length_t;
			}
		}
		this.updateTexCoords(newTex);
	}

    initBuffers(){
        this.vertices = [
            this.x1,this.y1,this.z1,
            this.x2,this.y2,this.z2,
            this.x3,this.y3,this.z3
        ];

        this.indices = [
            0,1,2,
        ];

        let v1 = vec3.fromValues(this.x2 - this.x1, this.y2 - this.y1, this.z2 - this.z1);
        let v2 = vec3.fromValues(this.x3 - this.x1, this.y3 - this.y1, this.z3 - this.z1);

        let normal = vec3.create();
        let normalNormalized = vec3.create();
        vec3.cross(normal, v1, v2);
        vec3.normalize(normalNormalized, normal);
        this.normals = [
            ...normalNormalized,
            ...normalNormalized,
            ...normalNormalized
        ];

        this.origTexCoords = [];

        let a = Math.sqrt(Math.pow(this.x2-this.x1,2) + Math.pow(this.y2-this.y1,2) + Math.pow(this.z2-this.z1,2));
        let b = Math.sqrt(Math.pow(this.x3-this.x2,2) + Math.pow(this.y3-this.y2,2) + Math.pow(this.z3-this.z2,2));
        let c = Math.sqrt(Math.pow(this.x1-this.x3,2) + Math.pow(this.y1-this.y3,2) + Math.pow(this.z1-this.z3,2));

        let alpha = Math.acos((a*a - b*b + c*c) / (2 * a * c));

        this.origTexCoords.push(...[
            0,0,
            1,0,
            Math.cos(alpha), Math.sin(alpha)
        ]);

        this.updateTexCoords(this.origTexCoords);

        this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();

    }

    /**
     * @method updateTexCoords
     * Updates the list of texture coordinates of the rectangle
     * @param {Array} coords - Array of texture coordinates
     */
    updateTexCoords(coords) {
        this.texCoords = [...coords];
        this.updateTexCoordsGLBuffers();
    }


}