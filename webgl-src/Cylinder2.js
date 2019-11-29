class Cylinder2 extends CGFobject{
    constructor(scene,base,top,height,slices,stacks){
        super(scene);
        this.base = base;
        this.top = top;
        this.height = height;
        this.slices = slices;
        this.stacks = stacks;

        this.createSurface();
    }

    updateScaleFactors(lengths_s, length_t) {
        return;
    }

    createSurface(){

        let controlPointsTop = [
                                [//u= 0 , v= 0..1
                                    [this.base,0,0,1],
                                    [this.top,0,this.height,1]

                                ],


                                [//u= 1 , v= 0..1
                                    [this.base,4/3*this.base,0,1],
                                    [this.top,4/3*this.top,this.height,1],

                                ],

                                
                                [//u= 2 , v= 0..1
                                    [-this.base,4/3*this.base,0,1],
                                    [-this.top,4/3*this.top,this.height,1]

                                ],

                                [//u= 3 , v= 0..1
                                    [-this.base,0,0,1],
                                    [-this.top,0,this.height,1]

                                ],

        ];
        let controlPointsBot = [
            [//u= 0 , v= 0..1
                [-this.base,0,0,1],
                [-this.top,0,this.height,1]

            ],


            [//u= 1 , v= 0..1
                [-this.base,-4/3*this.base,0,1],
                [-this.top,-4/3*this.top,this.height,1],

            ],

            
            [//u= 2 , v= 0..1
                [this.base,-4/3*this.base,0,1],
                [this.top,-4/3*this.top,this.height,1]

            ],

            [//u= 3 , v= 0..1
                [this.base,0,0,1],
                [this.top,0,this.height,1]

            ],

];

        let topSurface = new CGFnurbsSurface(3,1,controlPointsTop);
        let botSurface = new CGFnurbsSurface(3,1,controlPointsBot)
        //TODO only half the slices
        this.nurbsCylinderTop = new CGFnurbsObject(this.scene,this.stacks,Math.ceil(this.slices/2),topSurface);
        this.nurbsCylinderBot = new CGFnurbsObject(this.scene,this.stacks,Math.ceil(this.slices/2),botSurface);
    }
    display(){
        this.nurbsCylinderTop.display();
        this.nurbsCylinderBot.display();
    }

}