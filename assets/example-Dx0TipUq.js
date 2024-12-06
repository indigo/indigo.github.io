import{S as a}from"./SceneManager-BZ_Gb5p5.js";/* empty css               */const e={name:"Example",description:"Basic WebGL example",camera:"perspective",cameraPosition:[0,0,5],uniforms:{uTime:{value:0},uResolution:{value:[800,600]}},vertexShader:`
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,fragmentShader:`
        uniform float uTime;
        uniform vec2 uResolution;
        varying vec2 vUv;

        void main() {
            vec2 uv = vUv;
            vec3 color = 0.5 + 0.5 * cos(uTime + uv.xyx + vec3(0, 2, 4));
            gl_FragColor = vec4(color, 1.0);
        }
    `},r=document.getElementById("sketch-container"),o=new a(r,{showGui:!0,showStats:!0,camera:e.camera});o.setShader(e.vertexShader,e.fragmentShader,e.uniforms);o.animate();
