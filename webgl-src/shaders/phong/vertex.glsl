#version 300 es
precision highp float;

in vec3 aVertexPosition;
in vec3 aVertexNormal;
in vec2 aTextureCoord;

uniform bool uUseTexture;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform bool uLightEnabled;	// not being used
uniform bool uLightModelTwoSided;	// not being used

out vec4 passPosition;
out vec3 passNormal;
out vec2 vTextureCoord;


void main() {

    // Transformed Vertex position
    vec4 vertex = uMVMatrix * vec4(aVertexPosition, 1.0);

    // Transformed normal position
	passNormal = normalize(vec3(uNMatrix * vec4(aVertexNormal, 1.0)));


	gl_Position = uPMatrix * vertex;
    passPosition = vertex;

    if (uUseTexture)
        vTextureCoord = aTextureCoord;

}

