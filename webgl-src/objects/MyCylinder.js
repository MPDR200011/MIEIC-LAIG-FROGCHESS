class MyCylinder extends CGFobject {
  constructor(scene, id, slices, stacks, radius_bot, radius_top, height) {
    super(scene);
    this.slices = slices;
    this.stacks = stacks;
    this.radius_bot = radius_bot;
    this.radius_top = radius_top;
    this.height = height;
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

    let radiusIncrement = (this.radius_top - this.radius_bot) / this.stacks;
    let angleIncrement = (2 * Math.PI) / this.slices;
    let heightIncrement = this.height / this.stacks;

    let a = this.radius_bot - this.radius_top;
    let hip = Math.sqrt(a * a + this.height * this.height);
    let sint = a / hip;
    let cost = this.height / hip;

    for (let i = 0; i <= this.stacks; i++) {
      for (let j = 0; j < this.slices; j++) {
        let angle = j * angleIncrement;
        let radius = this.radius_bot + radiusIncrement * i;

        let cosA = Math.cos(angle);
        let sinA = Math.sin(angle);

        this.vertices.push(
          ...[
            radius * cosA,
            radius * sinA,
            heightIncrement * i
          ]
        );

        this.normals.push(
          ...[cost * cosA, cost * sinA, sint]
        );

        let u = j*(1/this.slices);
        let v = 1-i*(1/(this.stacks+1));

        this.texCoords.push(...[u, v]);
      }
    }

    for (let i = 1; i <= this.stacks; i++) {
      let base = i * this.slices;
      for (let j = 0; j < this.slices; j++) {
        let current = base + j;
        let next = base + ((j + 1) % this.slices);
        let prevLine = current - this.slices;
        let prevLineNext = next - this.slices;

        this.indices.push(
          ...[current, prevLineNext, next, current, prevLine, prevLineNext]
        );
      }
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }
}
