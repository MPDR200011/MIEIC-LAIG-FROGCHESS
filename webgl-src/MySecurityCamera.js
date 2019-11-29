class MySecurityCamera extends CGFobject {
    constructor(scene) {
        super(scene);

		this.rect = new MyRectangle(this.scene, 0, 0.5, 1, -1, -0.5);
    }

	display() {
		this.rect.display();
	}

}