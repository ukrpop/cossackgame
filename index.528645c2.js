let e,t,n,o,r,a,d,c;function l(e,t){return parseFloat(getComputedStyle(e).getPropertyValue(t))||0}function s(e,t,n){e.style.setProperty(t,n)}function i(e,t,n){s(e,t,l(e,t)+n)}const u=document.querySelectorAll("[data-ground]"),m=document.querySelector("[data-dino]");function f(t){t.code&&"Space"!==t.code||e||("touchstart"===t.type&&t.preventDefault(),o=.45,e=!0)}const v=document.querySelector("[data-world]"),h=[],g=document.querySelector("[data-world]"),y=document.querySelector("[data-score]"),w=document.querySelector("[data-start-screen]");function p(f){var g,S,q,k;if(null==a){a=f,window.requestAnimationFrame(p);return}let b=f-a;if(g=d,u.forEach(e=>{i(e,"--left",-(b*g*.05)),-300>=l(e,"--left")&&i(e,"--left",600)}),function(o,r){if(e){m.src="dino-stationary.svg";return}n>=100&&(t=(t+1)%2,m.src=`dino-run-${t}.svg`,n-=100),n+=o*r}(b,d),e&&(m.src="dino-jump.svg",i(m,"--bottom",o*b),0>=l(m,"--bottom")&&(s(m,"--bottom",0),e=!1,m.src=`dino-run-${t}.svg`),o-=.0015*b),S=d,document.querySelectorAll("[data-cactus]").forEach(e=>{i(e,"--left",-(b*S*.05)),-100>=l(e,"--left")&&e.remove()}),r<=0&&(function(){let e=document.createElement("img");e.dataset.cactus=!0,e.classList.add("cactus"),s(e,"--left",100),v.append(e),e.src="fire1.svg";let t=0,n=["fire1.svg","fire2.svg","fire4.svg"],o=setInterval(()=>{e.src=n[t],t=(t+1)%n.length},250);setTimeout(()=>{clearInterval(o)},4e3)}(),r=Math.floor(1201*Math.random()+800)/S),r-=b,q=b,k=d,h.forEach(e=>{i(e,"--left",-(q*k*.05)),-10>=l(e,"--left")&&(e.remove(),h.shift())}),Math.random()<8e-4*q&&0===h.length&&function(){let e=document.createElement("div");e.classList.add("item"),s(e,"--left",100),s(e,"--bottom",50*Math.random()+60);let t=document.createElement("img");t.src="leleka1.svg",t.alt="Leleka",t.style.width="auto",t.style.height="200%",t.style.zIndex="-1",e.appendChild(t),document.querySelector("[data-world]").append(e),h.push(e),function(e){let t=!0,n=setInterval(()=>{if(!e.parentElement){clearInterval(n);return}e.src=t?"leleka2.svg":"leleka1.svg",t=!t},500)}(t)}(),d+=1e-5*q,c+=.01*b,y.textContent=`Score: ${Math.floor(c)} | Best: ${Math.floor(E)}`,function(){let e=m.getBoundingClientRect();return[...document.querySelectorAll("[data-cactus]")].map(e=>e.getBoundingClientRect()).some(t=>t.left<e.right&&t.top<e.bottom&&t.right>e.left&&t.bottom>e.top)}())return void(m.src="dino-lose.svg",w.textContent="Game Over",w.classList.remove("hide"),w.classList.add("game-over"),w.style.top="50%",w.style.left="50%",w.style.transform="translate(-50%, -50%)",w.style.fontSize="7vw",document.addEventListener("keydown",L,{once:!0}),document.addEventListener("touchstart",L,{once:!0}));a=f,window.requestAnimationFrame(p)}S(),window.addEventListener("resize",S),document.addEventListener("keydown",L,{once:!0}),document.addEventListener("touchstart",L,{once:!0});let E=0;function L(){a=null,d=1,c>E&&(E=c),c=0,h.forEach(e=>e.remove()),h.length=0,s(u[0],"--left",0),s(u[1],"--left",300),e=!1,t=0,n=0,o=0,s(m,"--bottom",0),document.removeEventListener("keydown",f),document.removeEventListener("touchstart",f),document.addEventListener("keydown",f),document.addEventListener("touchstart",f),r=800,document.querySelectorAll("[data-cactus]").forEach(e=>{e.remove()}),w.classList.add("hide"),document.removeEventListener("touchstart",L),document.removeEventListener("keydown",L),window.requestAnimationFrame(p)}function S(){let e;e=window.innerWidth/window.innerHeight<2.5?window.innerWidth/100:window.innerHeight/40,g.style.width=`${100*e}px`,g.style.height=`${40*e}px`}
//# sourceMappingURL=index.528645c2.js.map