varying vec2 vUv;
varying float vElevation;
uniform float uColorChange;

void main() {
    vec4 c1 = vec4(0.757, 0.537, 0.965, 1.0);
    vec4 c2 = vec4(0.894, 0.804, 0.984, 1.0);

    vec4 c3 = vec4(0.6, .5, .9, .9); 
    vec4 c4 = vec4(0.3, 0.3, 0.7, 0.4);
    float v = smoothstep(-.1 , 1. ,vElevation*2.5);
    vec4 colorPurple = mix(c1,c2,v);
    vec4 colorBlue = mix(c3,c4,v);
    vec4 finalColor = mix(colorPurple, colorBlue, uColorChange);

    gl_FragColor = finalColor;  
}
