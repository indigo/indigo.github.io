import{a as b,V as h,T as E,b as P,c as T,C as y,M as R,D as H,d as w,B as M,L as D,e as F,O as I,f as V,g as C,A as U,P as O,G as W,h as N,i as L,s as B,j,k as _,l as X,m as K,n as q}from"./SceneManager-BQ4ujJnr.js";class $ extends b{getPoint(e,t=new h){const i=t;e=2*Math.PI*e;const n=-.22*Math.cos(e)-1.28*Math.sin(e)-.44*Math.cos(3*e)-.78*Math.sin(3*e),a=-.1*Math.cos(2*e)-.27*Math.sin(2*e)+.38*Math.cos(4*e)+.46*Math.sin(4*e),s=.7*Math.cos(3*e)-.4*Math.sin(3*e);return i.set(n,a,s).multiplyScalar(20)}}class J extends b{constructor(e=5){super(),this.scale=e}getPoint(e,t=new h){const i=t;e*=2*Math.PI;const n=16*Math.pow(Math.sin(e),3),a=13*Math.cos(e)-5*Math.cos(2*e)-2*Math.cos(3*e)-Math.cos(4*e);return i.set(n,a,0).multiplyScalar(this.scale)}}class Q extends b{constructor(e=70){super(),this.scale=e}getPoint(e,t=new h){const i=t;e=e*4*Math.PI;const n=this.scale/2,a=n*(1+Math.cos(e)),s=n*Math.sin(e),o=2*n*Math.sin(e/2);return i.set(a,s,o)}}var Y=`uniform float u_time;
uniform vec2 u_resolution;
uniform vec3 u_color;
uniform float u_cellCount;
uniform float u_edgeThickness;
uniform float u_cellRandomness;
uniform float u_tilingFactor;
uniform float u_depthStart;
uniform float u_depthEnd;

varying vec2 vUv;
varying float vCurveDistance;
varying float vViewDepth;
varying float vTubeCircumference;

const vec3 PURPLE_LIGHT = vec3(0.85, 0.75, 0.95);
const vec3 PURPLE_MED = vec3(0.65, 0.55, 0.75);
const vec3 PURPLE_DARK = vec3(0.45, 0.35, 0.55);
const vec3 EDGE_COLOR = vec3(0.15, 0.15, 0.15);

vec2 hash22(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * vec3(.1031, .1030, .0973));
    p3 += dot(p3, p3.yzx+33.33);
    return fract((p3.xx+p3.yz)*p3.zy);
}

vec2 distanceFunction(vec2 point1, vec2 point2, vec2 period) {
    vec2 diff = abs(point1 - point2);
    return min(diff, period - diff);
}

float voronoi(vec2 uv, out float cellIndex) {
    vec2 period = vec2(1.0, 1.0); 
    uv *= vec2(u_cellCount);
    
    vec2 i_st = floor(uv);
    vec2 f_st = fract(uv);
    
    float minDist = 1.0;  
    float secondMinDist = 1.0;  
    vec2 minPoint = vec2(0.0);
    vec2 cellI_st;  
    
    
    for(int y = -1; y <= 1; y++) {
        for(int x = -1; x <= 1; x++) {
            vec2 neighbor = vec2(float(x), float(y));
            
            
            vec2 point = hash22(mod(i_st + neighbor, u_cellCount));
            point = neighbor + mix(vec2(0.5), point, u_cellRandomness);
            
            
            vec2 diff = point - f_st;
            float dist = length(diff);
            
            
            if(dist < minDist) {
                secondMinDist = minDist;
                minDist = dist;
                minPoint = point;
                cellI_st = i_st + neighbor;
            } else if(dist < secondMinDist) {
                secondMinDist = dist;
            }
        }
    }
    
    
    vec2 wrappedCell = mod(cellI_st, u_cellCount);
    cellIndex = hash22(wrappedCell).x;  
    return secondMinDist - minDist; 
}

void main() {
    
    vec2 uv = vec2(
        fract(vCurveDistance * u_tilingFactor),
        fract(vUv.y)
    );
    
    
    float cellIndex;
    float v = voronoi(uv, cellIndex);
    
    
    float edge = smoothstep(0.0, u_edgeThickness, v);
    
    
    float t = fract(cellIndex * 5.432);
    vec3 cellColor = mix(PURPLE_LIGHT, PURPLE_DARK, t);
    
    
    vec3 color = mix(cellColor, EDGE_COLOR, 1.0 - edge);
    
    
    float opacity = 1.0 - smoothstep(u_depthStart, u_depthEnd, vViewDepth);
    
    gl_FragColor = vec4(color, opacity);
}`,Z=`varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;
varying float vCurveDistance;
varying float vViewDepth;
varying float vTubeCircumference;

uniform mat4 u_viewMatrix;
uniform float u_tilingFactor;

void main() {
    vUv = uv;
    vCurveDistance = uv.x;
    
    
    float radius = length(position.xy);
    vTubeCircumference = 2.0 * 3.14159 * radius;
    
    
    vNormal = normalize(normalMatrix * normal);
    vPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    
    
    vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
    vViewDepth = abs(viewPosition.z);
    
    gl_Position = projectionMatrix * viewPosition;
}`;const z={GrannyKnot:new $,HeartCurve:new J(3.5),VivianiCurve:new Q(70)};class ee{constructor(e){this.scene=e,this.mesh=null,this.params={spline:"GrannyKnot",scale:6,extrusionSegments:500,radiusSegments:7,closed:!0,color:13815272},this.createTube()}createTube(){this.mesh&&(this.scene.remove(this.mesh),this.mesh.geometry.dispose(),this.mesh.material.dispose());const e=z[this.params.spline],t=new E(e,this.params.extrusionSegments,1,this.params.radiusSegments,this.params.closed),i=t.tangents.length;this.pathData={spline:e,segments:i,points:new Array(i),tangents:new Array(i),normals:new Array(i),binormals:new Array(i)};for(let s=0;s<i;s++){const o=s/i;this.pathData.points[s]=e.getPointAt(o,new h),this.pathData.tangents[s]=e.getTangentAt(o,new h),this.pathData.normals[s]=new h,this.pathData.binormals[s]=new h}const n=new h(0,1,0);for(let s=0;s<i;s++){const o=this.pathData.tangents[s],r=this.pathData.normals[s],c=this.pathData.binormals[s];c.crossVectors(n,o).normalize(),r.crossVectors(o,c)}const a=new P({uniforms:{u_time:{value:0},u_resolution:{value:new T(window.innerWidth,window.innerHeight)},u_color:{value:new y(this.params.color)},u_cameraPosition:{value:new h},u_viewMatrix:{value:new R},u_cellCount:{value:42},u_edgeThickness:{value:.01},u_cellRandomness:{value:1},u_tilingFactor:{value:32},u_depthStart:{value:5},u_depthEnd:{value:50}},vertexShader:Z,fragmentShader:Y,transparent:!0,side:H,depthTest:!0,depthWrite:!0});this.mesh=new w(t,a),this.mesh.scale.setScalar(this.params.scale),this.scene.add(this.mesh),this.pathPoints=e.getPoints(400),this.visualizePath()}visualizePath(){this.debugLine&&(this.scene.remove(this.debugLine),this.debugLine.geometry.dispose(),this.debugLine.material.dispose());const e=new M().setFromPoints(this.pathPoints),t=new D({color:14540100});this.debugLine=new F(e,t),this.debugLine.scale.setScalar(this.params.scale),this.scene.add(this.debugLine)}update(e,t){this.mesh&&(this.mesh.material.uniforms.u_time.value=e,this.mesh.material.uniforms.u_resolution.value.set(window.innerWidth,window.innerHeight),this.mesh.material.uniforms.u_cameraPosition.value.copy(t.position),this.mesh.material.uniforms.u_viewMatrix.value.copy(t.matrixWorldInverse))}dispose(){this.mesh&&(this.mesh.geometry.dispose(),this.mesh.material.dispose(),this.scene.remove(this.mesh))}}class te{constructor(e,t,i=1){this.scene=e,this.splineGeometry=t,this.radius=i,this.debugLine=null,this.params={turns:10,visibleRange:[-.35,.35]},this.createPath()}createPath(){this.debugLine&&(this.scene.remove(this.debugLine),this.debugLine.geometry.dispose(),this.debugLine.material.dispose());const e=[],t=this.splineGeometry.pathData.points.length;for(let a=0;a<t;a++){const s=a/(t-1),o=this.splineGeometry.pathData.points[Math.floor(s*(this.splineGeometry.pathData.points.length-1))],r=this.splineGeometry.pathData.normals[Math.floor(s*(this.splineGeometry.pathData.normals.length-1))],c=this.splineGeometry.pathData.binormals[Math.floor(s*(this.splineGeometry.pathData.binormals.length-1))],m=s*Math.PI*2*this.params.turns,p=(Math.sin(m)+1)*.5,v=(this.params.visibleRange[0]+p*(this.params.visibleRange[1]-this.params.visibleRange[0]))*Math.PI,u=new h().addScaledVector(r,Math.cos(v)*this.radius).addScaledVector(c,Math.sin(v)*this.radius),g=o.clone().add(u);e.push(g)}const i=new M().setFromPoints(e),n=new D({color:16729156,transparent:!0,opacity:.8});this.debugLine=new F(i,n),this.debugLine.scale.setScalar(this.splineGeometry.params.scale),this.scene.add(this.debugLine)}dispose(){this.debugLine&&(this.scene.remove(this.debugLine),this.debugLine.geometry.dispose(),this.debugLine.material.dispose())}}var se=`varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
    vUv = uv;
    vNormal = normalMatrix * normal;
    vPosition = position;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`,ie=`uniform vec3 u_color;
uniform float u_time;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
    
    float pulse = sin(u_time * 2.0) * 0.5 + 0.5;
    
    
    vec3 viewDir = normalize(-vPosition);
    float rim = 1.0 - max(dot(viewDir, normalize(vNormal)), 0.0);
    rim = pow(rim, 3.0);
    
    
    vec3 finalColor = mix(u_color, vec3(1.0), rim * pulse);
    
    gl_FragColor = vec4(finalColor, 1.0);
}`;class ae{constructor(e){this.container=new I,this.params={characterDistance:5e-4,characterOffset:.023,characterSize:1.3,characterRotationFactor:1.4,color:16711680},this.setupCharacter(),e.add(this.container)}setupCharacter(){const e=new V(1,2,4);e.rotateX(-Math.PI/2);const t=new P({uniforms:{u_color:{value:new y(this.params.color)},u_time:{value:0}},vertexShader:se,fragmentShader:ie,transparent:!0});this.mesh=new w(e,t),this.mesh.scale.setScalar(.3),this.container.add(this.mesh)}update(e,t,i){t.getPointAt(i,this.container.position);const n=t.getTangentAt(i);new h(0,1,0);const a=Math.atan2(n.x,n.z);this.container.rotation.y=a*this.params.characterRotationFactor,this.mesh.material.uniforms.u_time.value=e}setColor(e){this.params.color=e,this.mesh&&this.mesh.material.uniforms.u_color.value.set(e)}dispose(){this.mesh&&(this.mesh.geometry.dispose(),this.mesh.material.dispose())}}class ne{constructor(e){this.scene=e,this.params={starCount:1e3,starSize:1,starSpread:200,starTwinkleSpeed:1},this.setupStarField()}setupStarField(){const e=new M,t=new Float32Array(this.params.starCount*3),i=new Float32Array(this.params.starCount*3),n=new Float32Array(this.params.starCount);for(let s=0;s<this.params.starCount;s++){const o=s*3;t[o]=(Math.random()-.5)*this.params.starSpread,t[o+1]=(Math.random()-.5)*this.params.starSpread,t[o+2]=(Math.random()-.5)*this.params.starSpread;const r=new y;r.setHSL(Math.random(),.2,.8),i[o]=r.r,i[o+1]=r.g,i[o+2]=r.b,n[s]=Math.random()*this.params.starSize}e.setAttribute("position",new C(t,3)),e.setAttribute("color",new C(i,3)),e.setAttribute("size",new C(n,1));const a=new P({uniforms:{u_time:{value:0},u_twinkleSpeed:{value:this.params.starTwinkleSpeed}},vertexShader:`
                attribute float size;
                varying vec3 vColor;
                uniform float u_time;
                uniform float u_twinkleSpeed;
                
                void main() {
                    vColor = color;
                    float twinkle = sin(u_time * u_twinkleSpeed + position.x + position.y + position.z) * 0.5 + 0.5;
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    gl_PointSize = size * twinkle * (300.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,fragmentShader:`
                varying vec3 vColor;
                
                void main() {
                    gl_FragColor = vec4(vColor, 1.0);
                }
            `,blending:U,depthTest:!1,transparent:!0,vertexColors:!0});this.points=new O(e,a),this.scene.add(this.points)}update(e){this.points&&(this.points.material.uniforms.u_time.value=e,this.points.material.uniforms.u_twinkleSpeed.value=this.params.starTwinkleSpeed)}updateStarField(){this.points&&(this.scene.remove(this.points),this.points.geometry.dispose(),this.points.material.dispose()),this.setupStarField()}dispose(){this.points&&(this.points.geometry.dispose(),this.points.material.dispose(),this.scene.remove(this.points))}}class oe{constructor(e,t,i,n,a){this.gui=new W,this.sceneManager=e,this.splineGeometry=t,this.character=i,this.starField=n,this.collectibles=a,this.pathGeometry=e.pathGeometry,this.setupGui()}setupGui(){const e=this.gui.addFolder("Geometry"),t=this.splineGeometry.params;e.add(t,"spline",Object.keys(z)).onChange(()=>{this.splineGeometry.createTube(),this.pathGeometry.createPath()}),e.add(t,"scale",2,10).step(1).onChange(()=>{this.splineGeometry.mesh&&(this.splineGeometry.mesh.scale.setScalar(t.scale),this.pathGeometry.debugLine&&this.pathGeometry.debugLine.scale.setScalar(t.scale))}),e.add(t,"extrusionSegments",50,500).step(50).onChange(()=>{this.splineGeometry.createTube(),this.pathGeometry.createPath()}),e.add(t,"radiusSegments",2,12).step(1).onChange(()=>this.splineGeometry.createTube()),e.add(t,"closed").onChange(()=>{this.splineGeometry.createTube(),this.pathGeometry.createPath()}),e.open();const i=this.gui.addFolder("Path"),n=this.pathGeometry.params;i.add(n,"turns",1,20).step(1).name("Number of Turns").onChange(()=>{this.pathGeometry.createPath(),this.collectibles.createCollectibles()}),i.open();const a=this.gui.addFolder("Collectibles"),s=this.collectibles.params;a.add(s,"count",50,250).step(5).name("Count").onChange(()=>this.collectibles.createCollectibles()),a.add(s,"size",.2,1).step(.1).name("Size").onChange(()=>this.collectibles.createCollectibles()),a.addColor(s,"color").name("Color").onChange(()=>this.collectibles.createCollectibles()),a.open();const o=this.gui.addFolder("Camera"),r=this.sceneManager.params;o.add(r,"followPath").name("Follow Path"),o.add(r,"cameraRadius",.5,5).name("Camera Distance").step(.1),o.add(r,"lookAhead",0,50).name("Look Ahead").step(1),o.open();const c=this.gui.addFolder("Character"),m=this.character.params;c.add(m,"characterDistance",1e-4,.001).step(1e-4).name("Speed"),c.add(m,"characterOffset",0,.05).step(.001).name("Character Radius"),c.add(m,"characterSize",.1,2).step(.1).name("Character Size"),c.add(m,"characterRotationFactor",.1,2).step(.1).name("Character Rotation"),c.open();const p=this.gui.addFolder("Star Field"),d=this.starField.params;p.add(d,"starCount",100,2e3).step(100).onChange(()=>this.starField.updateStarField()),p.add(d,"starSize",.1,2).step(.1).onChange(()=>this.starField.updateStarField()),p.add(d,"starTwinkleSpeed",.1,5).step(.1),p.add(d,"starSpread",100,500).step(10).onChange(()=>this.starField.updateStarField()),p.open();const v=this.gui.addFolder("Appearance");v.addColor({color:this.sceneManager.scene.background.getHex()},"color").name("Background").onChange(u=>{this.sceneManager.scene.background.setHex(u)}),v.addColor(t,"color").name("Color").onChange(u=>{this.splineGeometry.mesh&&this.splineGeometry.mesh.material.uniforms.u_color.value.set(u),this.character.setColor(u)}),v.open()}dispose(){this.gui&&this.gui.destroy()}}class re{constructor(e,t){this.scene=e,this.pathGeometry=t,this.collectibles=[],this.params={count:20,size:.5,color:16768324},this.createCollectibles()}createCollectibles(){this.collectibles.forEach(s=>{this.scene.remove(s),s.geometry.dispose(),s.material.dispose()}),this.collectibles=[];const e=new N(this.params.size),t=new L({color:this.params.color,transparent:!0,opacity:.8}),i=this.pathGeometry.debugLine.geometry.attributes.position.count,n=this.pathGeometry.debugLine.geometry.attributes.position.array,a=this.pathGeometry.splineGeometry.params.scale;for(let s=0;s<this.params.count;s++){const o=s/(this.params.count-1),r=Math.floor(o*(i-1))*3,c=new w(e,t);c.userData.basePosition=new h(n[r]*a,n[r+1]*a,n[r+2]*a),c.position.copy(c.userData.basePosition),this.collectibles.push(c),this.scene.add(c)}}update(e){this.collectibles.forEach((t,i)=>{t.rotation.x=e*2,t.rotation.y=e*3,t.position.copy(t.userData.basePosition);const n=Math.sin(e*4+i)*.2;t.position.y+=n})}dispose(){this.collectibles.forEach(e=>{this.scene.remove(e),e.geometry.dispose(),e.material.dispose()}),this.collectibles=[]}}const x=new h;new h;const S=new h,f=new h,G=new h;class ce{constructor(e,t,i){this.container=e,this.renderer=t,this.renderer.setPixelRatio(window.devicePixelRatio),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.outputEncoding=B,this.scene=i,this.scene.background=new y(2632246),this.params={followPath:!0,lookAhead:10,mouseX:0,cameraRadius:1.5},this.activeCamera=null;const n=new j(16772846,1.5);n.position.set(0,0,1),this.scene.add(n),this.setupCamera(),this.setupComponents(),this.setupMouseTracking(),this.t=0}setupCamera(){this.camera=new _(84,window.innerWidth/window.innerHeight,.01,1e3),this.camera.position.set(0,20,100),this.controls=new X(this.camera,this.container),this.controls.enableDamping=!0,this.controls.dampingFactor=.05,this.controls.target.set(0,0,0),this.controls.enabled=!this.params.followPath,this.controls.update(),this.splineCamera=new _(84,window.innerWidth/window.innerHeight,.01,1e3),this.cameraHelper=new K(this.splineCamera),this.cameraHelper.visible=!1,this.scene.add(this.splineCamera),this.scene.add(this.cameraHelper),this.cameraEye=new w(new q(2,8,8),new L({color:13815272})),this.scene.add(this.cameraEye),this.cameraEye.visible=!1,window.addEventListener("resize",()=>{const e=window.innerWidth/window.innerHeight;this.camera.aspect=e,this.camera.updateProjectionMatrix(),this.splineCamera.aspect=e,this.splineCamera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight)})}setupComponents(){this.splineGeometry=new ee(this.scene),this.pathGeometry=new te(this.scene,this.splineGeometry,1.2),this.character=new ae(this.scene),this.starField=new ne(this.scene),this.collectibles=new re(this.scene,this.pathGeometry),this.splineGeometry.visualizePath(),this.container.hasAttribute("data-show-gui")&&(this.guiControls=new oe(this,this.splineGeometry,this.character,this.starField,this.collectibles),this.guiControls.gui.domElement.parentElement===document.body&&this.container.appendChild(this.guiControls.gui.domElement))}setupMouseTracking(){const e=i=>{this.params.mouseX=i.clientX/window.innerWidth*2-1},t=i=>{i.touches.length>0&&(this.params.mouseX=i.touches[0].clientX/window.innerWidth*2-1)};this.container.addEventListener("mousemove",e),this.container.addEventListener("touchmove",t)}update(e){if(!this.splineGeometry.mesh)return;const t=this.splineGeometry.mesh.geometry.parameters.path;this.t=e*this.character.params.characterDistance,this.t=this.t-Math.floor(this.t),this.character.update(e,t,this.t),this.starField.update(e),this.collectibles.update(e),this.params.followPath?(this.updateCamera(e,t),this.activeCamera=this.splineCamera,this.controls.enabled=!1,this.cameraEye.visible=!0):(this.controls.enabled=!0,this.controls.update(),this.activeCamera=this.camera,this.cameraEye.visible=!1),this.splineGeometry.update(e,this.activeCamera),this.renderer.render(this.scene,this.activeCamera)}updateCamera(e,t){if(!this.splineGeometry.mesh)return;const n=e*10%1,a=this.splineGeometry.pathData,s=a.segments,o=n*s,r=Math.floor(o),c=(r+1)%s,m=o-r;f.copy(a.points[r]).lerp(a.points[c],m),f.multiplyScalar(this.splineGeometry.params.scale),x.copy(a.tangents[r]).lerp(a.tangents[c],m),S.copy(a.normals[r]).lerp(a.normals[c],m);const p=Math.PI/2*this.params.mouseX,d=S.clone();d.applyAxisAngle(x,p);const v=this.splineGeometry.params.scale*this.params.cameraRadius;f.add(d.multiplyScalar(v));const u=(n+this.params.lookAhead/(a.segments*2))%1,g=Math.floor(u*s),k=(g+1)%s,A=u*s-g;G.copy(a.points[g]).lerp(a.points[k],A).multiplyScalar(this.splineGeometry.params.scale),this.splineCamera.position.copy(f),this.splineCamera.matrix.lookAt(this.splineCamera.position,G,d),this.splineCamera.quaternion.setFromRotationMatrix(this.splineCamera.matrix),this.cameraHelper.update(),this.cameraEye.position.copy(this.splineCamera.position)}dispose(){this.splineGeometry.dispose(),this.character.dispose(),this.starField.dispose(),this.collectibles.dispose(),this.cameraHelper.dispose(),this.cameraEye.geometry.dispose(),this.cameraEye.material.dispose()}}const le={name:"Spline Extrusion",description:"Interactive 3D spline extrusion visualization with camera following path",camera:"perspective",setup:(l,e,t,i)=>({sceneManager:new ce(l,e,t)}),animate:(l,e)=>(l.sceneManager.update(e*.001),l.sceneManager.activeCamera)};export{le as c};
