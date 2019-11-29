#version 300 es
precision highp float;

in vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform float time;

out vec4 fragColor;

void main() {

    vec4 texColor = texture(uSampler, vec2(vTextureCoord.x, 1.0-vTextureCoord.y));

    vec2 centerToPos = vTextureCoord - vec2(0.5,0.5);
    float dist = length(centerToPos);

    float perc = 1.0 - (dist/0.5);

    vec4 color = vec4(texColor.xyz * perc, 1);

    float offset = sin((vTextureCoord.y + time) * 20.0)*0.5 + 0.5;

    fragColor = color + offset * 0.5;
}