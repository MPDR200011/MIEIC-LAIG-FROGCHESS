class Animation {

    constructor(scene){
        if(this.constructor === Animation){
            throw new TypeError('Abstract class "Animation" cannot be instantiated directly.');
        }

        this.scene = scene;
    }

    update(t){
        throw new TypeError('Cannot use update() from Abstract class "Animation".');
    }
    
    apply(){
        throw new TypeError('Cannot use display() from Abstract class "Animation".');
    }

}