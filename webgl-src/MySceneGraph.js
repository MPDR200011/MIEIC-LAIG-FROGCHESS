var DEGREE_TO_RAD = Math.PI / 180;

// Order of the groups in the XML document.
var SCENE_INDEX = 0;
var VIEWS_INDEX = 1;
var AMBIENT_INDEX = 2;
var LIGHTS_INDEX = 3;
var TEXTURES_INDEX = 4;
var MATERIALS_INDEX = 5;
var TRANSFORMATIONS_INDEX = 6;
var ANIMATIONS_INDEX = 7;
var PRIMITIVES_INDEX = 8;
var COMPONENTS_INDEX = 9;

/**
 * MySceneGraph class, representing the scene graph.
 */
class MySceneGraph {
    /**
     * @constructor
     */
    constructor(filename, scene) {
        this.loadedOk = null;

        // Establish bidirectional references between scene and graph.
        this.scene = scene;
        scene.graph = this;

        this.nodes = [];

        this.idRoot = null; // The id of the root element.

        this.axisCoords = [];
        this.axisCoords['x'] = [1, 0, 0];
        this.axisCoords['y'] = [0, 1, 0];
        this.axisCoords['z'] = [0, 0, 1];

        // File reading 
        this.reader = new CGFXMLreader();

        this.views = [];
        this.activeView = "";

        /*
         * Read the contents of the xml file, and refer to this class for loading and error handlers.
         * After the file is read, the reader calls onXMLReady on this object.
         * If any error occurs, the reader calls onXMLError on this object, with an error message
         */
        this.reader.open('scenes/' + filename, this);

        /* 
            Material and texture stacks.
            These are when displaying object to save previous
            state of the scene.
        */
        this.materialStack = [];
        this.textureStack = [];
    }

    /*
     * Callback to be executed after successful reading
     */
    onXMLReady() {
        this.log("XML Loading finished.");
        var rootElement = this.reader.xmlDoc.documentElement;

        // Here should go the calls for different functions to parse the various blocks
        var error = this.parseXMLFile(rootElement);

        if (error != null) {
            this.onXMLError(error);
            return;
        }

        this.loadedOk = true;

        // As the graph loaded ok, signal the scene so that any additional initialization depending on the graph can take place
        this.scene.onGraphLoaded();
    }

    /**
     * Parses the XML file, processing each block.
     * @param {XML root element} rootElement
     */
    parseXMLFile(rootElement) {
        if (rootElement.nodeName != "lxs")
            return "root tag <lxs> missing";

        var nodes = rootElement.children;

        // Reads the names of the nodes to an auxiliary buffer.
        var nodeNames = [];

        for (var i = 0; i < nodes.length; i++) {
            nodeNames.push(nodes[i].nodeName);
        }

        var error;

        // Processes each node, verifying errors.

        // <scene>
        var index;
        if ((index = nodeNames.indexOf("scene")) == -1)
            return "tag <scene> missing";
        else {
            if (index != SCENE_INDEX)
                this.onXMLMinorError("tag <scene> out of order " + index);

            //Parse scene block
            if ((error = this.parseScene(nodes[index])) != null)
                return error;
        }

        // <views>
        if ((index = nodeNames.indexOf("views")) == -1)
            return "tag <views> missing";
        else {
            if (index != VIEWS_INDEX)
                this.onXMLMinorError("tag <views> out of order");

            //Parse views block
            if ((error = this.parseView(nodes[index])) != null)
                return error;
        }

        // <ambient> globals
        if ((index = nodeNames.indexOf("globals")) == -1)
            return "tag <globals> missing";
        else {
            if (index != AMBIENT_INDEX)
                this.onXMLMinorError("tag <globals> out of order");

            //Parse globals block
            if ((error = this.parseAmbient(nodes[index])) != null)
                return error;
        }

        // <lights>
        if ((index = nodeNames.indexOf("lights")) == -1)
            return "tag <lights> missing";
        else {
            if (index != LIGHTS_INDEX)
                this.onXMLMinorError("tag <lights> out of order");

            //Parse lights block
            if ((error = this.parseLights(nodes[index])) != null)
                return error;
        }
        // <textures>
        if ((index = nodeNames.indexOf("textures")) == -1)
            return "tag <textures> missing";
        else {
            if (index != TEXTURES_INDEX)
                this.onXMLMinorError("tag <textures> out of order");

            //Parse textures block
            if ((error = this.parseTextures(nodes[index])) != null)
                return error;
        }

        // <materials>
        if ((index = nodeNames.indexOf("materials")) == -1)
            return "tag <materials> missing";
        else {
            if (index != MATERIALS_INDEX)
                this.onXMLMinorError("tag <materials> out of order");

            //Parse materials block
            if ((error = this.parseMaterials(nodes[index])) != null)
                return error;
        }

        // <transformations>
        if ((index = nodeNames.indexOf("transformations")) == -1)
            return "tag <transformations> missing";
        else {
            if (index != TRANSFORMATIONS_INDEX)
                this.onXMLMinorError("tag <transformations> out of order");

            //Parse transformations block
            if ((error = this.parseTransformations(nodes[index])) != null)
                return error;
        }

        // <animations>
        if ((index = nodeNames.indexOf("animations")) == -1) {
            return "tag <animations> missing";
        } else {
            if (index != ANIMATIONS_INDEX) {
                this.onXMLMinorError("tag <animations> out of order");
            }

            if ((error = this.parseAnimations(nodes[index])) != null) {
                return error;
            }
        }

        // <primitives>
        if ((index = nodeNames.indexOf("primitives")) == -1)
            return "tag <primitives> missing";
        else {
            if (index != PRIMITIVES_INDEX)
                this.onXMLMinorError("tag <primitives> out of order");

            //Parse primitives block
            if ((error = this.parsePrimitives(nodes[index])) != null)
                return error;
        }

        // <components>
        if ((index = nodeNames.indexOf("components")) == -1)
            return "tag <components> missing";
        else {
            if (index != COMPONENTS_INDEX)
                this.onXMLMinorError("tag <components> out of order");

            //Parse components block
            if ((error = this.parseComponents(nodes[index])) != null)
                return error;
        }
        this.log("all parsed");
    }

    /**
     * Parses the <scene> block. 
     * @param {scene block element} sceneNode
     */
    parseScene(sceneNode) {

        // Get root of the scene.
        var root = this.reader.getString(sceneNode, 'root');
        if (root == null)
            return "no root defined for scene";

        this.idRoot = root;

        // Get axis length        
        var axis_length = this.reader.getFloat(sceneNode, 'axis_length');
        if (axis_length == null)
            this.onXMLMinorError("no axis_length defined for scene; assuming 'length = 1'");

        this.referenceLength = axis_length || 1;

        this.log("Parsed scene");

        return null;
    }

    /**
     * Parses the <views> block.
     * @param {view block element} viewsNode
     */
    parseView(viewsNode) {
        this.views = [];
        let defaultID = this.reader.getString(viewsNode, "default");
        if (defaultID == null) {
            return "Missing default view id in scene views.";
        }

        let viewNodes = viewsNode.children;
        let hasViews = false;
        for (let view of viewNodes) {
            if (view.nodeName == "perspective") {
                hasViews = true;
                let id = this.reader.getString(view, "id", true);
                let near = this.reader.getFloat(view, "near", true);
                let far = this.reader.getFloat(view, "far", true);
                let angle = this.reader.getFloat(view, "angle", true);

                let nodeNames = [];
                for (let child of view.children) {
                    nodeNames.push(child.nodeName);
                }

                let fromIndex = nodeNames.indexOf("from");
                let toIndex = nodeNames.indexOf("to");

                if (fromIndex == -1 || toIndex == -1) {
                    return "Missing necessary children from perpective view of id " + id;
                }

                let position = vec3.fromValues(...this.parseCoordinates3D(view.children[fromIndex], "from node"));

                let target = vec3.fromValues(...this.parseCoordinates3D(view.children[toIndex], "to node"));

                this.views[id] = new CGFcamera(angle, near, far, position, target);

            } else if ("ortho") {
                hasViews = true;
                let id = this.reader.getString(view, "id", true);
                let near = this.reader.getFloat(view, "near", true);
                let far = this.reader.getFloat(view, "far", true);
                let left = this.reader.getFloat(view, "left", true);
                let right = this.reader.getFloat(view, "right", true);
                let top = this.reader.getFloat(view, "top", true);
                let bottom = this.reader.getFloat(view, "bottom", true);

                let nodeNames = [];
                for (let child of view.children) {
                    nodeNames.push(child.nodeName);
                }

                let fromIndex = nodeNames.indexOf("from");
                let toIndex = nodeNames.indexOf("to");
                let upIndex = nodeNames.indexOf("up");

                if (fromIndex == -1 || toIndex == -1) {
                    return "Missing necessary children from ortho view of id " + id;
                }

                let position = vec3.fromValues(...this.parseCoordinates3D(view.children[fromIndex], "from node"));

                let target = vec3.fromValues(...this.parseCoordinates3D(view.children[toIndex], "to node"));

                let up;
                if (upIndex == -1) {
                    up = vec3.fromValues(0, 1, 0);
                } else {
                    up = vec3.fromValues(...this.parseCoordinates3D(view.children[upIndex], "up node"));
                }
                this.views[id] = new CGFcameraOrtho(left, right, bottom, top, near, far, position, target, up);
            } else {
                return "Invalid view node name: " + view.nodeName;
            }
        }

        if (!hasViews) {
            return "There are no views defined for the scene.";
        }

        if (this.views[defaultID] == null) {
            return "Non existant view ID for default view: " + defaultID;
        }

        this.scene.camera = this.views[defaultID];
        this.activeView = defaultID;
        this.scene.interface.setActiveCamera(this.scene.camera);
        this.log("Parsed views");

        return null;
    }

    /**
     * Parses the <ambient> node.
     * @param {ambient block element} ambientsNode
     */
    parseAmbient(ambientsNode) {

        var children = ambientsNode.children;

        this.ambient = [];
        this.background = [];

        var nodeNames = [];

        for (var i = 0; i < children.length; i++)
            nodeNames.push(children[i].nodeName);

        var ambientIndex = nodeNames.indexOf("ambient");
        var backgroundIndex = nodeNames.indexOf("background");

        var color = this.parseColor(children[ambientIndex], "ambient");
        if (!Array.isArray(color))
            return color;
        else
            this.ambient = color;

        color = this.parseColor(children[backgroundIndex], "background");
        if (!Array.isArray(color))
            return color;
        else
            this.background = color;

        this.log("Parsed globals");

        return null;
    }

    /**
     * Parses the <light> node.
     * @param {lights block element} lightsNode
     */
    parseLights(lightsNode) {
        var children = lightsNode.children;

        this.lights = [];
        var numLights = 0;

        var grandChildren = [];
        var nodeNames = [];

        // Any number of lights.
        for (var i = 0; i < children.length; i++) {

            // Storing light information
            var global = [];
            var attributeNames = [];
            var attributeTypes = [];

            //Check type of light
            if (children[i].nodeName != "omni" && children[i].nodeName != "spot") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            } else {
                attributeNames.push(...["location", "ambient", "diffuse", "specular"]);
                attributeTypes.push(...["position", "color", "color", "color"]);
            }

            // Get id of the current light.
            var lightId = this.reader.getString(children[i], 'id');
            if (lightId == null)
                return "no ID defined for light";

            // Checks for repeated IDs.
            if (this.lights[lightId] != null)
                return "ID must be unique for each light (conflict: ID = " + lightId + ")";

            // Light enable/disable
            var enableLight = true;
            var aux = this.reader.getBoolean(children[i], 'enabled');
            if (!(aux != null && !isNaN(aux) && (aux == true || aux == false)))
                this.onXMLMinorError("unable to parse value component of the 'enable light' field for ID = " + lightId + "; assuming 'value = 1'");

            enableLight = aux || 0;

            //Add enabled boolean and type name to light info
            global.push(enableLight);
            global.push(children[i].nodeName);

            grandChildren = children[i].children;
            // Specifications for the current light.

            nodeNames = [];
            for (var j = 0; j < grandChildren.length; j++) {
                nodeNames.push(grandChildren[j].nodeName);
            }

            for (var j = 0; j < attributeNames.length; j++) {
                var attributeIndex = nodeNames.indexOf(attributeNames[j]);

                if (attributeIndex != -1) {
                    if (attributeTypes[j] == "position")
                        var aux = this.parseCoordinates4D(grandChildren[attributeIndex], "light position for ID" + lightId);
                    else
                        var aux = this.parseColor(grandChildren[attributeIndex], attributeNames[j] + " illumination for ID" + lightId);

                    if (!Array.isArray(aux))
                        return aux;

                    global.push(aux);
                } else
                    return "light " + attributeNames[i] + " undefined for ID = " + lightId;
            }

            // Gets the additional attributes of the spot light
            if (children[i].nodeName == "spot") {
                var angle = this.reader.getFloat(children[i], 'angle');
                if (!(angle != null && !isNaN(angle)))
                    return "unable to parse angle of the light for ID = " + lightId;

                var exponent = this.reader.getFloat(children[i], 'exponent');
                if (!(exponent != null && !isNaN(exponent)))
                    return "unable to parse exponent of the light for ID = " + lightId;

                var targetIndex = nodeNames.indexOf("target");

                // Retrieves the light target.
                var targetLight = [];
                if (targetIndex != -1) {
                    var aux = this.parseCoordinates3D(grandChildren[targetIndex], "target light for ID " + lightId);
                    if (!Array.isArray(aux))
                        return aux;

                    targetLight = aux;
                } else
                    return "light target undefined for ID = " + lightId;

                global.push(...[angle, exponent, targetLight]);
            }

            this.lights[lightId] = global;
            numLights++;
        }

        if (numLights == 0)
            return "at least one light must be defined";
        else if (numLights > 8)
            this.onXMLMinorError("too many lights defined; WebGL imposes a limit of 8 lights");

        this.numberOfLights = numLights;
        this.log("Parsed lights");
        return null;
    }

    /**
     * Parses the <textures> block. 
     * @param {textures block element} texturesNode
     */
    parseTextures(texturesNode) {
        this.textures = [];

        //For each texture in textures block, check ID and file URL
        let hasTextures = false;
        for (let texture of texturesNode.children) {
            if (texture.nodeName == "texture") {
                hasTextures = true;
                let id = this.reader.getString(texture, "id", false);
                if (id == null) {
                    return "No id defined for texture";
                }
                if (this.textures[id] != null) {
                    return "Conflict. Repeated texture id: " + id;
                }

                let url = this.reader.getString(texture, "file", true);
                if (url == null) {
                    return "No url defined for texture with id " + id;
                }
                if (!url.match(/\.png$|\.jpg$/)) {
                    return "Texture (id= " + id + ") file url needs to have extension .png or .jpg.";
                }

                this.textures[id] = new CGFtexture(this.scene, url);
            } else {
                return "Unknown texture tag: " + texture.nodeName;
            }
        }

        if (!hasTextures) {
            return "There are no textures declared for this scene.";
        }

        this.log("Parsed textures");

        return null;
    }

    /**
     * Parses the <materials> node.
     * @param {materials block element} materialsNode
     */
    parseMaterials(materialsNode) {
        var children = materialsNode.children;

        this.materials = [];

        // Any number of materials.
        let hasMaterials = false;
        for (var i = 0; i < children.length; i++) {

            if (children[i].nodeName != "material") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }

            hasMaterials = true;

            // Get id of the current material.
            var materialID = this.reader.getString(children[i], 'id', true);
            if (materialID == null)
                return "no ID defined for material";

            // Checks for repeated IDs.
            if (this.materials[materialID] != null)
                return "ID must be unique for each light (conflict: ID = " + materialID + ")";

            let material = new CGFappearance(this.scene);

            let shininess = this.reader.getFloat(children[i], 'shininess', true);

            material.setShininess(shininess);

            let matParams = children[i].children;
            for (let param of matParams) {
                if (param.nodeName == "emission") {
                    let color = this.parseColor(param, "emission tag of material with id: " + materialID);
                    material.setEmission(...color);
                } else if (param.nodeName == "ambient") {
                    let color = this.parseColor(param, "ambient tag of material with id: " + materialID);
                    material.setAmbient(...color);
                } else if (param.nodeName == "diffuse") {
                    let color = this.parseColor(param, "diffuse tag of material with id: " + materialID);
                    material.setDiffuse(...color);
                } else if (param.nodeName == "specular") {
                    let color = this.parseColor(param, "specular tag of material with id: " + materialID);
                    material.setSpecular(...color);
                } else {
                    return "Unknown material parameter tag:" + param.nodeName;
                }
            }

            material.setTextureWrap('REPEAT', 'REPEAT');

            this.materials[materialID] = material;
        }

        if (!hasMaterials) {
            return "No materials defined for this scene";
        }

        this.log("Parsed materials");
        return null;
    }

    /**
     * Parses the <transformations> block.
     * @param {transformations block element} transformationsNode
     */
    parseTransformations(transformationsNode) {
        var children = transformationsNode.children;

        this.transformations = [];

        var grandChildren = [];

        // Any number of transformations.
        for (var i = 0; i < children.length; i++) {

            if (children[i].nodeName != "transformation") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }

            // Get id of the current transformation.
            var transformationID = this.reader.getString(children[i], 'id');

            if (transformationID == null)
                return "no ID defined for transformation";

            // Checks for repeated IDs.
            if (this.transformations[transformationID] != null)
                return "ID must be unique for each transformation (conflict: ID = " + transformationID + ")";

            grandChildren = children[i].children;
            // Specifications for the current transformation.

            var transfMatrix = mat4.create();

            for (var j = 0; j < grandChildren.length; j++) {
                switch (grandChildren[j].nodeName) {
                    case 'translate':
                        var coordinates = this.parseCoordinates3D(grandChildren[j], "translate transformation for ID " + transformationID);
                        if (!Array.isArray(coordinates))
                            return coordinates;

                        transfMatrix = mat4.translate(transfMatrix, transfMatrix, coordinates);
                        break;
                    case 'scale':
                        let coords = this.parseCoordinates3D(grandChildren[j], "scale transformation for ID " + transformationID);
                        if (!Array.isArray(coords)) {
                            return coords;
                        }
                        transfMatrix = mat4.scale(transfMatrix, transfMatrix, coords);
                        break;
                    case 'rotate':
                        // angle
                        let axis = this.reader.getString(grandChildren[j], "axis", true);
                        if (this.axisCoords[axis] == null) {
                            return "Invalid axis parameter " + axis + " for rotation transformation for ID " + transformationID;
                        }
                        let angle = this.reader.getString(grandChildren[j], "angle", true);
                        angle = angle * DEGREE_TO_RAD;

                        transfMatrix = mat4.rotate(transfMatrix, transfMatrix, angle, this.axisCoords[axis]);
                        break;
                }
            }

            this.transformations[transformationID] = transfMatrix;
        }

        this.log("Parsed transformations");
        return null;
    }

    parseAnimations(animationsNode) {

        this.animations = [];

        const animations = animationsNode.children;

        for (const child of animations) {
            if (child.nodeName != "animation") {
                return "Unknown tag in animations: " + child.nodeNames;
            }

            const animationID = this.reader.getString(child, "id", true);

            const keyframes = child.children;

            if (keyframes == null || keyframes.length == 0) {
                return "Animation of id " + animationID + " has no keyframes.1";
            }

            let hasKeyFrames = false;
            let lastInstant = 0;

            const newAnimation = new KeyframeAnimation(this.scene, animationID);

            for (const keyFrame of keyframes) {
                if (keyFrame.nodeName != "keyframe") {
                    return "Unknown tag in animation keyframes of animation of id " + animationID;
                }

                hasKeyFrames = true;

                const instant = this.reader.getFloat(keyFrame, "instant", true);

                if (instant <= lastInstant) {
                    return "Keyframe instants out of order in animation of id " + animationID;
                }

                lastInstant = instant;

                const nodeNames = [];
                for (let trans of keyFrame.children) {
                    nodeNames.push(trans.nodeName);
                }

                const translationIndex = nodeNames.indexOf("translate");
                const rotationIndex = nodeNames.indexOf("rotate");
                const scaleIndex = nodeNames.indexOf("scale");

                if (translationIndex == -1) {
                    return "Missing <translate> tag in key frame in animation of id " + animationID;
                }

                if (rotationIndex == -1) {
                    return "Missing <rotate> tag in key frame in animation of id " + animationID;
                }

                if (scaleIndex == -1) {
                    return "Missing <scale> tag in key frame in animation of id " + animationID;
                }

                const translationCoords = this.parseCoordinates3D(keyFrame.children[translationIndex], "translation in animation of id " + animationID);
                if (!Array.isArray(translationCoords)) {
                    return translationCoords;
                }

                const scaleCoords = this.parseCoordinates3D(keyFrame.children[scaleIndex], "scale in animation of id " + animationID);
                if (!Array.isArray(scaleCoords)) {
                    return scaleCoords;
                }

                var angle_x = this.reader.getFloat(keyFrame.children[rotationIndex], 'angle_x');
                if (!(angle_x != null && !isNaN(angle_x))) {
                    return "unable to parse x-coordinate of the " + messageError;
                }

                // y
                var angle_y = this.reader.getFloat(keyFrame.children[rotationIndex], 'angle_y');
                if (!(angle_y != null && !isNaN(angle_y))) {
                    return "unable to parse y-coordinate of the " + messageError;
                }

                // z
                var angle_z = this.reader.getFloat(keyFrame.children[rotationIndex], 'angle_z');
                if (!(angle_z != null && !isNaN(angle_z))) {
                    return "unable to parse z-coordinate of the " + messageError;
                }

                const rotationCoords = [angle_x * DEGREE_TO_RAD, angle_y * DEGREE_TO_RAD, angle_z * DEGREE_TO_RAD];

                newAnimation.addKeyframe(new Keyframe(instant, translationCoords, rotationCoords, scaleCoords));
            }

            if (!hasKeyFrames) {
                return "Animation of id " + animationID + " has no keyframes.2";
            }

            this.animations[animationID] = newAnimation;
        }

        this.log("Parsed animations.");

        return null;
    }

    /**
     * Parses the <primitives> block.
     * @param {primitives block element} primitivesNode
     */
    parsePrimitives(primitivesNode) {
        var children = primitivesNode.children;

        this.primitives = [];

        var grandChildren = [];

        // Any number of primitives.
        for (var i = 0; i < children.length; i++) {

            if (children[i].nodeName != "primitive") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }

            // Get id of the current primitive.
            var primitiveId = this.reader.getString(children[i], 'id');
            if (primitiveId == null)
                return "no ID defined for primitive";

            // Checks for repeated IDs.
            if (this.primitives[primitiveId] != null)
                return "ID must be unique for each primitive (conflict: ID = " + primitiveId + ")";

            grandChildren = children[i].children;

            // Validate the primitive type
            if (grandChildren.length != 1 ||
                (grandChildren[0].nodeName != 'rectangle' && grandChildren[0].nodeName != 'triangle' &&
                    grandChildren[0].nodeName != 'cylinder' && grandChildren[0].nodeName != 'sphere' &&
                    grandChildren[0].nodeName != 'torus' && grandChildren[0].nodeName != 'plane' &&
                    grandChildren[0].nodeName != 'patch' && grandChildren[0].nodeName != 'cylinder2'
                    && grandChildren[0].nodeName != 'board' && grandChildren[0].nodeName!= 'unitCube' &&
                    grandChildren[0].nodeName != 'frog')) {
                return "There must be exactly 1 primitive type (rectangle, triangle, cylinder, sphere or torus)"
            }

            // Specifications for the current primitive.
            var primitiveType = grandChildren[0].nodeName;

            // Retrieves the primitive coordinates.
            if (primitiveType == 'rectangle') {
                // x1
                var x1 = this.reader.getFloat(grandChildren[0], 'x1');
                if (!(x1 != null && !isNaN(x1)))
                    return "unable to parse x1 of the primitive coordinates for ID = " + primitiveId;

                // y1
                var y1 = this.reader.getFloat(grandChildren[0], 'y1');
                if (!(y1 != null && !isNaN(y1)))
                    return "unable to parse y1 of the primitive coordinates for ID = " + primitiveId;

                // x2
                var x2 = this.reader.getFloat(grandChildren[0], 'x2');
                if (!(x2 != null && !isNaN(x2) && x2 > x1))
                    return "unable to parse x2 of the primitive coordinates for ID = " + primitiveId;

                // y2
                var y2 = this.reader.getFloat(grandChildren[0], 'y2');
                if (!(y2 != null && !isNaN(y2) && y2 > y1))
                    return "unable to parse y2 of the primitive coordinates for ID = " + primitiveId;

                var rect = new MyRectangle(this.scene, primitiveId, x1, x2, y1, y2);

                this.primitives[primitiveId] = rect;
            } else if (primitiveType == 'sphere') {
                let radius = this.reader.getFloat(grandChildren[0], 'radius');
                if (radius == null || isNaN(radius)) {
                    return "unable to parse radius for Id = " + primitiveId;
                }

                let stacks = this.reader.getFloat(grandChildren[0], 'stacks');
                if (radius == null || isNaN(stacks)) {
                    return "unable to parse radius for Id = " + primitiveId;
                }

                let slices = this.reader.getFloat(grandChildren[0], 'slices');
                if (radius == null || isNaN(slices)) {
                    return "unable to parse slices for Id = " + primitiveId;
                }

                let sphere = new MySphere(this.scene, radius, slices, stacks);
                this.primitives[primitiveId] = sphere;
            } else if (primitiveType == 'triangle') {
                // x1
                var x1 = this.reader.getFloat(grandChildren[0], 'x1');
                if (!(x1 != null && !isNaN(x1)))
                    return "unable to parse x1 of the primitive coordinates for ID = " + primitiveId;

                // y1
                var y1 = this.reader.getFloat(grandChildren[0], 'y1');
                if (!(y1 != null && !isNaN(y1)))
                    return "unable to parse y1 of the primitive coordinates for ID = " + primitiveId;

                //z1
                var z1 = this.reader.getFloat(grandChildren[0], 'z1');
                if (!(z1 != null && !isNaN(z1)))
                    return "unable to parse z1 of the primitive coordinates for ID = " + primitiveId;


                // x2
                var x2 = this.reader.getFloat(grandChildren[0], 'x2');
                if (!(x2 != null && !isNaN(x2)))
                    return "unable to parse x2 of the primitive coordinates for ID = " + primitiveId;

                // y2
                var y2 = this.reader.getFloat(grandChildren[0], 'y2');
                if (!(y2 != null && !isNaN(y2)))
                    return "unable to parse y2 of the primitive coordinates for ID = " + primitiveId;

                // z2
                var z2 = this.reader.getFloat(grandChildren[0], 'z2');
                if (!(z2 != null && !isNaN(z2)))
                    return "unable to parse z2 of the primitive coordinates for ID = " + primitiveId;


                // x3
                var x3 = this.reader.getFloat(grandChildren[0], 'x3');
                if (!(x3 != null && !isNaN(x3)))
                    return "unable to parse x3 of the primitive coordinates for ID = " + primitiveId;

                // y3
                var y3 = this.reader.getFloat(grandChildren[0], 'y3');
                if (!(y3 != null && !isNaN(y3)))
                    return "unable to parse y3 of the primitive coordinates for ID = " + primitiveId;

                //z3
                var z3 = this.reader.getFloat(grandChildren[0], 'z3');
                if (!(z3 != null && !isNaN(z3)))
                    return "unable to parse z3 of the primitive coordinates for ID = " + primitiveId;


                var triangle = new MyTriangle(this.scene, primitiveId, x1, y1, z1, x2, y2, z2, x3, y3, z3);

                this.primitives[primitiveId] = triangle;


            } else if (primitiveType == 'cylinder') {
                var base = this.reader.getFloat(grandChildren[0], 'base');
                if (!(base != null && !isNaN(base)))
                    return "unable to parse base of the primitive coordinates for ID = " + primitiveId;

                var top = this.reader.getFloat(grandChildren[0], 'top');
                if (!(top != null && !isNaN(top)))
                    return "unable to parse top of the primitive coordinates for ID = " + primitiveId;

                var height = this.reader.getFloat(grandChildren[0], 'height');
                if (!(height != null && !isNaN(height)))
                    return "unable to parse height of the primitive coordinates for ID = " + primitiveId;


                var slices = this.reader.getInteger(grandChildren[0], 'slices');
                if (!(slices != null && !isNaN(slices)))
                    return "unable to parse slices of the primitive coordinates for ID = " + primitiveId;

                var stacks = this.reader.getInteger(grandChildren[0], 'stacks');
                if (!(stacks != null && !isNaN(stacks)))
                    return "unable to parse stacks of the primitive coordinates for ID = " + primitiveId;


                var cylinder = new MyCylinder(this.scene, primitiveId, slices, stacks, base, top, height);

                this.primitives[primitiveId] = cylinder;

            } else if (primitiveType == 'torus') {
                var inner = this.reader.getFloat(grandChildren[0], 'inner');
                if (!(inner != null && !isNaN(inner)))
                    return "unable to parse inner of the primitive coordinates for ID = " + primitiveId;

                var outer = this.reader.getFloat(grandChildren[0], 'outer');
                if (!(outer != null && !isNaN(outer)))
                    return "unable to parse outer of the primitive coordinates for ID = " + primitiveId;
                var slices = this.reader.getInteger(grandChildren[0], 'slices');
                if (!(slices != null && !isNaN(slices)))
                    return "unable to parse slices of the primitive coordinates for ID = " + primitiveId;

                var loops = this.reader.getInteger(grandChildren[0], 'loops');
                if (!(loops != null && !isNaN(loops)))
                    return "unable to parse loops of the primitive coordinates for ID = " + primitiveId;

                var torus = new MyTorus(this.scene, primitiveId, inner, outer, slices, loops);
                this.primitives[primitiveId] = torus;
            } else if (primitiveType == 'plane') {
                let nPartsU = this.reader.getInteger(grandChildren[0], 'npartsU');
                if (!(nPartsU != null && !isNaN(nPartsU)))
                    return "Unable to parse npartsU of the primitive coordinates for ID = " + primitiveId;

                let nPartsV = this.reader.getInteger(grandChildren[0], 'npartsV');
                if (!(nPartsV != null && !isNaN(nPartsV)))
                    return "Unable to parse npartsV of the primitive coordinates for ID = " + primitiveId;

                let plane = new Plane(this.scene, nPartsU, nPartsV);
                this.primitives[primitiveId] = plane;


            } else if (primitiveType == 'cylinder2') {
                let base = this.reader.getFloat(grandChildren[0], 'base');
                if (!(base != null && !isNaN(base)))
                    return "unable to parse base of the primitive coordinates for ID = " + primitiveId;

                let top = this.reader.getFloat(grandChildren[0], 'top');
                if (!(top != null && !isNaN(top)))
                    return "unable to parse top of the primitive coordinates for ID = " + primitiveId;

                let height = this.reader.getFloat(grandChildren[0], 'height');
                if (!(height != null && !isNaN(height)))
                    return "unable to parse height of the primitive coordinates for ID = " + primitiveId;


                let slices = this.reader.getInteger(grandChildren[0], 'slices');
                if (!(slices != null && !isNaN(slices)))
                    return "unable to parse slices of the primitive coordinates for ID = " + primitiveId;

                let stacks = this.reader.getInteger(grandChildren[0], 'stacks');
                if (!(stacks != null && !isNaN(stacks)))
                    return "unable to parse stacks of the primitive coordinates for ID = " + primitiveId;


                let cylinder = new Cylinder2(this.scene, base, top, height, slices, stacks);

                this.primitives[primitiveId] = cylinder;

            } else if (primitiveType == 'patch') {
                let npointsU = this.reader.getInteger(grandChildren[0], 'npointsU');
                if (!(npointsU != null && !isNaN(npointsU)))
                    return "unable to parse npointsU of the primitive coordinates for ID = " + primitiveId;
                let npointsV = this.reader.getInteger(grandChildren[0], 'npointsV');
                if (!(npointsV != null && !isNaN(npointsV)))
                    return "unable to parse npointsV of the primitive coordinates for ID = " + primitiveId;
                let npartsU = this.reader.getInteger(grandChildren[0], 'npartsU');
                if (!(npartsU != null && !isNaN(npartsU)))
                    return "unable to parse npartsU of the primitive coordinates for ID = " + primitiveId;
                let npartsV = this.reader.getInteger(grandChildren[0], 'npartsV');
                if (!(npartsV != null && !isNaN(npartsV)))
                    return "unable to parse npartsV of the primitive coordinates for ID = " + primitiveId;
                
                let controlPointsBlock = grandChildren[0].children;
                if(controlPointsBlock == null || controlPointsBlock.length == 0){
                    return "Patch of id "+primitiveId+ " has no control points"; 
                }

                let counter = 1;
                let controlPoints = [];
                for(const controlPoint of controlPointsBlock){
                    if(controlPoint.nodeName != "controlpoint")
                        return "Unkown tag in control points of patch of id " + primitiveId;
                
                    let xx = this.reader.getFloat(controlPoint, 'xx');
                    if (!(xx != null && !isNaN(xx)))
                    return "unable to parse xx in the control point number:" + counter + " of the patch with ID = " + primitiveId;
                
                    let yy = this.reader.getFloat(controlPoint, 'yy');
                    if (!(yy != null && !isNaN(yy)))
                    return "unable to parse yy in the control point number:" + counter + " of the patch with ID = " + primitiveId;

                    let zz = this.reader.getFloat(controlPoint, 'zz');
                    if (!(zz != null && !isNaN(zz)))
                    return "unable to parse zz in the control point number:" + counter + " of the patch with ID = " + primitiveId;

                    let aux = [xx,yy,zz];
                    controlPoints.push(aux);

                    counter++;
                }   
                
                
                
                if(!(controlPoints.length!= 0 && controlPoints.length == npointsU*npointsV))
                    return "unable to parse controlPoints of the primitive coordinates for ID =" + primitiveId;
                let patch = new Patch(this.scene,npointsU,npointsV,npartsU,npartsV,controlPoints);
                this.primitives[primitiveId] = patch;

            }else if(primitiveType == 'board'){

                let board = new Board(this.scene);
                this.primitives[primitiveId] = board;
            }
            
            
            else if(primitiveType == 'unitCube') {
                let unitCube = new UnitCube(this.scene);
                this.primitives[primitiveId] = unitCube;
            }
            else if(primitiveType == 'frog'){
                let frog = new Frog(this.scene);
                this.primitives[primitiveId] = frog;

            }
            else {
                console.warn("To do: Parse other primitives.");
            }
        }

        this.log("Parsed primitives");
        return null;
    }

    /**
     * Parses the <components> block.
     * @param {components block element} componentsNode
     */
    parseComponents(componentsNode) {
        var children = componentsNode.children;

        this.components = [];

        var grandChildren = [];
        var grandgrandChildren = [];
        var nodeNames = [];

        // Any number of components.
        for (var i = 0; i < children.length; i++) {

            if (children[i].nodeName != "component") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }

            // Get id of the current component.
            var componentID = this.reader.getString(children[i], 'id');
            if (componentID == null)
                return "no ID defined for componentID";

            // Checks for repeated IDs.
            if (this.components[componentID] != null)
                return "ID must be unique for each component (conflict: ID = " + componentID + ")";

            grandChildren = children[i].children;

            nodeNames = [];
            for (var j = 0; j < grandChildren.length; j++) {
                nodeNames.push(grandChildren[j].nodeName);
            }

            var transformationIndex = nodeNames.indexOf("transformation");
            var animationIndex = nodeNames.indexOf("animationref");
            var materialsIndex = nodeNames.indexOf("materials");
            var textureIndex = nodeNames.indexOf("texture");
            var childrenIndex = nodeNames.indexOf("children");

            let newComponent = new SceneTreeNode(this.scene, componentID, this, []);

            // Transformations
            if (transformationIndex < 0) {
                return "Missing transformation for componentId " + componentID;
            }

            let trasnformNodes = grandChildren[transformationIndex].children;
            if (trasnformNodes == null || trasnformNodes.length == 0) {
                let matrix = mat4.create();
                mat4.identity(matrix);
                newComponent.transformationMatrix = matrix;

            } else if (trasnformNodes[0].nodeName == "transformationref") {
                let id = this.reader.getString(trasnformNodes[0], "id", true);

                if (this.transformations[id] == null) {
                    return "Invalid transform id in componentID " + componentID;
                }

                newComponent.transformationMatrix = this.transformations[id];
            } else {
                //Initializes transformation matrix
                let matrix = mat4.create();
                mat4.identity(matrix);

                for (let transNode of trasnformNodes) {
                    //Check if there is a reference mixed with transformation clauses
                    if (transNode.nodeName == "transformationref") {
                        return "transformationref tag mixed with explicit transform at componentID " + componentID;
                    }

                    if (transNode.nodeName === "translate") {
                        //Translation
                        let transPos = this.parseCoordinates3D(transNode, "translate node at componentID " + componentID);

                        mat4.translate(matrix, matrix, transPos);
                    } else if (transNode.nodeName === "rotate") {
                        //Rotation
                        let axis = this.reader.getString(transNode, "axis", true);
                        let angle = this.reader.getFloat(transNode, "angle", true);
                        if (this.axisCoords[axis] == null) {
                            return "Invalid axis in rotation transformation for componentID " + componentID;
                        }

                        mat4.rotate(matrix, matrix, angle * DEGREE_TO_RAD, this.axisCoords[axis]);
                    } else if (transNode.nodeName === "scale") {
                        //Scaling
                        let scaleValues = this.parseCoordinates3D(transNode, "scale node at componentID " + componentID);

                        mat4.scale(matrix, matrix, scaleValues);
                    } else {
                        return "unknown transformation tag in componentID " + componentID;
                    }
                }
                newComponent.transformationMatrix = matrix;
            }

            //Animation
            if (animationIndex != -1) {
                const node = grandChildren[animationIndex];

                const id = this.reader.getString(node, "id", true);
                if (id == null) {
                    return "<animationref> needs id at component with id " + componentID;
                }

                if (this.animations[id] == null) {
                    return "invalid animation id at component with id " + componentID;
                }

                newComponent.animation = this.animations[id];
            }

            // Materials
            if (materialsIndex < 0) {
                return "Missing materials at componentID " + componentID;
            }

            let materialNodes = grandChildren[materialsIndex].children;

            if (materialNodes == null || materialNodes.length == 0) {
                return "Empty materials node at componentID " + componentID;
            }

            if (this.reader.getString(materialNodes[0], "id", true) != "inherit") {
                let componentMaterials = [];
                let hasMaterials = false;
                for (let matNode of materialNodes) {
                    if (matNode.nodeName != "material") {
                        return "Unknown materials child at componentID " + componentID;
                    }

                    hasMaterials = true;
                    let id = this.reader.getString(matNode, "id", true);
                    if (this.materials[id] == null) {
                        return "Non existant material ID at componentID " + componentID;
                    }

                    if (id == "inherit") {
                        return "Component is using own material while also inheriting from parent, this illegal. At componentID " + componentID;
                    }

                    componentMaterials.push(this.materials[id]);
                }

                if (!hasMaterials) {
                    return "Must declare at least one material for componentID " + componentID;
                }

                newComponent.materials = componentMaterials;
            }

            // Texture
            if (textureIndex < 0) {
                return "Missing textures at componentID " + componentID;
            }

            let id = this.reader.getString(grandChildren[textureIndex], "id", true);
            if (id == "inherit") {
                newComponent.length_s = -1;
                newComponent.length_t = -1;
                let length_s = this.reader.getFloat(grandChildren[textureIndex], "length_s", false);
                let length_t = this.reader.getFloat(grandChildren[textureIndex], "length_t", false);

                if (length_s != null || length_t != null) {
                    console.warn("In componentId: " + componentID + ", length_s and length_t should not be defined, as texture is inherited.");
                }
            } else if (id == "none") {
                newComponent.texture = -1;
                let length_s = this.reader.getFloat(grandChildren[textureIndex], "length_s", false);
                let length_t = this.reader.getFloat(grandChildren[textureIndex], "length_t", false);

                if (length_s != null || length_t != null) {
                    console.warn("In componentId: " + componentID + ", length_s and length_t should not be defined, as texture is disabled.");
                }
            } else if (this.textures[id] != null) {
                let length_s = this.reader.getFloat(grandChildren[textureIndex], "length_s", true);
                let length_t = this.reader.getFloat(grandChildren[textureIndex], "length_t", true);
                newComponent.length_s = length_s;
                newComponent.length_t = length_t;
                newComponent.texture = this.textures[id];
            } else {
                return "Invalid texture id at componentID " + componentID;
            }

            // Children
            let componentChildren = [];
            if (childrenIndex < 0) {
                return "Missing children for componentId " + componentID;
            }

            let childrenNodes = grandChildren[childrenIndex].children;
            let hasChildren = false;
            for (let child of childrenNodes) {
                if (child.nodeName == "componentref") {
                    hasChildren = true;
                    let id = this.reader.getString(child, "id", true);
                    if (this.components[id] == null) {
                        return "Non existant componentref at componentID " + componentID;
                    }

                    componentChildren.push(this.components[id]);
                } else if (child.nodeName == "primitiveref") {
                    hasChildren = true;
                    let id = this.reader.getString(child, "id", true);
                    if (this.primitives[id] == null) {
                        return "Non existant primitiveref at componentID " + componentID;
                    }

                    componentChildren.push(this.primitives[id]);
                } else {
                    return "Invalid children tag at componentID " + componentID;
                }
            }

            if (!hasChildren) {
                return "Component of id " + componentID + " has no children";
            }

            newComponent.children = componentChildren;

            this.components[componentID] = newComponent;
        }
    }


    /**
     * Parse the coordinates from a node with ID = id
     * @param {block element} node
     * @param {message to be displayed in case of error} messageError
     */
    parseCoordinates3D(node, messageError) {
        var position = [];

        // x
        var x = this.reader.getFloat(node, 'x');
        if (!(x != null && !isNaN(x)))
            return "unable to parse x-coordinate of the " + messageError;

        // y
        var y = this.reader.getFloat(node, 'y');
        if (!(y != null && !isNaN(y)))
            return "unable to parse y-coordinate of the " + messageError;

        // z
        var z = this.reader.getFloat(node, 'z');
        if (!(z != null && !isNaN(z)))
            return "unable to parse z-coordinate of the " + messageError;

        position.push(...[x, y, z]);

        return position;
    }

    /**
     * Parse the coordinates from a node with ID = id
     * @param {block element} node
     * @param {message to be displayed in case of error} messageError
     */
    parseCoordinates4D(node, messageError) {
        var position = [];

        //Get x, y, z
        position = this.parseCoordinates3D(node, messageError);

        if (!Array.isArray(position))
            return position;


        // w
        var w = this.reader.getFloat(node, 'w', false);
        if (!(w != null && !isNaN(w)))
            return "unable to parse w-coordinate of the " + messageError;

        position.push(w);

        return position;
    }

    /**
     * Parse the color components from a node
     * @param {block element} node
     * @param {message to be displayed in case of error} messageError
     */
    parseColor(node, messageError) {
        var color = [];

        // R
        var r = this.reader.getFloat(node, 'r');
        if (!(r != null && !isNaN(r) && r >= 0 && r <= 1))
            return "unable to parse R component of the " + messageError;

        // G
        var g = this.reader.getFloat(node, 'g');
        if (!(g != null && !isNaN(g) && g >= 0 && g <= 1))
            return "unable to parse G component of the " + messageError;

        // B
        var b = this.reader.getFloat(node, 'b');
        if (!(b != null && !isNaN(b) && b >= 0 && b <= 1))
            return "unable to parse B component of the " + messageError;

        // A
        var a = this.reader.getFloat(node, 'a');
        if (!(a != null && !isNaN(a) && a >= 0 && a <= 1))
            return "unable to parse A component of the " + messageError;

        color.push(...[r, g, b, a]);

        return color;
    }

    /*
     * Callback to be executed on any read error, showing an error on the console.
     * @param {string} message
     */
    onXMLError(message) {
        console.error("XML Loading Error: " + message);
        this.loadedOk = false;
    }

    /**
     * Callback to be executed on any minor error, showing a warning on the console.
     * @param {string} message
     */
    onXMLMinorError(message) {
        console.warn("Warning: " + message);
    }

    /**
     * Callback to be executed on any message.
     * @param {string} message
     */
    log(message) {
        console.log("   " + message);
    }

    applyMaterial(m) {
        this.activeMaterial = m;
        m.apply();
    }

    pushMaterial() {
        this.materialStack.push(this.activeMaterial);
    }

    popMaterial() {
        let mat = this.materialStack[this.materialStack.length - 1];
        this.activeMaterial = mat;
        if (mat != null) {
            mat.apply();
        } else {
            this.scene.setDefaultAppearance();
        }
        this.materialStack.pop();
    }

    applyTexture(t) {
        this.activeTexture = t;
        if (this.activeMaterial) {
            this.activeMaterial.setTexture(t);
            this.activeMaterial.apply();
        }
    }

    pushTexture() {
        this.textureStack.push(this.activeTexture);
    }

    popTexture() {
        let tex = this.textureStack[this.textureStack.length - 1];
        if (this.activeMaterial) {
            this.activeMaterial.setTexture(tex);
            this.activeMaterial.apply();
        }
        this.textureStack.pop();
    }


    updateMaterials() {
        Object.keys(this.components).forEach(key => {
            this.components[key].rotateMaterials();
        });
    }

    getCamera(index) {
        return this.views[index];
    }

    getActiveCamera() {
        return this.views[this.activeView];
    }

    changeCamera() {
        this.scene.camera = this.views[this.activeView];
        this.scene.interface.setActiveCamera(this.scene.camera);
    }

    updateAnimations(t) {
        const keys = Object.keys(this.animations);
        for (const key of keys) {
            this.animations[key].update(t);
        }
    }

    /**
     * Displays the scene, processing each node, starting in the root node.
     */
    displayScene() {
        this.components[this.idRoot].display();
    }
}