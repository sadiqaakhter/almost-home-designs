(()=>{
const viewport=document.querySelector('.rail-viewport');
const track=document.querySelector('.rail-track');
if(!viewport||!track)return;

const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const toggle=document.querySelector('#motionToggle');
let paused=reduced.matches;
let raf=0;
let last=0;
let x=0;
let speed=0.045;

const original=[...track.children].map(n=>n.cloneNode(true));
original.forEach(n=>track.appendChild(n.cloneNode(true)));

function loopWidth(){
  const half=Math.floor(track.children.length/2);
  if(!half)return 0;
  const first=track.children[0].getBoundingClientRect();
  const secondSetFirst=track.children[half].getBoundingClientRect();
  return secondSetFirst.left-first.left;
}

function animate(t){
  raf=0;
  if(paused||document.hidden||reduced.matches)return;
  if(!last)last=t;
  const dt=Math.min(40,t-last);
  last=t;
  x-=speed*dt;
  const w=loopWidth();
  if(w>0 && Math.abs(x)>=w) x+=w;
  track.style.transform=`translate3d(${x}px,0,0)`;
  raf=requestAnimationFrame(animate);
}

function sync(){
  if(toggle){
    toggle.textContent=paused?'Resume motion':'Pause motion';
    toggle.setAttribute('aria-pressed',String(paused));
  }
  if(paused||reduced.matches){
    cancelAnimationFrame(raf);
    raf=0;
  }else if(!raf){
    last=0;
    raf=requestAnimationFrame(animate);
  }
}

toggle?.addEventListener('click',()=>{paused=!paused;sync()});
reduced.addEventListener('change',()=>{paused=reduced.matches;sync()});
document.addEventListener('visibilitychange',sync);

viewport.addEventListener('mouseenter',()=>{speed=0.02});
viewport.addEventListener('mouseleave',()=>{speed=0.045});

document.querySelector('#railPrev')?.addEventListener('click',()=>{x+=180;track.style.transform=`translate3d(${x}px,0,0)`});
document.querySelector('#railNext')?.addEventListener('click',()=>{x-=180;track.style.transform=`translate3d(${x}px,0,0)`});

const range=document.querySelector('#baRange');
if(range){
  const update=()=>document.querySelector('.ba')?.style.setProperty('--comparison',`${100-range.value}%`);
  range.addEventListener('input',update);
  update();
}
sync();
})();