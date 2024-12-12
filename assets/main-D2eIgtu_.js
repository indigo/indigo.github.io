import"./modulepreload-polyfill-B5Qt9EMX.js";import{S as i}from"./SceneManager-BQ4ujJnr.js";import{c as l}from"./heart-BEw6N7G-.js";import{c as m}from"./spline-DMyxfTYk.js";const c={heart:l,spline:m};document.body.classList.add("loading");window.addEventListener("load",()=>{document.body.classList.remove("loading")});function d(t){const a=t.getAttribute("href");if(a){const e=document.createElement("link");e.rel="prefetch",e.href=a,document.head.appendChild(e)}}function p(){const t=document.querySelector(".shader-grid");if(!t)return;const a=document.createElement("a");a.className="shader-card",a.href="/src/examples/portfolio.html",a.innerHTML=`
        <div class="shader-container" style="background: url('/images/Thumbnail_portfolio.png') center/cover no-repeat;"></div>
        <div class="shader-info">
            <h3>My gaming portfolio</h3>
            <p>My life as a Video Game Producer</p>
        </div>
    `,a.addEventListener("mouseenter",()=>d(a)),t.appendChild(a);const e=document.createElement("a");e.className="shader-card",e.href="/src/examples/video.html",e.innerHTML=`
        <div class="shader-container" style="background: url('/images/Thumbnail_video_01.png') center/cover no-repeat;"></div>
        <div class="shader-info">
            <h3>Music with Robin</h3>
            <p>A little jam with my son Robin</p>
        </div>
    `,e.addEventListener("mouseenter",()=>d(e)),t.appendChild(e),Object.entries(c).forEach(([s,r])=>{const n=document.createElement("a");n.className="shader-card",n.href=`/src/examples/${s}.html`,n.innerHTML=`
            <div id="shader-${s}" class="shader-container"></div>
            <div class="shader-info">
                <h3>${r.name}</h3>
                <p>${r.description}</p>
            </div>
        `,n.addEventListener("mouseenter",()=>d(n)),t.appendChild(n);const h=n.querySelector(`#shader-${s}`),o=new i(h,{showGui:!1,showStats:!1,camera:r.camera||"orthographic"});r.vertexShader&&r.fragmentShader?o.setShader(r.vertexShader,r.fragmentShader,r.uniforms):o.setup(r),o.animate()})}if(document.querySelector(".shader-grid"))p();else if(document.getElementById("sketch-container")){const t=window.location.pathname.split("/"),a=t[t.length-1].replace(".html",""),e=c[a];if(e){const s=document.getElementById("sketch-container"),r=new i(s,{showGui:!0,showStats:!0,camera:e.camera||"orthographic"});e.vertexShader&&e.fragmentShader?r.setShader(e.vertexShader,e.fragmentShader,e.uniforms):r.setup(e),r.animate()}}
