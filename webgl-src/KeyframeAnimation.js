class KeyframeAnimation extends Animation {
    constructor(scene, id) {
        super(scene);

        this.id = id;
        this.keyframes = [new Keyframe(0, [0,0,0], [0,0,0], [1,1,1])];
        this.keyIndex = 0;

        this.currentTransform = mat4.create();
        this.startInstant = null;
    }

    addKeyframe(keyframe) {
        if (keyframe.instant <= this.keyframes[this.keyframes.length-1].instant) {
            console.error("adding keyframe out of error");
            return;
        } 

        this.keyframes.push(keyframe);
    }

    setTransformFromKeyframe(keyframe) {
        this.currentTransform = mat4.create();
        let m = this.currentTransform;
        mat4.translate(m, m, keyframe.translation);
        mat4.rotateX(m, m, keyframe.rotation[0]);
        mat4.rotateY(m, m, keyframe.rotation[1]);
        mat4.rotateZ(m, m, keyframe.rotation[2]);
        mat4.scale(m, m, keyframe.scale);
    }

    interpolate(i, f, p) {
        return i + ((f-i)*p);
    }

    interpolateCoords(i, f, p) {
        return [
            this.interpolate(i[0],f[0],p),
            this.interpolate(i[1],f[1],p),
            this.interpolate(i[2],f[2],p)
        ];
    }

    update(t) {
        if (this.currentStart == null) {
            this.currentStart = t;
        }

        if (this.keyIndex == this.keyframes.length - 1) {
            return;
        }

        const dT = (t - this.currentStart) / 1000;

        let nextKeyFrame = this.keyframes[this.keyIndex+1];
        if (dT >= nextKeyFrame.instant) {
            this.keyIndex++;
        }

        const currentKeyframe = this.keyframes[this.keyIndex];

        if (this.keyIndex == this.keyframes.length - 1) {
            this.setTransformFromKeyframe(currentKeyframe);
            return;
        }

        nextKeyFrame = this.keyframes[this.keyIndex+1];

        const iT = currentKeyframe.instant;
        const fT = nextKeyFrame.instant;

        const percentage = (dT-iT)/(fT-iT);

        this.currentTransform = mat4.create();
        let m = this.currentTransform;

        mat4.translate(m, m, this.interpolateCoords(currentKeyframe.translation, nextKeyFrame.translation, percentage));
        mat4.rotateX(m, m, this.interpolate(currentKeyframe.rotation[0], nextKeyFrame.rotation[0], percentage));
        mat4.rotateY(m, m, this.interpolate(currentKeyframe.rotation[1], nextKeyFrame.rotation[1], percentage));
        mat4.rotateZ(m, m, this.interpolate(currentKeyframe.rotation[2], nextKeyFrame.rotation[2], percentage));
        mat4.scale(m, m, this.interpolateCoords(currentKeyframe.scale, nextKeyFrame.scale, percentage));
    }

    apply() {

        this.scene.multMatrix(this.currentTransform);

    }
    
}