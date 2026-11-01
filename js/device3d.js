/* Kuroneko Repair · volumetric device and PCB viewer
 * Three.js draws the solid model; the invisible SVG above it retains the
 * established click targets for screws, pins, chips and repair actions.
 */
(function(){
  'use strict';
  const T=window.THREE;
  let active=null;
  const DEPTH={handheld:26,console:36,phone:15,mp3:18,camera:42,radio:38,tablet:10,laptop:25,gamepad:24,watch:13,buds:22,speaker:46,ereader:12,minidisc:25,router:34};
  const SIZE={handheld:[384,284],console:[364,280],phone:[340,210],mp3:[330,284],camera:[364,274],radio:[364,284],tablet:[380,290],laptop:[364,260],gamepad:[364,276],watch:[290,290],buds:[260,284],speaker:[340,284],ereader:[380,284],minidisc:[380,284],router:[330,280]};

  function color(v,fallback){try{return new T.Color(v||fallback)}catch(_){return new T.Color(fallback||'#77808a')}}
  function roundedRect(w,h,r){
    const s=new T.Shape(),x=w/2,y=h/2;r=Math.min(r,x*.95,y*.95);
    s.moveTo(-x+r,-y);s.lineTo(x-r,-y);s.quadraticCurveTo(x,-y,x,-y+r);
    s.lineTo(x,y-r);s.quadraticCurveTo(x,y,x-r,y);s.lineTo(-x+r,y);
    s.quadraticCurveTo(-x,y,-x,y-r);s.lineTo(-x,-y+r);s.quadraticCurveTo(-x,-y,-x+r,-y);return s;
  }
  function deviceShape(form){
    if(form==='watch'){const s=new T.Shape();s.absellipse(0,0,145,145,0,Math.PI*2,false,0);return s}
    if(form==='gamepad'){
      const s=new T.Shape();s.moveTo(-148,105);s.bezierCurveTo(-121,132,-69,122,-40,92);s.lineTo(-21,70);s.lineTo(21,70);s.lineTo(40,92);
      s.bezierCurveTo(69,122,121,132,148,105);s.bezierCurveTo(174,82,183,33,179,-45);s.bezierCurveTo(176,-101,146,-126,106,-113);
      s.lineTo(66,-91);s.lineTo(-66,-91);s.lineTo(-106,-113);s.bezierCurveTo(-146,-126,-176,-101,-179,-45);s.bezierCurveTo(-183,33,-174,82,-148,105);s.closePath();return s;
    }
    if(form==='camera'){
      const s=new T.Shape();s.moveTo(-172,-108);s.lineTo(-168,80);s.quadraticCurveTo(-166,120,-128,120);s.lineTo(-58,120);s.lineTo(-28,137);s.lineTo(48,137);s.lineTo(72,114);s.lineTo(154,114);
      s.quadraticCurveTo(182,114,182,82);s.lineTo(182,-108);s.quadraticCurveTo(182,-128,158,-128);s.lineTo(-148,-128);s.quadraticCurveTo(-172,-128,-172,-108);s.closePath();return s;
    }
    const radii={handheld:30,console:25,phone:48,mp3:48,radio:14,tablet:34,laptop:27,buds:42,speaker:48,ereader:26,minidisc:50,router:25};
    const size=SIZE[form]||[384,284];return roundedRect(size[0],size[1],radii[form]||24);
  }
  function basic(hex,roughness,metalness){return new T.MeshStandardMaterial({color:color(hex),roughness:roughness==null?.48:roughness,metalness:metalness==null?.22:metalness})}
  function addBox(parent,w,h,depth,x,y,z,hex,opts){
    const material=opts&&opts.material?opts.material:basic(hex||'#303844',opts&&opts.roughness,opts&&opts.metalness);
    const mesh=new T.Mesh(new T.BoxGeometry(Math.max(.4,w),Math.max(.4,h),Math.max(.4,depth)),material);
    mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);return mesh;
  }
  function addCylinder(parent,r,depth,x,y,z,hex,segments){
    const mesh=new T.Mesh(new T.CylinderGeometry(r,r,depth,segments||32),basic(hex||'#9aa5b2',.3,.72));
    mesh.rotation.x=Math.PI/2;mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);return mesh;
  }
  function addTorus(parent,r,tube,x,y,z,hex){
    const mesh=new T.Mesh(new T.TorusGeometry(r,tube,10,48),basic(hex||'#aab4c0',.28,.68));
    mesh.position.set(x,y,z);mesh.castShadow=true;parent.add(mesh);return mesh;
  }
  function makeSvgTexture(svg,onReady,onFail){
    const clone=svg.cloneNode(true);clone.removeAttribute('style');clone.setAttribute('xmlns','http://www.w3.org/2000/svg');clone.setAttribute('viewBox','0 0 400 300');clone.setAttribute('width','1200');clone.setAttribute('height','900');
    const mainGroup=clone.querySelector('g[transform]');if(mainGroup)mainGroup.removeAttribute('transform');
    const style=document.createElementNS('http://www.w3.org/2000/svg','style');style.textContent='.front-screen{fill:url(#glass);stroke:#080b13;stroke-width:5}.device-front{filter:none}text{font-family:Arial,monospace}';clone.insertBefore(style,clone.firstChild);
    const source=new XMLSerializer().serializeToString(clone),url=URL.createObjectURL(new Blob([source],{type:'image/svg+xml;charset=utf-8'})),image=new Image();
    image.onload=()=>{
      try{
        const canvas=document.createElement('canvas');canvas.width=1200;canvas.height=900;const ctx=canvas.getContext('2d');ctx.clearRect(0,0,1200,900);ctx.drawImage(image,0,0,1200,900);
        const texture=new T.CanvasTexture(canvas);if(T.SRGBColorSpace)texture.colorSpace=T.SRGBColorSpace;texture.anisotropy=4;texture.needsUpdate=true;onReady(texture);
      }catch(err){console.warn('SVG-Textur konnte nicht erstellt werden',err);if(onFail)onFail(err)}
      URL.revokeObjectURL(url);
    };
    image.onerror=()=>{const err=new Error('SVG-Textur konnte nicht geladen werden');URL.revokeObjectURL(url);console.warn(err.message);if(onFail)onFail(err)};image.src=url;
  }
  function dispose(){
    if(!active)return;window.removeEventListener('resize',active.resize);if(active.textureTimer)clearTimeout(active.textureTimer);active.renderer.dispose();
    active.scene.traverse(o=>{
      if(o.geometry)o.geometry.dispose();
      if(o.material)(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>{if(m.map)m.map.dispose();m.dispose()});
    });
    if(active.renderer.domElement.parentNode)active.renderer.domElement.parentNode.removeChild(active.renderer.domElement);active=null;
  }
  function chipLabel(label){
    const canvas=document.createElement('canvas');canvas.width=128;canvas.height=72;const c=canvas.getContext('2d');
    c.fillStyle='#151b24';c.fillRect(0,0,128,72);c.strokeStyle='#687482';c.lineWidth=3;c.strokeRect(2,2,124,68);c.fillStyle='#b7c3d0';c.font='bold 28px monospace';c.textAlign='center';c.textBaseline='middle';c.fillText(label,64,36);
    const tex=new T.CanvasTexture(canvas);if(T.SRGBColorSpace)tex.colorSpace=T.SRGBColorSpace;return new T.MeshBasicMaterial({map:tex,side:T.DoubleSide});
  }
  function addPartMesh(group,p,state,frontZ){
    if(state==='removed')return;const x=p.x+p.w/2-200,y=150-(p.y+p.h/2),broken=state==='broken',base=frontZ+.6,w=Math.max(5,p.w),h=Math.max(5,p.h);
    const damaged=broken?'#6d3034':'#8e9aa7';
    const count=typeof partPinCount==='function'?partPinCount(p):8,perSide=Math.ceil(count/2);
    for(let i=0;i<perSide;i++){
      const px=x-w/2+(i+.5)*w/perSide,padW=Math.max(1.2,w/perSide*.38);
      addBox(group,padW,4,1.2,px,y-h/2-1.8,base+1.1,'#c6a86a',{roughness:.27,metalness:.8});
      addBox(group,padW,4,1.2,px,y+h/2+1.8,base+1.1,'#c6a86a',{roughness:.27,metalness:.8});
    }
    if(['screen','trackpad'].includes(p.id)){addBox(group,w,h,p.id==='screen'?4:3,x,y,base+2,p.id==='screen'?'#17222e':'#9da5b0',{roughness:.2,metalness:.25});return}
    if(['camera','lens','sensor'].includes(p.id)){
      addBox(group,w,h,4,x,y,base+2,damaged);const r=Math.min(w,h)*.34;addCylinder(group,r,7,x,y,base+6,'#8996a5',36);addCylinder(group,r*.72,4,x,y,base+10,'#111a27',36);addCylinder(group,r*.36,2,x-2,y+2,base+13,'#31506b',32);return;
    }
    if(p.id==='speaker'){addCylinder(group,Math.min(w,h)*.43,6,x,y,base+3,'#303844',40);addTorus(group,Math.min(w,h)*.4,3,x,y,base+7,'#a6b0bc');addCylinder(group,Math.min(w,h)*.2,3,x,y,base+8,'#636e7d',32);return}
    if(p.id==='fan'){addCylinder(group,Math.min(w,h)*.46,7,x,y,base+3,'#202a35',40);addTorus(group,Math.min(w,h)*.42,2,x,y,base+7,'#93a0ad');addCylinder(group,Math.min(w,h)*.14,3,x,y,base+8,'#b5c0cc',24);return}
    if(['motor','stick'].includes(p.id)){addCylinder(group,Math.min(w,h)*.34,9,x,y,base+4,'#697582',32);addCylinder(group,Math.min(w,h)*.2,5,x,y,base+10,'#303944',28);return}
    if(['charging','usb','jack'].includes(p.id)){addBox(group,w,h,7,x,y,base+3,'#252c35');addBox(group,w*.56,h*.5,1.5,x,y,base+7,'#c4ccd3',{metalness:.8,roughness:.2});return}
    if(['battery','psu'].includes(p.id)){addBox(group,w,h,5,x,y,base+2.5,broken?'#805054':'#aab3bd',{roughness:.34,metalness:.35});for(let n=1;n<3;n++)addBox(group,1.2,h*.82,1.2,x-w/2+n*w/3,y,base+5.7,'#67727d');return}
    if(p.id==='board'){addBox(group,w,h,4,x,y,base+2,'#286146',{roughness:.7,metalness:.08});addBox(group,w*.34,h*.34,3,x,y,base+5,'#151b23');return}
    if(['capacitor','flash'].includes(p.id)){const r=Math.min(w/4,h/2);[-w*.22,w*.22].forEach(dx=>{addCylinder(group,r,8,x+dx,y,base+4,'#9ba9c0',24);addCylinder(group,r*.72,1,x+dx,y,base+8.5,'#d5dbe0',24)});return}
    if(['keypad','btn'].includes(p.id)){addBox(group,w,h,4,x,y,base+2,'#202833');for(let r=0;r<3;r++)for(let c=0;c<4;c++)addBox(group,w/4*.63,h/3*.58,3,x-w*.37+c*w*.247,y+h*.32-r*h*.31,base+5.5,'#a9b2c0');return}
    if(p.id==='antenna'){addBox(group,w,h,3,x,y,base+1.5,'#344353');addBox(group,4,h*.9,4,x,y,base+4,'#c0cad5');return}
    addBox(group,w,h,5,x,y,base+2.5,broken?'#6d3034':'#3d4855');
  }
  function addBoardComponents(group,j,frontZ){
    const st=j.st,d=DEV[j.dev];
    (st.micro||[]).forEach(m=>{
      const x=m.x+m.w/2-200,y=150-(m.y+m.h/2),n=Math.max(2,Math.floor(m.w/3)),state=m.state||'ok';
      for(let k=0;k<n;k++){
        const px=m.x+1+(m.w-2)*(k/(n-1))-200;
        addBox(group,Math.max(1,m.w/n*.58),2.8,1.35,px,150-(m.y-1),frontZ+1.35,'#c6a86a',{roughness:.27,metalness:.8});
        addBox(group,Math.max(1,m.w/n*.58),2.8,1.35,px,150-(m.y+m.h+1),frontZ+1.35,'#c6a86a',{roughness:.27,metalness:.8});
      }
      if(state!=='removed'){
        const h=state==='broken'?7:5.4;
        addBox(group,m.w,m.h,h,x,y,frontZ+2.5+h/2,state==='broken'?'#4d2027':'#111820',{roughness:.38,metalness:.35});
        const top=new T.Mesh(new T.PlaneGeometry(Math.max(3,m.w-1),Math.max(3,m.h-1)),chipLabel(m.ref));
        top.position.set(x,y,frontZ+2.5+h+.02);group.add(top);
      }
    });
    (st.smdParts||[]).forEach(m=>{
      const x=m.x+m.w/2-200,y=150-(m.y+m.h/2),base=frontZ+.75;
      addBox(group,m.w+2,2,1.1,x,y,base,'#c9ac70',{metalness:.75,roughness:.28});
      addBox(group,2,m.h*.6,1.2,x-m.w/2-1,y,base,'#c9ac70',{metalness:.75,roughness:.28});
      addBox(group,2,m.h*.6,1.2,x+m.w/2+1,y,base,'#c9ac70',{metalness:.75,roughness:.28});
      if(m.state!=='removed'){
        const col=m.type==='capacitor'?'#d2cbb9':m.type==='inductor'?'#ba9a65':m.type==='fuse'?'#d7d4c8':m.type==='diode'?'#232b35':'#1b2029';
        addBox(group,m.w,m.h,2.8,x,y,base+1.9,col,{roughness:.48,metalness:.18});
      }
    });
    d.parts.forEach(p=>addPartMesh(group,p,st.parts[p.id],frontZ));
  }
  function addScrews(group,j,frontZ){
    const st=j.st,d=DEV[j.dev],positions=d.screwLocs||[[34,34],[366,34],[34,266],[366,266],[200,34],[200,266],[120,266],[280,266]];
    positions.slice(0,d.screws).forEach((q,i)=>{
      if((st.screwOut||[])[i])return;const x=q[0]-200,y=150-q[1];
      addCylinder(group,7.2,2.1,x,y,frontZ+2,'#aeb6c2',20);addBox(group,7,1.3,.7,x,y,frontZ+3.2,'#252a32');addBox(group,1.3,7,.7,x,y,frontZ+3.2,'#252a32');
    });
  }
  function addDeviceDetails(group,j,frontZ){
    const form=DEV[j.dev].form;
    const size=SIZE[form]||[384,284],halfW=size[0]/2,halfH=size[1]/2;
    addBox(group,5,25,8,-halfW-1,18,0,'#aab2bc');addBox(group,5,17,8,-halfW-1,-18,0,'#687684');addBox(group,5,24,8,halfW+1,-10,0,'#aab2bc');
    addBox(group,42,8,10,0,-halfH+4,frontZ+3,'#18212d');addBox(group,32,5,5,0,-halfH+3,frontZ+8,'#b9c2ca');
    if(form==='camera'){
      addCylinder(group,59,10,70,5,frontZ+3,'#7f8995',48);addTorus(group,53,5,70,5,frontZ+8,'#c5ced8');addCylinder(group,39,5,70,5,frontZ+10,'#111d2b',48);addCylinder(group,18,2,67,8,frontZ+13,'#315674',32);
      addBox(group,74,18,9,-90,88,frontZ+3,'#161d26');
    }else if(form==='speaker'){addCylinder(group,84,8,0,4,frontZ+3,'#313a46',48);addTorus(group,78,5,0,4,frontZ+8,'#bac5cf');addCylinder(group,42,5,0,4,frontZ+10,'#566372',40)}
    else if(form==='radio'){addCylinder(group,36,11,95,0,frontZ+3,'#8d7357',40);addTorus(group,31,3,95,0,frontZ+9,'#d4bd91')}
    else if(form==='router'){
      [-145,145].forEach(x=>{const rod=new T.Mesh(new T.CylinderGeometry(4,5,90,16),basic('#303b49',.32,.55));rod.position.set(x,108,frontZ+2);rod.rotation.z=x<0?.2:-.2;group.add(rod);addCylinder(group,7,4,x,62,frontZ+2,'#a9b5c2',20)});
    }else if(form==='laptop'){
      addBox(group,320,44,7,0,-124,frontZ+3,'#838d9b');for(let r=0;r<3;r++)for(let c=0;c<12;c++)addBox(group,15,6,1.5,-135+c*24,-112+r*11,frontZ+7,'#333c48');
    }else if(form==='watch')addBox(group,86,110,5,0,0,frontZ+2,'#101a27');
  }
  function mount(j){
    const stage=document.getElementById('device3d-stage'),host=document.getElementById('device3d-canvas'),svg=document.getElementById('dsv');
    if(!stage||!host||!svg)return;dispose();stage.classList.remove('device3d-fallback');host.innerHTML='';host.style.display='block';svg.style.opacity='1';svg.style.pointerEvents='all';svg.style.touchAction='none';svg.style.zIndex='4';
    const d=DEV[j.dev],st=j.st,portrait=!!d.portrait,viewHeight=portrait?400:300,viewWidth=portrait?300:400,rect=stage.getBoundingClientRect();
    if(!T||!T.WebGLRenderer){host.style.display='none';stage.classList.add('device3d-fallback');svg.style.opacity='1';stage.insertAdjacentHTML('beforeend','<div class="device3d-error">WebGL ist in diesem Browser nicht verfügbar – klassische Ansicht wird gezeigt.</div>');return}
    let renderer,scene,camera;
    try{
      renderer=new T.WebGLRenderer({alpha:true,antialias:true,powerPreference:'high-performance'});
      renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));renderer.setSize(Math.max(1,rect.width),Math.max(1,rect.height),false);renderer.setClearColor(0x000000,0);
      if(T.SRGBColorSpace)renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.12;host.appendChild(renderer.domElement);
      scene=new T.Scene();scene.add(new T.HemisphereLight(0xddeaff,0x34302b,1.4));
      const key=new T.DirectionalLight(0xfff1d6,2.15);key.position.set(-260,360,520);scene.add(key);
      const fill=new T.DirectionalLight(0x7eb9df,.95);fill.position.set(340,-220,280);scene.add(fill);
      const rim=new T.DirectionalLight(0xffc58b,1.2);rim.position.set(0,180,-340);scene.add(rim);
      const cameraZ=850,fov=2*Math.atan((viewHeight/2)/cameraZ)*180/Math.PI;
      camera=new T.PerspectiveCamera(fov,viewWidth/viewHeight,1,4000);camera.position.set(0,0,cameraZ);camera.lookAt(0,0,0);
      const model=new T.Group();model.rotation.order='ZYX';scene.add(model);
      const depth=st.boardOut?7:(DEPTH[d.form]||24),shape=st.boardOut?roundedRect(376,256,10):deviceShape(d.form);
      const geo=new T.ExtrudeGeometry(shape,{depth,bevelEnabled:true,bevelThickness:Math.min(2,depth*.22),bevelSize:1.8,bevelSegments:3,steps:1,curveSegments:16});geo.computeVertexNormals();
      const front=basic(st.boardOut?'#245b40':d.color,.35,.35),side=basic(st.boardOut?'#22533e':d.color,.34,.42);
      const body=new T.Mesh(geo,[front,side]);body.position.z=-depth/2;body.castShadow=true;body.receiveShadow=true;model.add(body);
      const faceMaterial=new T.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:0,alphaTest:.012,side:T.DoubleSide,depthWrite:false});
      const face=new T.Mesh(new T.PlaneGeometry(400,300),faceMaterial),frontZ=depth/2+.35;face.position.z=frontZ;face.renderOrder=2;model.add(face);
      if(st.coverOff)addBoardComponents(model,j,frontZ);else{addDeviceDetails(model,j,frontZ);if(st.flipped)addScrews(model,j,frontZ)}
      model.rotation.x=(Number.isFinite(st.boardOut?st.boardRotX:st.viewRotX)?(st.boardOut?st.boardRotX:st.viewRotX):13)*Math.PI/180;
      model.rotation.y=(Number.isFinite(st.boardOut?st.boardRotY:st.viewRotY)?(st.boardOut?st.boardRotY:st.viewRotY):-17)*Math.PI/180;
      if(portrait)model.rotation.z=-Math.PI/2;
      const resize=()=>{if(!stage.isConnected)return;const r=stage.getBoundingClientRect();renderer.setSize(Math.max(1,r.width),Math.max(1,r.height),false);renderer.render(scene,camera)};
      window.addEventListener('resize',resize);
      active={stage,host,renderer,scene,camera,model,face,faceMaterial,svg,resize,frontZ,depth,j,textureReady:false,textureTimer:null};
      const viewer3D=active;
      viewer3D.textureTimer=setTimeout(()=>{
        if(active!==viewer3D||viewer3D.textureReady)return;
        faceMaterial.opacity=0;host.style.display='none';svg.style.opacity='1';stage.classList.add('device3d-fallback');
        console.warn('3D-Textur dauerte zu lange – Geräteansicht bleibt sichtbar.');
      },8000);
      makeSvgTexture(svg,texture=>{
        if(!active||active.stage!==stage){texture.dispose();return}
        viewer3D.textureReady=true;if(viewer3D.textureTimer)clearTimeout(viewer3D.textureTimer);
        faceMaterial.map=texture;faceMaterial.opacity=1;faceMaterial.needsUpdate=true;
        /* Keep the closed/front/back device face visible; only the opened board uses the WebGL texture alone. */
        svg.style.opacity='.001';svg.style.pointerEvents='all';svg.style.touchAction='none';renderer.render(scene,camera);
      },err=>{
        if(active!==viewer3D)return;
        if(viewer3D.textureTimer)clearTimeout(viewer3D.textureTimer);
        faceMaterial.opacity=0;host.style.display='none';svg.style.opacity='1';stage.classList.add('device3d-fallback');
        console.warn('3D-Oberfläche verwendet die sichtbare Geräteansicht als Fallback.',err);
      });
      renderer.render(scene,camera);stage.style.perspective=cameraZ+'px';stage._kuroneko3D=active;
    }catch(err){
      console.error('3D-Werkbank konnte nicht gestartet werden:',err);if(renderer)renderer.dispose();
      host.innerHTML='';host.style.display='none';stage.classList.add('device3d-fallback');svg.style.opacity='1';
      stage.insertAdjacentHTML('beforeend','<div class="device3d-error">3D konnte nicht initialisiert werden. Die normale Werkbank bleibt verfügbar.</div>');
    }
  }
  function attachRotation(j){
    if(!active||!active.stage||!active.stage.isConnected||active.j.id!==j.id)return;
    const svg=active.svg,stage=active.stage,st=j.st,isBoard=!!st.boardOut;
    let x=Number.isFinite(isBoard?st.boardRotX:st.viewRotX)?(isBoard?st.boardRotX:st.viewRotX):13;
    let y=Number.isFinite(isBoard?st.boardRotY:st.viewRotY)?(isBoard?st.boardRotY:st.viewRotY):-17;
    const apply=()=>{
      active.model.rotation.x=x*Math.PI/180;active.model.rotation.y=y*Math.PI/180;active.renderer.render(active.scene,active.camera);
      svg.style.transform=`rotateX(${x}deg) rotateY(${y}deg) translateZ(${active.frontZ}px)`;
      svg.classList.toggle('microscope-view',typeof tool!=='undefined'&&tool==='microscope');
    };
    apply();let drag=null;
    svg.addEventListener('pointerdown',e=>{
      if(e.target.closest&&e.target.closest('.sc,.pt,.micro-chip,.micro-pin,.part-pin,.smd-pin,.smd-chip,.dirt'))return;
      drag={x:e.clientX,y:e.clientY,rx:x,ry:y};stage.classList.add('is-dragging');try{svg.setPointerCapture(e.pointerId)}catch(_){}
    });
    svg.addEventListener('pointermove',e=>{
      if(!drag)return;x=Math.max(-72,Math.min(72,drag.rx+(e.clientY-drag.y)*.56));y=Math.max(-78,Math.min(78,drag.ry+(e.clientX-drag.x)*.62));apply();
    });
    const end=()=>{if(!drag)return;drag=null;stage.classList.remove('is-dragging');if(isBoard){st.boardRotX=x;st.boardRotY=y}else{st.viewRotX=x;st.viewRotY=y}if(typeof save==='function')save()};
    svg.addEventListener('pointerup',end);svg.addEventListener('pointercancel',end);
    const reset=document.getElementById('a_rotate_reset');
    if(reset){const old=reset.onclick;reset.onclick=function(){x=isBoard?21:13;y=isBoard?-14:-17;apply();if(isBoard){st.boardRotX=x;st.boardRotY=y}else{st.viewRotX=x;st.viewRotY=y}if(typeof save==='function')save();if(old)old()}}
  }
  window.Kuroneko3D={mount,attachRotation,dispose};
})();
