(() => {
'use strict';
const T=window.THREE;
let renderer=null,active=null;
const mat=(c,r=.8,m=0)=>new T.MeshStandardMaterial({color:c,roughness:r,metalness:m});
const box=(g,x,y,z,w,h,d,m)=>{const o=new T.Mesh(new T.BoxGeometry(w,h,d),m);o.position.set(x,y,z);g.add(o);return o};
const sphere=(g,x,y,z,r,m)=>{const o=new T.Mesh(new T.SphereGeometry(r,16,12),m);o.position.set(x,y,z);g.add(o);return o};
function signTexture(title,sub,bg,accent){
 const c=document.createElement('canvas');c.width=512;c.height=256;const x=c.getContext('2d');
 x.fillStyle=bg;x.fillRect(0,0,512,256);x.fillStyle=accent;x.fillRect(0,0,512,16);
 x.textAlign='center';x.fillStyle='#f5ead6';x.font='bold 48px sans-serif';x.fillText(title,256,120);
 x.font='24px sans-serif';x.fillStyle='#ded0b9';x.fillText(sub,256,165);
 const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace||t.colorSpace;return t;
}
function npc(scene,name){
 const g=new T.Group();g.position.set(.1,0,-3.05);scene.add(g);
 const colors=['#b77e70','#718b91','#9480a2','#80936e','#b89a64'];
 const n=String(name||'').split('').reduce((a,c)=>a+c.charCodeAt(0),0)%5;
 const skin=mat('#e3b995'),hair=mat('#2b2529'),coat=mat(colors[n]),dark=mat('#33313a');
 box(g,0,.93,0,.72,.95,.38,coat);sphere(g,0,1.67,0,.29,skin);sphere(g,0,1.83,-.04,.3,hair);
 box(g,-.12,1.68,.25,.04,.04,.02,dark);box(g,.12,1.68,.25,.04,.04,.02,dark);
 box(g,-.42,.95,0,.18,.65,.2,coat);box(g,.42,.95,0,.18,.65,.2,coat);
 box(g,-.42,.52,0,.22,.1,.24,dark);box(g,.42,.52,0,.22,.1,.24,dark);
 return g;
}
function makeTarget(scene,action,label,x,y,z,w,h,d){
 const o=box(scene,x,y,z,w,h,d,new T.MeshBasicMaterial({transparent:true,opacity:.001,depthWrite:false}));
 o.userData={action,label};return o;
}
function build(scene,targets,cfg){
 const wood=mat('#986b49'),darkWood=mat('#574034'),wall=mat('#c9baa0'),cream=mat('#e8d9bd'),
 metal=mat('#81868a',.35,.62),teal=mat('#57796d'),glass=mat('#5d7e8b',.25,.2),screen=mat('#426960');
 // Room shell
 box(scene,0,-.13,-.5,10,.25,12,mat('#80634f'));
 box(scene,0,2.25,-6,10,4.5,.22,wall);box(scene,-5,2.25,-.5,.22,4.5,11,wall);box(scene,5,2.25,-.5,.22,4.5,11,wall);
 box(scene,0,4.5,-.5,10,.2,11,mat('#4d4945'));box(scene,0,.15,-5.82,9.7,.3,.08,darkWood);
 // Front window, skyline, and shop sign
 box(scene,-2.5,2.72,-5.82,2.9,1.85,.12,darkWood);box(scene,-2.5,2.72,-5.73,2.7,1.62,.05,glass);
 box(scene,-2.5,2.72,-5.66,.06,1.7,.1,cream);box(scene,-2.5,2.72,-5.66,2.8,.06,.1,cream);
 for(let i=0;i<7;i++){const x=-3.7+i*.4,h=.4+(i%3)*.25;box(scene,x,2.1+h/2,-5.62,.3,h,.04,mat('#344656'))}
 box(scene,0,3.75,-5.72,3.5,.75,.12,darkWood);
 const sign=new T.Mesh(new T.PlaneGeometry(3.3,.62),new T.MeshBasicMaterial({map:signTexture('黒猫修理','KURONEKO ELECTRONICS','#292a39','#df969b'),side:T.DoubleSide}));
 sign.position.set(0,3.75,-5.63);scene.add(sign);
 // Service counter
 box(scene,0,.72,-2.4,3.65,.28,1.08,wood);box(scene,0,.43,-2.4,3.42,.56,.92,darkWood);box(scene,0,.99,-2.4,3.72,.12,1.14,wood);
 sphere(scene,.95,1.14,-2.04,.06,mat('#d4bd82'));
 // ESD workbench and drawers
 box(scene,-3.15,.92,-1.15,2.55,.15,1.55,wood);
 for(const x of [-4.12,-2.18])for(const z of [-1.7,-.6])box(scene,x,.44,z,.13,.9,.13,darkWood);
 box(scene,-3.15,1.02,-1.15,2.32,.035,1.33,teal);box(scene,-3.55,1.09,-1.2,.7,.1,.62,mat('#a9b2ab'));
 box(scene,-2.7,1.09,-1.18,.25,.1,.45,mat('#303741'));box(scene,-3.15,.28,-.62,2.45,.42,.82,darkWood);
 for(let i=0;i<3;i++)box(scene,-3.15,.16+i*.14,-.2,2.1,.035,.06,mat('#c58a55'));
 box(scene,-4.1,1.46,-1.3,.08,.72,.08,metal);box(scene,-3.94,1.77,-1.3,.4,.17,.35,mat('#d6a96e'));
 const lamp=new T.PointLight('#ffe0ad',1.2,4);lamp.position.set(-3.9,1.8,-1.3);scene.add(lamp);
 // PC workstation with CRT
 box(scene,3,.88,-1.2,2.25,.14,1.26,wood);
 for(const x of [2.15,3.9])for(const z of [-1.65,-.72])box(scene,x,.42,z,.12,.85,.12,darkWood);
 box(scene,3.05,1.42,-1.45,.82,.82,.6,mat('#c4c0b4'));box(scene,3.05,1.45,-1.13,.69,.56,.025,screen);
 box(scene,3.05,1.45,-1.105,.6,.43,.01,mat('#4c7a70'));box(scene,3,1.015,-.99,.78,.045,.24,cream);
 // Parts shelf and labelled bins
 box(scene,3.62,2.2,-5.58,2.05,2.3,.24,darkWood);
 for(const y of [1.45,2.15,2.85])box(scene,3.62,y,-5.32,1.95,.08,.54,wood);
 const colors=['#ce9368','#88aaa0','#d5bc78','#7c8ba5','#b5a38c','#bd8186'];
 for(let i=0;i<12;i++){const x=2.82+(i%4)*.5,y=1.67+Math.floor(i/4)*.7;box(scene,x,y,-5.34,.35,.35,.32,mat(colors[i%6]));box(scene,x,y,-5.15,.17,.08,.015,cream)}
 // Entrance door and retro posters
 box(scene,4.82,1.48,-4.25,.12,2.85,1.5,darkWood);box(scene,4.73,1.48,-4.25,.08,2.62,1.28,mat('#6d8984'));
 box(scene,4.67,1.52,-4.25,.08,1.8,.9,glass);sphere(scene,4.62,1.22,-3.78,.055,mat('#d8b16e'));
 for(const p of [{x:-4.66,title:'RETRO GAME',sub:'REPAIR / RESTORE',bg:'#3c4655',ac:'#e2bd7b',rot:Math.PI/2},{x:4.66,title:'MUSIC 2005',sub:'PLAY IT AGAIN',bg:'#354641',ac:'#8dc0a4',rot:-Math.PI/2}]){
  const o=new T.Mesh(new T.PlaneGeometry(1.5,1),new T.MeshBasicMaterial({map:signTexture(p.title,p.sub,p.bg,p.ac),side:T.DoubleSide}));
  o.position.set(p.x,2.8,-2.4);o.rotation.y=p.rot;scene.add(o);
 }
 for(const x of [-2.4,0,2.5]){const light=new T.PointLight('#ffe1b5',.65,6);light.position.set(x,3.82,-2.1);scene.add(light)}
 const customer=cfg.hasCustomer?npc(scene,cfg.customerName):null;
 targets.push(
  makeTarget(scene,'customer','Kundschaft begrüßen',0,1.45,-2.85,2.2,1.9,1.45),
  makeTarget(scene,'bench','Reparaturwerkbank',-3.15,1.1,-1.15,2.7,1.8,1.9),
  makeTarget(scene,'computer','Internet-PC',3.05,1.5,-1.45,1.7,1.7,1.2),
  makeTarget(scene,'jobs','Auftragstafel / Teilelager',3.62,2.05,-5.1,2.3,2.5,1),
  makeTarget(scene,'exit','Laden verlassen',4.52,1.45,-4.25,.95,2.2,1.7)
 );
 scene.add(new T.HemisphereLight('#f5e7d2','#34343b',1.7));
 const key=new T.DirectionalLight('#ffe2c0',1.5);key.position.set(-2,5,3);scene.add(key);
 const glow=new T.PointLight('#8daec1',.8,8);glow.position.set(-2.7,2.8,-5);scene.add(glow);
 return customer;
}
function clearScene(scene){scene.traverse(o=>{if(o.geometry)o.geometry.dispose();if(o.material){const a=Array.isArray(o.material)?o.material:[o.material];a.forEach(m=>{if(m.map)m.map.dispose();m.dispose()})}})}
function emit(action){window.dispatchEvent(new CustomEvent('kuroneko-shop-interact',{detail:{action}}))}
function hide(){
 if(!active)return;cancelAnimationFrame(active.raf);
 window.removeEventListener('keydown',active.down);window.removeEventListener('keyup',active.up);window.removeEventListener('mousemove',active.move);window.removeEventListener('resize',active.resize);
 document.removeEventListener('pointerlockchange',active.lock);const c=active.canvas;
 c.removeEventListener('click',active.click);c.removeEventListener('pointerdown',active.pdown);c.removeEventListener('pointermove',active.pmove);c.removeEventListener('pointerup',active.pup);c.removeEventListener('pointercancel',active.pup);
 if(document.pointerLockElement===c&&document.exitPointerLock)document.exitPointerLock();
 clearScene(active.scene);if(renderer&&renderer.renderLists&&renderer.renderLists.dispose)renderer.renderLists.dispose();active=null;
}
function mount(host,cfg={}){
 if(!host||!T||!T.WebGLRenderer)return false;hide();
 try{
  if(!renderer){renderer=new T.WebGLRenderer({antialias:true,alpha:false,powerPreference:'high-performance'});renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.5));renderer.outputColorSpace=T.SRGBColorSpace||renderer.outputColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.08}
  const w=Math.max(1,host.clientWidth||960),h=Math.max(1,host.clientHeight||440);renderer.setSize(w,h,false);renderer.setClearColor('#262c35',1);
  host.querySelectorAll('canvas').forEach(c=>c.remove());host.appendChild(renderer.domElement);
  const canvas=renderer.domElement;canvas.id='shop-world-canvas';canvas.tabIndex=0;canvas.setAttribute('aria-label','3D-Laden: WASD bewegen, Maus umsehen, E interagieren');
  const scene=new T.Scene();scene.background=new T.Color('#262c35');scene.fog=new T.Fog('#262c35',11,23);
  const camera=new T.PerspectiveCamera(68,w/h,.08,48);camera.position.set(0,1.62,4.45);camera.rotation.order='YXZ';
  const targets=[],customer=build(scene,targets,cfg),ray=new T.Raycaster(),keys=new Set();
  let yaw=0,pitch=0,last=performance.now(),raf=0,found=null,touch=null;const player={x:0,z:4.45};
  const prompt=host.querySelector('.shop-world-prompt'),cross=host.querySelector('.shop-crosshair');
  const setFound=v=>{found=v;if(prompt)prompt.classList.toggle('active',!!v);if(prompt){const p=prompt.querySelector('strong');if(p)p.textContent=v?v.label:''}if(cross)cross.classList.toggle('hot',!!v)};
  const aim=()=>{ray.setFromCamera(new T.Vector2(0,0),camera);const h=ray.intersectObjects(targets,false).find(o=>o.distance<5);setFound(h?h.object.userData:null)};
  const interact=()=>{if(found)emit(found.action)};
  const down=e=>{if(['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName))return;const k=e.key.toLowerCase();if('wasd'.includes(k)||k.startsWith('arrow'))e.preventDefault();if(k==='e'||k==='enter'){e.preventDefault();interact();return}keys.add(k)};
  const up=e=>keys.delete(e.key.toLowerCase());
  const move=e=>{if(document.pointerLockElement===canvas){yaw-=e.movementX*.0021;pitch=Math.max(-.72,Math.min(.72,pitch-e.movementY*.0018))}};
  const pdown=e=>{canvas.focus();if(e.pointerType==='touch')touch={x:e.clientX,y:e.clientY}};
  const pmove=e=>{if(e.pointerType==='touch'&&touch){yaw-=(e.clientX-touch.x)*.006;pitch=Math.max(-.72,Math.min(.72,pitch-(e.clientY-touch.y)*.005));touch={x:e.clientX,y:e.clientY}}};
  const pup=()=>touch=null;
  const click=()=>{if(found){interact();return}if(canvas.requestPointerLock&&!/Android|iPhone|iPad/i.test(navigator.userAgent)){try{canvas.requestPointerLock()}catch(_){}}};
  const lock=()=>{};
  const resize=()=>{if(!active||active.host!==host)return;const a=Math.max(1,host.clientWidth),b=Math.max(1,host.clientHeight);camera.aspect=a/b;camera.updateProjectionMatrix();renderer.setSize(a,b,false)};
  canvas.addEventListener('click',click);canvas.addEventListener('pointerdown',pdown);canvas.addEventListener('pointermove',pmove);canvas.addEventListener('pointerup',pup);canvas.addEventListener('pointercancel',pup);
  window.addEventListener('keydown',down);window.addEventListener('keyup',up);window.addEventListener('mousemove',move);window.addEventListener('resize',resize);document.addEventListener('pointerlockchange',lock);
  host.querySelectorAll('[data-move]').forEach(b=>{const k=b.dataset.move;b.addEventListener('pointerdown',e=>{e.preventDefault();keys.add(k)});['pointerup','pointerleave','pointercancel'].forEach(n=>b.addEventListener(n,()=>keys.delete(k)))});
  active={host,scene,canvas,raf:0,down,up,move,resize,lock,click,pdown,pmove,pup};
  const tick=now=>{
   if(!active||active.host!==host)return;const dt=Math.min(.05,(now-last)/1000||0);last=now;
   const f=(keys.has('w')||keys.has('arrowup')?1:0)-(keys.has('s')||keys.has('arrowdown')?1:0),s=(keys.has('d')||keys.has('arrowright')?1:0)-(keys.has('a')||keys.has('arrowleft')?1:0);
   const v=2.65*dt,fx=-Math.sin(yaw),fz=-Math.cos(yaw),rx=Math.cos(yaw),rz=-Math.sin(yaw);
   player.x=Math.max(-4.3,Math.min(4.3,player.x+(fx*f+rx*s)*v));player.z=Math.max(-5.25,Math.min(4.72,player.z+(fz*f+rz*s)*v));
   camera.position.set(player.x,1.62,player.z);camera.rotation.set(pitch,yaw,0,'YXZ');if(customer)customer.position.y=Math.sin(now*.0018)*.015;
   aim();renderer.render(scene,camera);active.raf=requestAnimationFrame(tick);
  };
  active.raf=requestAnimationFrame(tick);aim();return true;
 }catch(e){console.error('Shop-3D konnte nicht gestartet werden:',e);host.insertAdjacentHTML('afterbegin','<div class="shop-world-fallback"><b>Kuroneko Repair</b><p>3D-Ansicht nicht verfügbar. Nutze die Schnellaktionen unter der Szene.</p></div>');return false}
}
window.KuronekoShop3D={mount,hide,interact:emit,destroy:()=>{hide();if(renderer){renderer.dispose();renderer=null}}};
})();