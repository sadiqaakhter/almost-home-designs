(()=>{
const reduced=matchMedia('(prefers-reduced-motion: reduce)'),root=document.documentElement,button=document.querySelector('#productMotionToggle');
let userPaused=reduced.matches;const active=new Set();
const allowed=()=>!reduced.matches&&root.dataset.motion!=='paused';
function cancel(){if(!allowed()){for(const a of active)a.cancel();active.clear();}}
function sync(){if(button){root.dataset.motion=userPaused||reduced.matches?'paused':'running';button.textContent=root.dataset.motion==='paused'?'Resume motion':'Pause motion';button.setAttribute('aria-pressed',String(root.dataset.motion==='paused'));}cancel();}
button?.addEventListener('click',()=>{userPaused=!userPaused;sync()});reduced.addEventListener('change',sync);document.addEventListener('motionchange',cancel);sync();
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{for(const e of entries){if(!e.isIntersecting)continue;observer.unobserve(e.target);if(!allowed())continue;const animation=e.target.animate([{opacity:.35,transform:'translateY(20px)'},{opacity:1,transform:'translateY(0)'}],{duration:650,easing:'cubic-bezier(.2,.6,.3,1)'});active.add(animation);animation.onfinish=()=>active.delete(animation);}},{threshold:.12});document.querySelectorAll('.real-products .product,.real-collection>a,.practice-intro,.story-copy').forEach(el=>observer.observe(el));}
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{b.closest('[data-filter-group]').querySelectorAll('[data-filter]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));}));
})();
