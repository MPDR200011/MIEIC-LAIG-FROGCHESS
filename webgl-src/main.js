//From https://github.com/EvanHahn/ScriptInclude
include=function(){function f(){var a=this.readyState;(!a||/ded|te/.test(a))&&(c--,!c&&e&&d())}var a=arguments,b=document,c=a.length,d=a[c-1],e=d.call;e&&c--;for(var g,h=0;c>h;h++)g=b.createElement("script"),g.src=arguments[h],g.async=!0,g.onload=g.onerror=g.onreadystatechange=f,(b.head||b.getElementsByTagName("head")[0]).appendChild(g)};
serialInclude=function(a){var b=console,c=serialInclude.l;if(a.length>0)c.splice(0,0,a);else b.log("Done!");if(c.length>0){if(c[0].length>1){var d=c[0].splice(0,1);b.log("Loading "+d+"...");include(d,function(){serialInclude([]);});}else{var e=c[0][0];c.splice(0,1);e.call();};}else b.log("Finished.");};serialInclude.l=new Array();

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,    
    function(m,key,value) {
      vars[decodeURIComponent(key)] = decodeURIComponent(value);
    });
    return vars;
}	 
//Include additional files here
serialInclude(['../lib/CGF.js', 
'XMLscene.js', 
'MySceneGraph.js', 
'MyInterface.js', 
'objects/MyRectangle.js', 
'objects/MySphere.js',
'objects/MyTriangle.js',
'objects/MyCylinder.js',
'objects/MyTorus.js',
'SceneTreeNode.js',
'animation/Animation.js',
'animation/KeyframeAnimation.js',
'animation/Keyframe.js',
'objects/Plane.js',
'objects/Cylinder2.js',
'objects/Patch.js',
'objects/UnitCube.js',
'objects/MyQuad.js',
'game/GameState.js',
'gamePrimitives/Board.js',
'gamePrimitives/BoardPiece.js',
'game/GameController.js',
'CGFOBJModel.js',
'CGFResourceReader.js',
'gamePrimitives/frog.js',
'gamePrimitives/frogGroup.js',
'game/gamePhases/GamePhase.js',
'game/gamePhases/SetupPhase.js',
'game/gamePhases/GameOverPhase.js',
'game/gamePhases/BuildingPhase.js',
'game/gamePhases/PlayingPhase.js',
'game/gamePhases/FreeCam.js',
'game/BoardModel.js',
'game/FrogDictionary.js',
'game/SavedState.js',
'game/CameraAnimator.js',
'game/MaterialDict.js',
'animation/FrogMovement.js',
'animation/AnimationController.js',
'game/GameSequence.js',
'game/Animator.js',
'gamePrimitives/StoneHead.js',
'gamePrimitives/Totem.js',
main=function()
{
	// Standard application, scene and interface setup
    var app = new CGFapplication(document.body);
    var myInterface = new MyInterface();
    var myScene = new XMLscene(myInterface);

    app.init();

    app.setScene(myScene);
    app.setInterface(myInterface);

    myInterface.setActiveCamera(myScene.camera);

	// get file name provided in URL, e.g. http://localhost/myproj/?file=myfile.xml 
	// or use "demo.xml" as default (assumes files in subfolder "scenes", check MySceneGraph constructor) 
	
    //var filename=getUrlVars()['file'] || "board.xml";
    var filename=getUrlVars()['file'] || "board.xml";

	// create and load graph, and associate it to scene. 
	// Check console for loading errors
	var myGraph = new MySceneGraph(filename, myScene);
	
	// start
    app.run();
}

]);
