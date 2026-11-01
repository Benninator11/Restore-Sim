/* Kuroneko Repair — warm Y2K isometric repair shop.
   All room geometry and textures are original procedural assets. */
(() => {
'use strict';
const T=window.THREE;
let renderer=null,active=null;
const mat=(c,r=.78,m=0)=>new T.MeshStandardMaterial({color:c,roughness:r,metalness:m});
const box=(g,x,y,z,w,h,d,m)=>{
 const o=new T.Mesh(new T.BoxGeometry(w,h,d),m);o.position.set(x,y,z);
 o.castShadow=true;o.receiveShadow=true;g.add(o);return o;
};
const sphere=(g,x,y,z,r,m,sx=1,sy=1,sz=1)=>{
 const o=new T.Mesh(new T.SphereGeometry(r,18,14),m);o.position.set(x,y,z);o.scale.set(sx,sy,sz);
 o.castShadow=true;o.receiveShadow=true;g.add(o);return o;
};
const cyl=(g,x,y,z,r,h,m,n=18)=>{
 const o=new T.Mesh(new T.CylinderGeometry(r,r,h,n),m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;g.add(o);return o;
};
function woodTexture(){
 const c=document.createElement('canvas');c.width=512;c.height=512;const x=c.getContext('2d');
 x.fillStyle='#986a45';x.fillRect(0,0,512,512);
 for(let y=0;y<512;y+=64){
  x.fillStyle=y%128?'#a77750':'#8d5e3d';x.fillRect(0,y,512,60);
  x.strokeStyle='#563b2b';x.lineWidth=3;x.strokeRect(0,y,512,60);
  for(let k=0;k<5;k++){x.strokeStyle='#d09a69';x.lineWidth=1.2;x.beginPath();x.moveTo(0,y+11+k*10);x.bezierCurveTo(130,y+3+k*10,280,y+22+k*7,512,y+10+k*10);x.stroke()}
  for(let k=0;k<7;k++){const px=20+k*75;x.fillStyle='#5a3c2c';x.beginPath();x.ellipse(px,y+30,2.8,2,0,0,Math.PI*2);x.fill()}
 }
 const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace||t.colorSpace;t.wrapS=t.wrapT=T.RepeatWrapping;t.repeat.set(2,3);return t;
}
function plasterTexture(){
 const c=document.createElement('canvas');c.width=256;c.height=256;const x=c.getContext('2d');
 x.fillStyle='#d5c4a6';x.fillRect(0,0,256,256);
 for(let i=0;i<1400;i++){const px=Math.random()*256,py=Math.random()*256,a=Math.random()*.08;x.fillStyle='rgba(88,65,44,'+a+')';x.fillRect(px,py,1.5,1.5)}
 const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace||t.colorSpace;return t;
}
function labelTexture(title,sub,bg,accent){
 const c=document.createElement('canvas');c.width=512;c.height=180;const x=c.getContext('2d');
 x.fillStyle=bg;x.fillRect(0,0,512,180);x.fillStyle=accent;x.fillRect(0,0,512,13);
 x.textAlign='center';x.fillStyle='#f6ead5';x.font='bold 42px sans-serif';x.fillText(title,256,92);
 x.font='20px sans-serif';x.fillStyle='#d8c9b2';x.fillText(sub,256,130);
 const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace||t.colorSpace;return t;
}
function plane(g,x,y,z,w,h,texture,ry=0){
 const m=new T.Mesh(new T.PlaneGeometry(w,h),new T.MeshBasicMaterial({map:texture,side:T.DoubleSide}));
 m.position.set(x,y,z);m.rotation.y=ry;g.add(m);return m;
}
function npc(scene,name){
 const g=new T.Group();g.position.set(.25,0,-3.45);scene.add(g);
 const colors=['#bd574d','#4e8c92','#96769c','#678d68','#d39b55'];
 const k=String(name||'').split('').reduce((a,c)=>a+c.charCodeAt(0),0)%colors.length;
 const skin=mat('#efc49e'),hair=mat(['#27242c','#443027','#4c3444'][k%3]),coat=mat(colors[k]),dark=mat('#34313a'),shirt=mat('#efe2d2');
 // Backpack and coat
 box(g,-.34,.93,-.13,.32,.67,.24,mat('#8e5242'));
 box(g,0,.96,0,.68,.95,.37,coat);
 box(g,0,.88,.2,.3,.7,.03,shirt);
 // Head, hair and face
 sphere(g,0,1.7,.02,.31,skin,1,.98,.9);
 sphere(g,0,1.89,-.035,.32,hair,1,.53,1);
 sphere(g,-.2,1.76,.18,.13,hair,1,.8,.8);sphere(g,.19,1.77,.18,.14,hair,1,.8,.8);
 // fringe strands
 for(let i=0;i<5;i++){const xx=-.2+i*.1;const fringe=box(g,xx,1.77,.245,.07,.24,.045,hair);fringe.rotation.z=(i-2)*.11}
 // Eyes and friendly face
 sphere(g,-.105,1.69,.292,.047,mat('#f8f5e9'));sphere(g,.105,1.69,.292,.047,mat('#f8f5e9'));
 sphere(g,-.105,1.685,.33,.025,dark);sphere(g,.105,1.685,.33,.025,dark);
 sphere(g,-.17,1.62,.27,.042,mat('#d98d83'),1,.48,.3);sphere(g,.17,1.62,.27,.042,mat('#d98d83'),1,.48,.3);
 box(g,0,1.55,.29,.07,.018,.015,mat('#a85d59'));
 // Sleeves, hands and shoes
 const arm1=box(g,-.43,1.05,.03,.18,.65,.2,coat);arm1.rotation.z=-.32;
 const arm2=box(g,.43,1.05,.04,.18,.65,.2,coat);arm2.rotation.z=.38;
 sphere(g,-.52,.73,.17,.12,skin);sphere(g,.53,.77,.17,.12,skin);
 box(g,-.19,.35,0,.2,.22,.24,dark);box(g,.19,.35,0,.2,.22,.24,dark);
 g.userData.npc=true;return g;
}
function target(scene,action,label,x,y,z,w,h,d){
 const o=box(scene,x,y,z,w,h,d,new T.MeshBasicMaterial({transparent:true,opacity:.001,depthWrite:false}));
 o.userData={action,label};return o;
}
function build(scene,targets,cfg){
 const woodTex=woodTexture(),plaster=plasterTexture();
 const wood=new T.MeshStandardMaterial({map:woodTex,roughness:.8});
 const wall=new T.MeshStandardMaterial({map:plaster,roughness:.95});
 const darkWood=mat('#59402f'),trim=mat('#c39768'),cream=mat('#e5d5b8'),
 brass=mat('#b99052',.35,.65),metal=mat('#848b91',.32,.68);
 const teal=mat('#2d778d',.88),matGrid=mat('#a8d7d6',.8);
 const screen=mat('#172c36',.22,.12),glow=mat('#81b9a6',.25);
 // Warm wooden room and visible side walls; the front stays open to the camera.
 box(scene,0,-.13,-.5,10,.25,12,new T.MeshStandardMaterial({map:woodTex,roughness:.92}));
 box(scene,0,2.3,-6,10,4.6,.22,wall);
 box(scene,-5,2.3,-.5,.22,4.6,11,wall);
 box(scene,5,2.3,-.5,.22,4.6,11,wall);
 box(scene,0,4.5,-.5,10,.2,11,mat('#55463a'));
 // Wall baseboards and exposed ceiling beams
 box(scene,0,.16,-5.83,9.7,.3,.08,darkWood);
 for(const x of [-4.6,-2.3,0,2.3,4.6])box(scene,x,4.35,-.45,.1,.18,10.7,darkWood);
 // Large street-facing window, visually dominant behind the customer.
 box(scene,0,2.65,-5.82,6.65,2.25,.14,darkWood);
 box(scene,0,2.65,-5.72,6.35,1.98,.045,mat('#a3c5c3',.25,.1));
 // warm sky panes and distant buildings
 const sky=mat('#edc9a2');box(scene,0,2.65,-5.685,6.22,1.84,.018,sky);
 const cityColors=['#6b91a0','#b37c64','#788c7c','#a56e55','#71849a'];
 for(let i=0;i<11;i++){
  const x=-3+i*.58,h=.48+(i%4)*.25;
  box(scene,x,1.95+h/2,-5.65,.48,h,.035,mat(cityColors[i%cityColors.length]));
  for(let q=0;q<3;q++)box(scene,x-.12+(q%2)*.2,2.02+Math.floor(q/2)*.2,-5.62,.055,.075,.018,mat((i+q)%2?'#f7d99a':'#9bc3bf'));
 }
 // window mullions, awning and side curtains
 for(const x of [-2.1,0,2.1])box(scene,x,2.65,-5.59,.07,2.05,.08,cream);
 box(scene,0,2.65,-5.59,.06,1.98,.08,cream);
 box(scene,0,3.78,-5.54,6.9,.24,.24,mat('#a9573e'));
 for(let i=0;i<15;i++){const x=-3.25+i*.465;box(scene,x,3.78,-5.39,.19,.2,.08,mat(i%2?'#c67a53':'#a9593e'))}
 // Shop name plate
 box(scene,0,4.08,-5.68,3.15,.5,.12,darkWood);
 plane(scene,0,4.08,-5.60,3.02,.42,labelTexture('黒猫修理','KURONEKO ELECTRONICS','#2b2e3b','#e7a27e'));
 // Counter with bell, ticket book and jars
 box(scene,0,.76,-2.48,3.7,.25,1.05,wood);
 box(scene,0,.44,-2.48,3.48,.6,.92,darkWood);
 box(scene,0,.98,-2.48,3.78,.12,1.12,wood);
 cyl(scene,.95,1.09,-2.02,.105,.08,brass);
 sphere(scene,.95,1.16,-2.02,.06,mat('#e9d7a9'));
 box(scene,-1.18,1.08,-2.03,.42,.06,.28,mat('#e8dcc4'));
 box(scene,-1.18,1.12,-2.03,.3,.02,.19,mat('#c86f5e'));
 // Customer NPC behind counter
 const customer=cfg.hasCustomer?npc(scene,cfg.customerName):null;
 // Main front workbench, with blue cutting/ESD mat and visible repair tools.
 const bench=new T.Group();bench.position.set(0,0,2.0);scene.add(bench);
 box(bench,0,.9,0,3.55,.16,2.15,wood);
 for(const x of [-1.35,1.35])for(const z of [-.78,.78])box(bench,x,.44,z,.14,.88,.14,darkWood);
 box(bench,0,.99,0,3.28,.035,1.9,teal);
 // cutting-mat grid
 for(let i=-7;i<=7;i++)box(bench,i*.21,1.012,0,.009,.008,1.82,matGrid);
 for(let i=-4;i<=4;i++)box(bench,0,1.013,i*.21,3.12,.008,.009,matGrid);
 // ruler marks and mat label
 box(bench,0,1.018,-.83,1.3,.012,.04,mat('#e4d6ad'));
 // lamp, magnifier, soldering station, iron and tools
 const lamp=new T.Group();lamp.position.set(-1.42,1.03,-.2);bench.add(lamp);
 cyl(lamp,0,.24,0,.055,.48,metal,12);
 const arm=box(lamp,.22,.48,0,.48,.055,.055,metal);arm.rotation.z=-.32;
 cyl(lamp,.44,.6,0,.21,.12,mat('#d7b77a'),20);
 const light=new T.PointLight('#ffe1b8',1.05,3.2);light.position.set(.44,.62,.02);lamp.add(light);
 // small LED magnifier
 const magnifier=cyl(bench,1.23,1.18,-.48,.16,.055,metal,32);magnifier.rotation.x=Math.PI/2;
 sphere(bench,1.23,1.19,-.48,.11,mat('#9cc6cc',.12,.05));
 // solder station and coil
 box(bench,1.34,1.12,.48,.56,.23,.42,mat('#3c4348'));
 box(bench,1.34,1.25,.48,.38,.025,.23,glow);
 cyl(bench,.95,1.1,.64,.13,.17,brass,20);
 box(bench,.77,1.16,.64,.26,.06,.08,darkWood);
 // tweezer, screwdriver, brush and wire spool
 const screwdriver=box(bench,-.94,1.1,.58,.52,.055,.06,mat('#c0b6a4'));screwdriver.rotation.z=-.18;
 box(bench,-.78,1.14,.58,.18,.075,.075,mat('#b16a50'));
 const tweezer=box(bench,-.44,1.1,.69,.62,.035,.035,metal);tweezer.rotation.z=.16;
 const brush=box(bench,.38,1.08,.73,.4,.055,.055,mat('#c99a67'));brush.rotation.z=.22;
 for(let i=0;i<6;i++)box(bench,.38+i*.035,1.1,.73,.018,.085,.07,mat('#ddd0b8'));
 cyl(bench,-1.25,1.12,.7,.13,.12,mat('#d4d0bc'),24);
 // parts tray and little electronics boxes
 box(bench,-1.27,1.08,-.48,.54,.07,.38,mat('#a8a7a0'));
 for(let i=0;i<4;i++)box(bench,-1.43+(i%2)*.26,1.13,-.57+Math.floor(i/2)*.18,.16,.045,.13,mat(['#bd6a50','#d8b86f','#7e9b91','#7183a0'][i]));
 box(bench,.0,1.05,-.72,.64,.035,.15,mat('#ddd0ac'));
 // Computer desk on the left with beige CRT, keyboard and tower.
 const pc=new T.Group();pc.position.set(-3.05,0,.15);scene.add(pc);
 box(pc,0,.87,0,2.2,.15,1.22,wood);
 for(const x of [-.82,.82])for(const z of [-.43,.43])box(pc,x,.42,z,.12,.82,.12,darkWood);
 box(pc,0,1.42,-.18,.98,.86,.65,mat('#c8c4b9'));
 box(pc,0,1.43,.15,.8,.59,.025,screen);
 box(pc,0,1.43,.17,.69,.45,.012,glow);
 box(pc,0,.99,-.18,.18,.07,.24,metal);
 box(pc,0,1.015,.36,1,.04,.25,cream);
 for(let i=0;i<12;i++)for(let q=0;q<3;q++)box(pc,-.42+i*.076,1.045,.25+q*.07,.055,.014,.035,metal);
 // CRT tower and a few visible status lamps
 box(pc,.82,1.16,-.02,.42,.65,.6,mat('#b7b2a7'));
 box(pc,.82,1.2,.29,.28,.42,.018,mat('#353b41'));
 sphere(pc,.82,1.36,.315,.026,mat('#8ed0a5'));
 // Second small CRT/television at right edge of room.
 const tv=new T.Group();tv.position.set(3.45,0,-.95);scene.add(tv);
 box(tv,0,.66,0,1.32,.14,.8,wood);
 box(tv,0,1.24,-.08,1.0,.7,.62,mat('#b7aa95'));
 box(tv,0,1.24,.24,.82,.5,.02,screen);
 box(tv,0,1.24,.26,.72,.4,.01,mat('#668c87'));
 cyl(tv,.4,.82,.23,.035,.04,brass,12);
 // Right rear parts shelves and colourful component bins.
 const shelf=new T.Group();shelf.position.set(3.58,0,-5.38);scene.add(shelf);
 box(shelf,0,2.15,0,2.15,2.25,.25,darkWood);
 for(const y of [1.4,2.12,2.84])box(shelf,0,y,.25,2.02,.08,.5,wood);
 const colors=['#ce9368','#88aaa0','#d5bc78','#7c8ba5','#b5a38c','#bd8186'];
 for(let i=0;i<12;i++){
  const x=-.75+(i%4)*.48,y=1.67+Math.floor(i/4)*.7;
  box(shelf,x,y,.05,.34,.34,.3,mat(colors[i%6]));
  box(shelf,x,y,.22,.17,.08,.014,cream);
 }
 // Little drawers and boxes at the room edges.
 for(let i=0;i<3;i++){box(scene,-4.42,.56,-2.3+i*.75,.78,.8,.65,wood);box(scene,-4.42,.74,-2.3+i*.75,.65,.035,.02,brass)}
 box(scene,4.35,.36,-1.9,.86,.52,.75,darkWood);
 for(let i=0;i<4;i++)box(scene,4.1+(i%2)*.28,.69,-2.08+Math.floor(i/2)*.28,.22,.14,.2,mat(colors[i]));
 // Warm pendant lighting and soft window bounce
 for(const x of [-2.4,0,2.5]){
  const l=new T.PointLight('#ffe0b8',.52,7);l.position.set(x,4,-1.8);scene.add(l);
 }
 scene.add(new T.HemisphereLight('#ffe8ce','#5d4633',1.45));
 const key=new T.DirectionalLight('#ffe4c5',2.0);key.position.set(-3,8,7);key.castShadow=true;scene.add(key);
 const windowLight=new T.PointLight('#b5d6e3',.8,9);windowLight.position.set(-1.8,2.9,-5);scene.add(windowLight);
 // Purchased shop decorations
 const decor=cfg.decor||{};
 if(decor.plant){
  const pot=mat('#b66e50'),soil=mat('#3d3026'),leaves=mat('#4d8957'),leafLight=mat('#78a96c');
  box(scene,-4.22,.31,-4.72,.5,.56,.48,pot);box(scene,-4.22,.6,-4.72,.43,.07,.41,soil);
  box(scene,-4.22,.88,-4.72,.07,.58,.07,mat('#65503a'));
  sphere(scene,-4.45,1.08,-4.72,.27,leaves);sphere(scene,-4.01,1.12,-4.72,.28,leafLight);
  sphere(scene,-4.23,1.32,-4.7,.3,leaves);
 }
 if(decor.chair){
  box(scene,2.25,.82,-3.65,.72,.13,.68,mat('#9c6847'));
  box(scene,2.25,1.25,-3.98,.72,.78,.12,mat('#9c6847'));
  for(const x of [1.95,2.55])for(const z of [-3.9,-3.4])box(scene,x,.4,z,.08,.8,.08,darkWood);
 }
 if(decor.neon){
  const glowMat=new T.MeshStandardMaterial({color:'#eaa2b5',emissive:'#d94876',emissiveIntensity:1.7,roughness:.35});
  box(scene,-1.72,4.18,-5.52,.09,.16,.08,glowMat);box(scene,1.72,4.18,-5.52,.09,.16,.08,glowMat);
  box(scene,0,4.25,-5.52,3.5,.07,.08,glowMat);
  const l=new T.PointLight('#f08aaa',.85,5);l.position.set(0,4.18,-5.15);scene.add(l);
 }
 if(decor.shelf){
  const frame=mat('#59483b'),boxA=mat('#c58e62'),boxB=mat('#8ca6a1');
  box(scene,-3.72,2.1,-5.55,1.95,2.2,.22,frame);
  for(const y of [1.45,2.15,2.85])box(scene,-3.72,y,-5.31,1.84,.08,.5,wood);
  for(let i=0;i<6;i++){const x=-4.43+(i%3)*.7,y=1.7+Math.floor(i/3)*.7;box(scene,x,y,-5.28,.46,.38,.3,i%2?boxA:boxB)}
 }
 targets.push(
  target(scene,'customer','Kundschaft begrüßen',0,1.45,-2.82,2.15,2.0,1.25),
  target(scene,'bench','Reparaturwerkbank',0,1.08,2.0,3.65,1.6,2.25),
  target(scene,'computer','Internet-PC',-3.05,1.4,.15,2.3,1.55,1.4),
  target(scene,'jobs','Auftragstafel und Teilelager',3.58,2.05,-5.15,2.3,2.5,1.1),
  target(scene,'exit','Laden verlassen',4.62,1.45,-4.15,.85,2.1,1.6)
 );
 return customer;
}
function clearScene(scene){
 if(!scene)return;
 scene.traverse(o=>{if(o.geometry)o.geometry.dispose();if(o.material){const a=Array.isArray(o.material)?o.material:[o.material];a.forEach(m=>{if(m.map)m.map.dispose();m.dispose()})}});
}
function emit(action){window.dispatchEvent(new CustomEvent('kuroneko-shop-interact',{detail:{action}}))}
function hide(){
 if(!active)return;
 cancelAnimationFrame(active.raf);
 window.removeEventListener('pointermove',active.pointermove);
 window.removeEventListener('resize',active.resize);
 window.removeEventListener('keydown',active.keydown);
 const c=active.canvas;c.removeEventListener('click',active.click);
 c.removeEventListener('pointermove',active.pointermove);c.removeEventListener('pointerleave',active.pointerleave);
 clearScene(active.scene);if(renderer&&renderer.renderLists&&renderer.renderLists.dispose)renderer.renderLists.dispose();
 active=null;
}
function mount(host,cfg={}){
 if(!host||!T||!T.WebGLRenderer)return false;
 hide();
 try{
  if(!renderer){
   renderer=new T.WebGLRenderer({antialias:true,alpha:false,powerPreference:'high-performance'});
   renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.6));
   renderer.outputColorSpace=T.SRGBColorSpace||renderer.outputColorSpace;
   renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.18;
   renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;
  }
  const w=Math.max(1,host.clientWidth||960),h=Math.max(1,host.clientHeight||560),aspect=w/h;
  renderer.setSize(w,h,false);renderer.setClearColor('#40362e',1);
  host.querySelectorAll('canvas').forEach(c=>c.remove());host.appendChild(renderer.domElement);
  const canvas=renderer.domElement;canvas.id='shop-world-canvas';canvas.tabIndex=0;
  canvas.setAttribute('aria-label','Isometrische Werkstatt. Klicke auf Kundschaft, Werkbank, PC oder Teilelager.');
  const scene=new T.Scene();scene.background=new T.Color('#40372f');scene.fog=new T.Fog('#40372f',19,38);
  const spanY=13.4,spanX=spanY*aspect;
  const camera=new T.OrthographicCamera(-spanX/2,spanX/2,spanY/2,-spanY/2,.1,80);
  camera.position.set(8.8,18.4,13.2);camera.lookAt(0,.95,-.65);
  const targets=[],customer=build(scene,targets,cfg),ray=new T.Raycaster();
  let found=null,raf=0,last=performance.now();const pointer=new T.Vector2(0,0);
  const prompt=host.querySelector('.shop-world-prompt'),cross=host.querySelector('.shop-crosshair');
  const setFound=v=>{
   found=v;
   if(prompt)prompt.classList.toggle('active',!!v);
   if(prompt){const label=prompt.querySelector('strong');if(label)label.textContent=v?v.label:''}
   if(cross)cross.classList.toggle('hot',!!v);
   canvas.style.cursor=v?'pointer':'default';
  };
  const aim=e=>{
   if(e){const r=canvas.getBoundingClientRect();pointer.x=((e.clientX-r.left)/r.width)*2-1;pointer.y=-((e.clientY-r.top)/r.height)*2+1}
   ray.setFromCamera(pointer,camera);
   const hit=ray.intersectObjects(targets,false).find(h=>h.distance<40);
   setFound(hit?hit.object.userData:null);
  };
  const pointermove=e=>aim(e);
  const pointerleave=()=>setFound(null);
  const click=e=>{aim(e);if(found)emit(found.action)};
  const keydown=e=>{if(e.key.toLowerCase()==='e'||e.key==='Enter'){e.preventDefault();if(found)emit(found.action)}};
  const resize=()=>{
   if(!active||active.host!==host)return;
   const a=Math.max(1,host.clientWidth),b=Math.max(1,host.clientHeight),ratio=a/b;
   camera.left=-spanY*ratio/2;camera.right=spanY*ratio/2;camera.top=spanY/2;camera.bottom=-spanY/2;
   camera.updateProjectionMatrix();renderer.setSize(a,b,false);
  };
  canvas.addEventListener('click',click);canvas.addEventListener('pointermove',pointermove);canvas.addEventListener('pointerleave',pointerleave);
  window.addEventListener('keydown',keydown);window.addEventListener('resize',resize);
  active={host,scene,camera,canvas,raf:0,pointermove,pointerleave,resize,keydown,click};
  const tick=now=>{
   if(!active||active.host!==host)return;
   if(customer)customer.position.y=Math.sin(now*.0015)*.012;
   renderer.render(scene,camera);active.raf=requestAnimationFrame(tick);
  };
  active.raf=requestAnimationFrame(tick);aim();return true;
 }catch(e){
  console.error('Isometrische Werkstatt konnte nicht gestartet werden:',e);
  host.insertAdjacentHTML('afterbegin','<div class="shop-world-fallback"><b>Kuroneko Repair</b><p>Die 3D-Ansicht ist in diesem Browser nicht verfügbar. Nutze die Schnellaktionen.</p></div>');
  return false;
 }
}
window.KuronekoShop3D={mount,hide,interact:emit,destroy:()=>{hide();if(renderer){renderer.dispose();renderer=null}}};
})();