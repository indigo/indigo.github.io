import"./modulepreload-polyfill-B5Qt9EMX.js";import{S as d}from"./SceneManager-BQ4ujJnr.js";import{c as h}from"./heart-BEw6N7G-.js";import{c as m}from"./spline-DMyxfTYk.js";const i={heart:h,spline:m};document.body.classList.add("loading");window.addEventListener("load",()=>{document.body.classList.remove("loading")});function o(n){const r=n.getAttribute("href");if(r){const e=document.createElement("link");e.rel="prefetch",e.href=r,document.head.appendChild(e)}}function l(){const n=document.querySelector(".shader-grid");if(!n)return;const r=document.createElement("a");r.className="shader-card",r.href="/src/examples/portfolio.html",r.innerHTML=`
        <div class="shader-container" style="background: url('/images/Thumbnail_portfolio.png') center/cover no-repeat;"></div>
        <div class="shader-info">
            <h3>My gaming portfolio</h3>
            <p>My life as a Video Game Producer</p>
        </div>
    `,r.addEventListener("mouseenter",()=>o(r)),n.appendChild(r),Object.entries(i).forEach(([e,a])=>{const t=document.createElement("a");t.className="shader-card",t.href=`/src/examples/${e}.html`,t.innerHTML=`
            <div id="shader-${e}" class="shader-container"></div>
            <div class="shader-info">
                <h3>${a.name}</h3>
                <p>${a.description}</p>
            </div>
        `,t.addEventListener("mouseenter",()=>o(t)),n.appendChild(t);const c=t.querySelector(`#shader-${e}`),s=new d(c,{showGui:!1,showStats:!1,camera:a.camera||"orthographic"});a.vertexShader&&a.fragmentShader?s.setShader(a.vertexShader,a.fragmentShader,a.uniforms):s.setup(a),s.animate()})}if(document.querySelector(".shader-grid"))l();else if(document.getElementById("sketch-container")){const n=window.location.pathname.split("/"),r=n[n.length-1].replace(".html",""),e=i[r];if(e){const a=document.getElementById("sketch-container"),t=new d(a,{showGui:!0,showStats:!0,camera:e.camera||"orthographic"});e.vertexShader&&e.fragmentShader?t.setShader(e.vertexShader,e.fragmentShader,e.uniforms):t.setup(e),t.animate()}}
