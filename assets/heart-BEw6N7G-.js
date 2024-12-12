import{C as n}from"./SceneManager-BQ4ujJnr.js";var r=`void main() {
    
    gl_Position = vec4(position, 1.0);
}`,a=`precision mediump float;
uniform vec2 u_resolution;

vec3 heart(vec2 p, float scale, vec3 heart_color) {
    p = 10. * p / scale;
    p.y += .6;
    float k = 1.2 * p.y - sqrt(abs(p.x) + .3);
    float brightness = 1. - ( (p.x * p.x + k * k - 1.) < 0. ? 0. : 1.);
    return brightness * heart_color;
}

void main(){
    
    vec2 uv = (gl_FragCoord.xy / u_resolution) - .5;
    uv.x = uv.x * u_resolution.x / u_resolution.y;

    vec3 col = heart(uv, 1.,vec3(0.8,0.,0.));
    vec3 background = vec3(.1);
    gl_FragColor = vec4(col + background, 1.0);
}`;const l={name:"Heart Shader",description:"A simple heart-shaped shader visualization",vertexShader:r,fragmentShader:a,uniforms:{u_color:{value:new n(16711680)}},setupGui:(o,e)=>{o.addColor(e.u_color,"value").name("Color")}};export{l as c};
