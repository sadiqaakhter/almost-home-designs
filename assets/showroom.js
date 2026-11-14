(()=>{
const viewport=document.querySelector('.rail-viewport'),track=document.querySelector('.rail-track');
if(!viewport||!track)return;
const reduced=matchMedia('(prefers-reduced-motion: reduce)'),fine=matchMedia('(pointer:fine)');
const toggle=document.querySelector('#motionToggle');let paused=reduced.matches,inside=false,raf=0,start=0,last=0;
function controls(){document.querySelector('#railPrev').disabled=viewport.scrollLeft<2;document.querySelector('#railNext').disabled=viewport.scrollLeft>=viewport.scrollWidth-viewport.clientWidth-2;}
function move(dir){viewport.scrollBy({left:dir*viewport.clientWidth*.7,behavior:reduced.matches?'instant':'smooth'});}
document.querySelector('#railPrev').addEventListener('click',()=>move(-1));document.querySelector('#railNext').addEventListener('click',()=>move(1));viewport.addEventListener('scroll',controls,{passive:true});window.addEventListener('resize',controls);controls();
viewport.addEventListener('keydown',e=>{if(e.target!==viewport)return;if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();move(e.key==='ArrowRight'?1:-1);}});
function paint(t){
  raf=0;
  if(paused||!inside||document.hidden||reduced.matches)return;
  if(!start)start=t;
  if(t-last>16){
    const elapsed=t-start;
    track.style.setProperty('--drift',`${Math.sin(elapsed/3000)*30}px`);
    document.querySelectorAll('.hanging-item').forEach((item,i)=>{
      const phase=i*0.7;
      const sway=Math.sin(elapsed/1300+phase)*4.2;
      const lift=Math.sin(elapsed/1750+phase)*8;
      const bob=Math.sin(elapsed/2100+phase*1.4)*6;
      const labelLift=Math.sin(elapsed/1750+phase)*4;
      item.style.setProperty('--tilt',`${sway}deg`);
      item.style.setProperty('--lift',`${lift}px`);
      item.style.setProperty('--item-bob',`${bob}px`);
      item.style.setProperty('--label-lift',`${labelLift}px`);
    });
    last=t;
  }
  raf=requestAnimationFrame(paint);
}
function sync(){document.documentElement.dataset.motion=paused||reduced.matches?'paused':'running';document.dispatchEvent(new Event('motionchange'));toggle.textContent=paused?'Resume motion':'Pause motion';toggle.setAttribute('aria-pressed',String(paused));if(paused||reduced.matches){cancelAnimationFrame(raf);raf=0;track.style.setProperty('--drift','0px');}else if(!raf&&inside)raf=requestAnimationFrame(paint);}
toggle.addEventListener('click',()=>{paused=!paused;sync()});reduced.addEventListener('change',()=>{paused=reduced.matches;sync()});
new IntersectionObserver(([entry])=>{inside=entry.isIntersecting;if(inside)sync();else{cancelAnimationFrame(raf);raf=0;}},{threshold:.1}).observe(viewport);
document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0;}else sync();});
viewport.addEventListener('pointermove',e=>{if(paused||reduced.matches||!fine.matches)return;const r=viewport.getBoundingClientRect();track.style.setProperty('--drift',`${((e.clientX-r.left)/r.width-.5)*-18}px`);});
sync();
const range=document.querySelector('#baRange');if(range){const update=()=>document.querySelector('.ba').style.setProperty('--comparison',`${100-range.value}%`);range.addEventListener('input',update);update();}
})();
