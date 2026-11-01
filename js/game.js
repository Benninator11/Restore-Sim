'use strict';
/* ===== DATEN ===== */
const BITS=['Ph0','Ph1','Torx'];
const DEV={
  handheld:{name:'Pocket-Kid Handheld',color:'#8d8fb8',screws:4,bit:'Ph0',fee:5500,parts:[
    {id:'screen',label:'Display',x:110,y:50,w:180,h:100},{id:'battery',label:'Akku',x:50,y:175,w:100,h:55},{id:'btn',label:'Tastenplatine',x:250,y:175,w:100,h:55}]},
  console:{name:'Famiko Mini Konsole',color:'#c9c4b8',screws:6,bit:'Ph1',fee:9000,parts:[
    {id:'psu',label:'Netzteil',x:45,y:50,w:110,h:70},{id:'laser',label:'Laser-Einheit',x:195,y:50,w:150,h:70},{id:'fan',label:'Lüfter',x:140,y:160,w:120,h:70}]},
  phone:{name:'Nokira Klapp-Handy',color:'#4b5b7a',screws:4,bit:'Torx',fee:6500,parts:[
    {id:'battery',label:'Akku',x:50,y:50,w:120,h:90},{id:'speaker',label:'Lautsprecher',x:210,y:50,w:120,h:50},{id:'keypad',label:'Tastenmatte',x:130,y:165,w:140,h:65}]},
  mp3:{name:'Walkabout MD-Player',color:'#b9bfd0',screws:4,bit:'Ph0',fee:6000,parts:[
    {id:'motor',label:'Disc-Motor',x:60,y:55,w:120,h:90},{id:'battery',label:'Akku',x:220,y:55,w:100,h:60},{id:'jack',label:'Kopfhörerbuchse',x:220,y:160,w:100,h:55}]},
  camera:{name:'Pixelcam 2MP',color:'#9aa7a0',screws:6,bit:'Ph1',fee:8000,parts:[
    {id:'sensor',label:'Bildsensor',x:50,y:50,w:130,h:80},{id:'battery',label:'Akku',x:220,y:50,w:100,h:60},{id:'flash',label:'Blitzkondensator',x:140,y:165,w:130,h:60}]},
  radio:{name:'Tanaka Röhrenradio',color:'#b07a4c',screws:4,bit:'Ph1',fee:7000,parts:[
    {id:'tuner',label:'Tuner',x:50,y:50,w:130,h:80},{id:'capacitor',label:'Kondensator',x:220,y:50,w:100,h:70},{id:'speaker',label:'Lautsprecher',x:130,y:160,w:140,h:70}]}
};

// Weitere Geräte: bewusst unterschiedliche Bauformen, Seitenverhältnisse und Schraubenpositionen.
Object.assign(DEV,{
  tablet:{name:'Kumo Tab 7',color:'#687d8e',form:'tablet',width:390,screws:6,bit:'Ph1',fee:10500,parts:[
    {id:'screen',label:'Touchdisplay',x:75,y:35,w:250,h:135},{id:'battery',label:'Flachakku',x:110,y:190,w:180,h:48},{id:'camera',label:'Kameramodul',x:42,y:185,w:52,h:55},{id:'speaker',label:'Lautsprecher',x:300,y:190,w:55,h:55},{id:'charging',label:'USB-C-Buchse',x:175,y:255,w:55,h:25,attach:'socket'}]},
  laptop:{name:'MoriBook 12',color:'#a9adb5',form:'laptop',width:500,screws:8,bit:'Torx',fee:15000,parts:[
    {id:'screen',label:'Displaykabel',x:120,y:35,w:160,h:65},{id:'battery',label:'Akku-Pack',x:70,y:190,w:145,h:55},{id:'board',label:'Mainboard',x:220,y:105,w:145,h:75},{id:'fan',label:'Kühlerlüfter',x:65,y:80,w:75,h:75},{id:'trackpad',label:'Trackpad',x:235,y:205,w:95,h:48},{id:'charging',label:'Ladebuchse',x:340,y:205,w:38,h:40,attach:'socket'}]},
  gamepad:{name:'Neko Pad Controller',color:'#343847',form:'gamepad',width:365,screws:6,bit:'Ph0',fee:7500,parts:[
    {id:'board',label:'Controller-Platine',x:115,y:90,w:170,h:110},{id:'battery',label:'Akku',x:145,y:205,w:110,h:42},{id:'btn',label:'Tastenmatte',x:45,y:65,w:90,h:75},{id:'stick',label:'Analogstick-Modul',x:265,y:65,w:85,h:85},{id:'usb',label:'Ladeanschluss',x:175,y:38,w:50,h:25,attach:'socket'}]},
  watch:{name:'Kumo Smartwatch',color:'#343c53',form:'watch',portrait:true,width:190,screws:4,bit:'Torx',fee:6900,parts:[
    {id:'screen',label:'OLED-Modul',x:105,y:35,w:190,h:90},{id:'battery',label:'Mini-Akku',x:120,y:145,w:160,h:55},{id:'sensor',label:'Pulssensor',x:160,y:220,w:90,h:45},{id:'charging',label:'Ladekontakt',x:45,y:235,w:55,h:26,attach:'socket'}]},
  earbuds:{name:'Mimi Wireless Buds',color:'#d4d4d8',form:'buds',width:210,screws:4,bit:'Ph0',fee:5200,parts:[
    {id:'battery',label:'Case-Akku',x:135,y:55,w:130,h:48},{id:'board',label:'Ladeplatine',x:95,y:120,w:210,h:65},{id:'charging',label:'Ladekontakte',x:145,y:210,w:110,h:25,attach:'socket'},{id:'antenna',label:'Bluetooth-Antenne',x:45,y:210,w:75,h:30,attach:'socket'}]},
  speaker:{name:'Hoshi Bluetooth Speaker',color:'#424b58',form:'speaker',width:350,screws:6,bit:'Ph1',fee:8500,parts:[
    {id:'speaker',label:'Lautsprechertreiber',x:105,y:65,w:190,h:150},{id:'battery',label:'Akku-Pack',x:45,y:215,w:110,h:42},{id:'board',label:'Verstärkerplatine',x:220,y:220,w:125,h:55},{id:'usb',label:'USB-Buchse',x:165,y:235,w:42,h:26,attach:'socket'}]},
  camcorder:{name:'Mikan Handycam',color:'#58646b',form:'camera',width:420,screws:8,bit:'Ph1',fee:12500,parts:[
    {id:'sensor',label:'CCD-Sensor',x:75,y:45,w:120,h:95},{id:'lens',label:'Objektivmotor',x:220,y:45,w:125,h:95},{id:'screen',label:'Klappdisplay',x:45,y:175,w:120,h:65},{id:'battery',label:'Akku',x:205,y:190,w:110,h:52},{id:'board',label:'Signalplatine',x:320,y:160,w:55,h:90}]}
});
DEV.handheld.form='handheld';DEV.handheld.width=330;
DEV.console.form='console';DEV.console.width=470;
DEV.phone.form='phone';DEV.phone.portrait=true;DEV.phone.width=190;
DEV.mp3.form='mp3';DEV.mp3.width=275;
DEV.camera.form='camera';DEV.camera.width=315;
DEV.radio.form='radio';DEV.radio.width=440;
DEV.handheld.screwLocs=[[42,42],[358,42],[42,258],[358,258]];
DEV.console.screwLocs=[[28,28],[372,28],[28,272],[372,272],[200,28],[200,272]];
DEV.phone.screwLocs=[[55,90],[345,90],[55,210],[345,210]];
DEV.mp3.screwLocs=[[65,45],[335,45],[65,255],[335,255]];
DEV.camera.screwLocs=[[35,35],[365,35],[35,265],[365,265],[200,35],[200,265]];
DEV.radio.screwLocs=[[30,30],[370,30],[30,270],[370,270]];
DEV.watch.screwLocs=[[105,55],[295,55],[105,245],[295,245]];
DEV.earbuds.screwLocs=[[105,45],[295,45],[105,255],[295,255]];
DEV.speaker.screwLocs=[[80,40],[320,40],[80,260],[320,260],[200,25],[200,275]];
DEV.gamepad.screwLocs=[[80,70],[320,70],[45,175],[355,175],[140,250],[260,250]];
DEV.camcorder.screwLocs=[[60,60],[340,60],[45,245],[355,245],[200,30],[200,270],[130,260],[270,260]];
for(const t of Object.keys(DEV)){
  DEV[t].screwLocs=DEV[t].screwLocs||[[34,34],[366,34],[34,266],[366,266],[200,34],[200,266],[120,266],[280,266]];
}
Object.assign(DEV,{
  ereader:{name:'Yomiko E-Reader',color:'#b9b6aa',form:'ereader',width:520,screws:8,bit:'Ph0',fee:11200,parts:[
    {id:'screen',label:'E-Ink-Display',x:70,y:35,w:260,h:150},{id:'battery',label:'Flachakku',x:82,y:205,w:115,h:48},{id:'board',label:'Reader-Mainboard',x:215,y:195,w:125,h:62},{id:'charging',label:'USB-C-Buchse',x:350,y:220,w:34,h:30},{id:'btn',label:'Navigationstasten',x:350,y:60,w:38,h:110}]},
  minidisc:{name:'Aki MiniDisc Player',color:'#9fa9b6',form:'minidisc',width:470,screws:6,bit:'Ph0',fee:9800,parts:[
    {id:'motor',label:'Disc-Spindelmotor',x:55,y:55,w:120,h:115},{id:'laser',label:'Optischer Lesekopf',x:205,y:55,w:120,h:85},{id:'battery',label:'Akku-Pack',x:55,y:205,w:105,h:48},{id:'board',label:'Audio-Platine',x:205,y:175,w:150,h:75},{id:'jack',label:'Kopfhörerbuchse',x:350,y:90,w:34,h:40}]},
  router:{name:'Kitsune Wi-Fi Router',color:'#454f5a',form:'router',width:500,screws:8,bit:'Ph1',fee:8900,parts:[
    {id:'board',label:'Netzwerk-Mainboard',x:65,y:75,w:265,h:145},{id:'antenna',label:'WLAN-Antennenmodul',x:340,y:45,w:42,h:100},{id:'psu',label:'Spannungsregler',x:55,y:230,w:100,h:42},{id:'fan',label:'Kühlmodul',x:205,y:230,w:70,h:48},{id:'charging',label:'DC-Eingang',x:340,y:205,w:42,h:38}]}
});
DEV.ereader.screwLocs=[[28,28],[372,28],[28,272],[372,272],[135,22],[265,22],[135,278],[265,278]];
DEV.minidisc.screwLocs=[[32,34],[368,34],[32,266],[368,266],[200,26],[200,274]];
DEV.router.screwLocs=[[28,28],[372,28],[28,272],[372,272],[130,25],[270,25],[130,275],[270,275]];


const partKey=(t,p)=>t+':'+p;
const partPrice=(t,p)=>Math.round(DEV[t].fee*0.28/100)*100+(p.length%3)*200;
const SYMPTOM={screen:'Bild bleibt schwarz',battery:'Geht nach Sekunden aus',btn:'Tasten reagieren nicht',psu:'Kein Lebenszeichen',laser:'Liest keine Discs',fan:'Wird extrem laut und heiß',speaker:'Kein Ton',keypad:'Tasten klemmen',motor:'Disc dreht nicht',jack:'Kopfhörer knistern',sensor:'Fotos sind schwarz',flash:'Blitz lädt nicht',tuner:'Nur Rauschen',capacitor:'Brummt laut',camera:'Kamera zeigt nur schwarz',charging:'Akku lädt nicht',board:'Startet unregelmäßig',trackpad:'Touchpad reagiert nicht',stick:'Steuerknüppel driftet',usb:'USB-Verbindung bricht ab',antenna:'Verbindung bricht ständig ab',lens:'Autofokus funktioniert nicht'};
const TOOLS=[
  {id:'driver',icon:'🪛',name:'Schraubenzieher',sub:'Schrauben lösen / eindrehen'},
  {id:'tweezers',icon:'🗜️',name:'Pinzette',sub:'Kleine Stecker und Clips'},
  {id:'brush',icon:'🖌️',name:'Pinsel',sub:'Staub entfernen'},
  {id:'cloth',icon:'🧽',name:'Tuch + Alkohol',sub:'Hartnäckigen Schmutz'},
  {id:'meter',icon:'📟',name:'Messgerät',sub:'Spannung / Durchgang prüfen'},
  {id:'chiptest',icon:'🔬',name:'Chip-Tester',sub:'Winzige ICs identifizieren'},
  {id:'solder',icon:'♨️',name:'Lötkolben',sub:'Teile aus-/einlöten'},
  {id:'hand',icon:'✋',name:'Hand',sub:'Gerät drehen / Deckel'}
];
const MICRO_CATALOG=[
  {id:'power',label:'Power-Management-IC',short:'PMIC',desc:'Versorgt die Platine mit stabilen Spannungen'},
  {id:'audio',label:'Audio-DSP',short:'AUDIO',desc:'Verarbeitet Ton und Kopfhörersignal'},
  {id:'memory',label:'Flash-Speicher-IC',short:'FLASH',desc:'Speichert Firmware und Einstellungen'},
  {id:'logic',label:'Logik-Controller',short:'LOGIC',desc:'Steuert interne Abläufe'},
  {id:'usb',label:'USB-Ladecontroller',short:'USB',desc:'Regelt Laden und Datenverbindung'},
  {id:'sensor',label:'Sensor-Controller',short:'SENSOR',desc:'Verarbeitet Sensor- und Messwerte'},
  {id:'radio',label:'Funk-Transceiver',short:'RF',desc:'Steuert Funk- und Bluetooth-Verbindungen'},
  {id:'amp',label:'Audio-Verstärker-IC',short:'AMP',desc:'Verstärkt das Audiosignal'}
];
const microInfo=id=>MICRO_CATALOG.find(x=>x.id===id)||MICRO_CATALOG[0];
const microKey=(dev,type)=>partKey(dev,'micro_'+type);
function makeMicroBoard(j,d){
  const rr=seeded(j.id*31+17), occupied=d.parts.map(p=>({x:p.x-7,y:p.y-7,w:p.w+14,h:p.h+14})), chips=[];
  const target=18;let tries=0;
  while(chips.length<target&&tries++<2600){
    const w=9+Math.floor(rr()*7),h=7+Math.floor(rr()*5);
    const b={x:34+Math.floor(rr()*(332-w)),y:34+Math.floor(rr()*(232-h)),w,h};
    if(occupied.some(o=>hit(o,b,5)))continue;
    occupied.push(b);
    const i=chips.length, type=MICRO_CATALOG[(i*5+j.id*3)%MICRO_CATALOG.length].id;
    chips.push({id:'u'+String(i+1).padStart(2,'0'),ref:'U'+String(i+1).padStart(2,'0'),type,x:b.x,y:b.y,w,h,identified:false,state:'ok'});
  }
  if(chips.length){const fault=(j.id*7+3)%chips.length;chips[fault].state='broken';chips[fault].fault=true;}
  return chips;
}
const FIRST=['Sakura','Hiroshi','Mei','Takeshi','Aiko','Ren','Noriko','Daichi','Emi','Shun'];
const FILL_TXT=[
 'Guten Tag. Mein {d} hat plötzlich aufgehört zu funktionieren. Können Sie sich das ansehen?',
 'Ich habe mein {d} schon überall hingebracht. Alle sagen: Wegwerfen. Sie auch?',
 'Das {d} war ein Geschenk. Ich würde es gerne wieder zum Laufen bringen.',
 'Es regnet draußen und mein {d} ist leider auch kaputt. Hilfst du mir?'
];
const NODES={
 y0:{w:'Yuki',t:'Entschuldigung... mein Pocket-Kid geht nicht mehr an. Morgen wollte ich Haruka etwas darauf zeigen. Kannst du das reparieren?',c:[{l:'Klar, das kriegen wir hin.',n:'y1'},{l:'Wer ist Haruka?',n:'y2'}]},
 y2:{w:'Yuki',t:'Äh... ein Mädchen aus meinem Kurs. Unser gemeinsames Foto ist auf dem Gerät.',c:[{l:'Ich kümmere mich darum.',n:'y1',fx:{rep:1}}]},
 y1:{w:'Yuki',t:'Danke! Ich komme wieder vorbei.',c:[{l:'(Gerät annehmen)',n:null,acc:true}]},
 yp0:{w:'Yuki',t:'Es läuft wieder! Meinst du, ich sollte ihr heute sagen, was ich fühle?',c:[{l:'Trau dich. Ehrlichkeit lohnt sich.',n:'yp1',fx:{flag:'yuki_confess',rep:2}},{l:'Warte lieber noch etwas ab.',n:'yp1'}]},
 yp1:{w:'Yuki',t:'Danke, Chef. Ich merke mir das.',c:[{l:'Viel Glück!',n:null}]},
 m0:{w:'Herr Mori',t:'Das Radio gehörte meiner Frau. Seit sie fort ist, schweigt es. Viel Geld habe ich nicht...',c:[{l:'Ich übernehme das zum normalen Preis.',n:'m1'},{l:'Für dieses Radio gibt es den halben Preis.',n:'m1',fx:{flag:'mori_kind',discount:true}}]},
 m1:{w:'Herr Mori',t:'Sie sind ein anständiger Mensch.',c:[{l:'(Gerät annehmen)',n:null,acc:true}]},
 mp0:{w:'Herr Mori',t:'Ihr Lieblingssender läuft wieder. Es ist, als wäre sie im Zimmer.',c:[{l:'Das freut mich sehr.',n:null,fx:{rep:2}}]},
 k0:{w:'Kenji',t:'Ich bin raus aus dem Geschäft. Dieses Handy ist alles, was mir blieb. Frag nicht, woher.',c:[{l:'Ich sehe es mir an.',n:'k1'}]},
 k1:{w:'Kenji',t:'Mach es gründlich. Wirklich gründlich.',c:[{l:'(Gerät annehmen)',n:null,acc:true}]},
 kp0:{w:'Kenji',t:'Und? Hast du alles... sauber gemacht? Auch hinter dem Akku?',c:[{l:'Ich fand einen Speicherchip und einen Zettel mit Namen. Ich gebe dir beides diskret zurück.',n:'kpa',fx:{flag:'kenji_trust',rep:2}},{l:'Ich fand einen Chip. Ich habe ihn der Polizei übergeben.',n:'kpb',fx:{flag:'police',rep:-2}},{l:'Ich fand einen Chip. Der kostet dich extra.',n:'kpc',fx:{flag:'blackmail',money:8000,rep:-8}}]},
 kpa:{w:'Kenji',t:'Ich vergesse das nicht, Meister.',c:[{l:'(nickt)',n:null}]},
 kpb:{w:'Kenji',t:'...Du hast keine Ahnung, was du getan hast.',c:[{l:'(schweigt)',n:null}]},
 kpc:{w:'Kenji',t:'(zählt Scheine hin) Das wirst du bereuen.',c:[{l:'(schweigt)',n:null}]},
 a0:{w:'Ayame',t:'Mein Walkabout dreht die Disc nicht mehr! Morgen ist das Konzert meiner Lieblingsband!',c:[{l:'Bis morgen kriege ich das hin.',n:'a1'}]},
 a1:{w:'Ayame',t:'Echt? Du bist mein Held!',c:[{l:'(Gerät annehmen)',n:null,acc:true}]},
 ap0:{w:'Ayame',t:'Perfekt! Ich habe noch ein zweites Ticket. Willst du mitkommen?',c:[{l:'Gern!',n:null,fx:{flag:'concert',rep:3}},{l:'Danke, ich muss den Laden hüten.',n:null,fx:{rep:1}}]},
 mi0:{w:'Mike (Tourist)',t:'Hello! Meine Kamera mit allen Urlaubsfotos ist kaputt. Fly home on Friday!',c:[{l:'Das schaffen wir.',n:'mi1'}]},
 mi1:{w:'Mike (Tourist)',t:'Awesome! Thank you so much.',c:[{l:'(Gerät annehmen)',n:null,acc:true}]},
 mip0:{w:'Mike (Tourist)',t:'My photos! Ich schreibe die beste Bewertung der Welt über euren Laden.',c:[{l:'Gern geschehen!',n:null,fx:{rep:4}}]},
 kr_t:{w:'Kenji',t:'Der Chip hat mir das Leben gerettet. Danke, dass du den Mund gehalten hast. Hier, für dich.',c:[{l:'Nicht nötig...',n:null,fx:{money:6000,rep:3}}]},
 kr_p:{w:'Kommissar Ono',t:'Der Chip, den Sie abgegeben haben, hat uns einen ganzen Fall gelöst. Die Stadt dankt Ihnen.',c:[{l:'Ich habe nur das Richtige getan.',n:null,fx:{money:3000,rep:5,flag:'justice'}}]},
 kr_b:{w:'Kenji',t:'Ich bin zurück. Du hast etwas, das mir gehört. Das hier wird jetzt unser kleines Geheimnis, oder nicht?',c:[{l:'Nimm den Chip zurück und lass mich in Ruhe.',n:null,fx:{money:-8000,flag:'returned_chip',rep:2}},{l:'Raus aus meinem Laden!',n:null,fx:{flag:'threat',rep:-5}}]},
 s0:{w:'Vermieter Sato',t:'Die Miete steigt, junger Mann. Oder ich kaufe dir den Laden für ¥60000 ab. Überleg es dir.',c:[{l:'Ich bleibe. Der Laden ist mein Zuhause.',n:null,fx:{flag:'stay',rentUp:1500}},{l:'Gut, ich verkaufe.',n:null,fx:{flag:'sold',money:60000}}]},
 h0:{w:'Yuki',t:'Chef! Ich hab es ihr gesagt... und sie hat Ja gesagt! Haruka wollte dich unbedingt kennenlernen.',c:[{l:'Das ist wundervoll!',n:null,fx:{flag:'love',rep:3}}]},
 h1:{w:'Yuki',t:'Ich habe mich nicht getraut. Vielleicht nächstes Jahr... Danke für alles.',c:[{l:'Nächstes Jahr klappt es bestimmt.',n:null}]}
};
const STORY=[
 {id:'yuki',day:1,name:'Yuki',dev:'handheld',faults:['battery'],intro:'y0',pick:'yp0'},
 {id:'mori',day:1,name:'Herr Mori',dev:'radio',faults:['tuner','capacitor'],intro:'m0',pick:'mp0'},
 {id:'kenji',day:2,name:'Kenji',dev:'phone',faults:['battery','keypad'],intro:'k0',pick:'kp0'},
 {id:'ayame',day:3,name:'Ayame',dev:'mp3',faults:['motor'],intro:'a0',pick:'ap0'},
 {id:'mike',day:4,name:'Mike',dev:'camera',faults:['sensor'],intro:'mi0',pick:'mip0'}
];
const MAXDAY=7,RENT=2500;
/* ===== ENGINE ===== */
const $=s=>document.querySelector(s);
const yen=n=>'¥'+Math.round(n).toLocaleString('de-DE');
let S=null,tab='shop',actx=null,mute=false,cur=null; // cur = aktueller Dialogzustand
let uid=1;
function sfx(f=440,d=.08,type='square',v=.04){if(mute)return;try{actx=actx||new (window.AudioContext||window.webkitAudioContext)();const o=actx.createOscillator(),g=actx.createGain();o.type=type;o.frequency.value=f;g.gain.value=v;o.connect(g);g.connect(actx.destination);o.start();g.gain.exponentialRampToValueAtTime(.0001,actx.currentTime+d);o.stop(actx.currentTime+d)}catch(e){}}
function toast(t){const e=$('#toast');e.textContent=t;e.hidden=false;clearTimeout(toast.t);toast.t=setTimeout(()=>e.hidden=true,2400)}
function save(){try{localStorage.setItem('kuroneko_v1',JSON.stringify(S))}catch(e){}}
function load(){try{const j=localStorage.getItem('kuroneko_v1');if(j){const o=JSON.parse(j);if(o&&o.day)return o}}catch(e){}return null}
function newGame(){
  S={day:1,money:20000,rep:50,rent:RENT,flags:{},jobs:[],inv:{},orders:[],queue:[],qi:0,mail:[],log:[],phase:'day',stats:{done:0,earned:0},nid:1};
  startDay();
}
function applyFx(fx,job){
  if(!fx)return;
  if(fx.rep)S.rep=Math.max(0,Math.min(100,S.rep+fx.rep));
  if(fx.money)S.money+=fx.money;
  if(fx.flag)S.flags[fx.flag]=1;
  if(fx.rentUp)S.rent+=fx.rentUp;
  if(fx.discount){if(job)job.fee=Math.round(job.fee*.5/100)*100;else S.pendDisc=1}
}
/* --- Tagesbeginn --- */
function rnd(a){return a[Math.floor(Math.random()*a.length)]}
function makeFiller(){
  const types=Object.keys(DEV),t=rnd(types),d=DEV[t],n=rnd(FIRST);
  const faults=[rnd(d.parts).id];
  const id='f'+(S.nid++);
  NODES[id+'_0']={w:n,t:rnd(FILL_TXT).replace('{d}',d.name)+' (Symptom: '+SYMPTOM[faults[0]]+')',c:[{l:'Ich sehe es mir an.',n:null,acc:true},{l:'Tut mir leid, das ist nichts für mich.',n:null,fx:{rep:-1},decline:true}]};
  NODES[id+'_p']={w:n,t:'Es läuft wie am ersten Tag. Vielen Dank!',c:[{l:'Gern geschehen.',n:null}]};
  S.fn=S.fn||{};S.fn[id+'_0']=NODES[id+'_0'];S.fn[id+'_p']=NODES[id+'_p'];
  return {id,name:n,dev:t,faults,intro:id+'_0',pick:id+'_p',filler:1};
}
function startDay(){
  const q=[];
  S.jobs.filter(j=>!j.online).forEach(j=>{
    if(j.stage==='done')q.push({type:'pickup',jid:j.id});
    else if(j.accDay<S.day)q.push({type:'wait',jid:j.id});
  });
  const d=S.day;
  if(d===5){q.push({type:'event',node:S.flags.kenji_trust?'kr_t':S.flags.police?'kr_p':S.flags.blackmail?'kr_b':null})}
  if(d===6)q.push({type:'event',node:'s0'});
  if(d===7)q.push({type:'event',node:S.flags.yuki_confess?'h0':'h1'});
  STORY.filter(c=>c.day===d).forEach(c=>q.push({type:'new',c}));
  const extra=d===1?1:(d<=6?1+(Math.random()<.5?1:0):0);
  for(let i=0;i<extra;i++)q.push({type:'new',c:makeFiller()});
  S.queue=q.filter(x=>x.type!=='event'||x.node);S.qi=0;
  // Teile liefern
  const arr=S.orders.filter(o=>o.arrive<=d);
  arr.forEach(o=>{S.inv[o.key]=(S.inv[o.key]||0)+1});
  S.orders=S.orders.filter(o=>o.arrive>d);
  if(arr.length)toast(arr.length+' Teile-Paket(e) sind angekommen');
  // Online-Auftraege
  if(d<=6){const r=Math.random();if(r<.7){const t=rnd(Object.keys(DEV));const df=DEV[t];S.mail.push({id:S.nid++,from:rnd(['kaede@net.jp','shiro_77@mail.co.jp','retro-fan@nifty.ne','okuyama@web.jp']),dev:t,fault:rnd(df.parts).id,fee:Math.round(df.fee*1.1/100)*100,day:d,state:'open'})}}
  S.phase='day';cur=null;
}
/* --- Render Grundgeruest --- */
function renderHud(){
  $('#hud').innerHTML=`<span class="logo">黒猫修理 KURONEKO</span><span class="stat">Tag <b>${S.day}</b>/${MAXDAY}</span><span class="stat">Kasse <b>${yen(S.money)}</b></span><span class="stat">Ruf <b>${S.rep}</b>/100</span><button id="bm" aria-label="Ton">${mute?'Ton aus':'Ton an'}</button><button id="bn">Neues Spiel</button>`;
  $('#bm').onclick=()=>{mute=!mute;renderHud()};
  $('#bn').onclick=()=>confirmBox('Neues Spiel starten? Der Spielstand geht verloren.',()=>{newGame();save();go('shop')});
}
function renderTabs(){
  const open=S.mail.filter(m=>m.state==='open').length;
  const jobs=S.jobs.filter(j=>j.stage!=='done').length;
  const T=[['shop','Laden'],['jobs','Aufträge'+(jobs?`<span class="badge">${jobs}</span>`:'')],['bench','Werkbank'],['pc','PC'+(open?`<span class="badge">${open}</span>`:'')]];
  $('#tabs').innerHTML=T.map(([k,l])=>`<button role="tab" aria-selected="${tab===k}" data-t="${k}">${l}</button>`).join('');
  $('#tabs').querySelectorAll('button').forEach(b=>b.onclick=()=>{sfx(660,.05);go(b.dataset.t)});
}
function go(t){
  tab=t||tab;
  if(tab!=='shop'&&window.KuronekoShop3D)window.KuronekoShop3D.hide();
  ['shop','jobs','bench','pc'].forEach(k=>$('#st-'+k).hidden=(k!==tab));
  renderHud();renderTabs();
  ({shop:renderShop,jobs:renderJobs,bench:renderBench,pc:renderPC})[tab]();
}
function handleShopInteraction(action){
  if(!S)return;
  if(action==='customer'){
    if(cur){toast('Beende zuerst das aktuelle Gespräch.');return}
    if(curItem()){sfx(520,.1);startItem()}else toast('Im Moment wartet niemand im Laden.');
    return;
  }
  if(action==='bench'){
    const job=S.jobs.find(j=>j.stage!=='done');
    if(job){S.bench=job.id;tool='hand';hintTxt='Nimm das Gerät zuerst in die Hand.';sfx(620,.07);go('bench')}
    else{go('jobs');toast('Wähle zuerst einen Reparaturauftrag.')}
    return;
  }
  if(action==='computer'){pcTab='shop';sfx(600,.05);go('pc');return}
  if(action==='jobs'){sfx(560,.05);go('jobs');return}
  if(action==='exit'){
    if(cur||curItem()){toast('Beende erst den Kundenbesuch, bevor du den Laden schließt.');return}
    endDayDialog();return;
  }
}
window.addEventListener('kuroneko-shop-interact',e=>handleShopInteraction(e.detail&&e.detail.action));

function confirmBox(msg,yes){
  $('#ovbox').innerHTML=`<h2>Bist du sicher?</h2><p>${msg}</p><div class="row"><button class="btn pink" id="cy">Ja</button><button class="btn alt" id="cn">Abbrechen</button></div>`;
  $('#ov').hidden=false;$('#cy').onclick=()=>{$('#ov').hidden=true;yes()};$('#cn').onclick=()=>$('#ov').hidden=true;
}
/* --- Kunden-Avatar --- */
function avatar(name){
  let h=0;for(const ch of name)h=(h*31+ch.charCodeAt(0))>>>0;
  const hair=['#1a1a1a','#4a2c1a','#7a3b1e','#c8b88a','#2c3e63'][h%5],shirt=['#ff6b9a','#7fe0c8','#ffe27a','#8d8fb8','#e0793a'][(h>>3)%5],skin=['#f6d3b3','#e8b98f','#d99d73'][(h>>5)%3];
  return `<svg viewBox="0 0 110 150" aria-hidden="true"><rect x="22" y="78" width="66" height="72" rx="14" fill="${shirt}"/><circle cx="55" cy="48" r="28" fill="${skin}"/><path d="M26 46 Q28 16 55 17 Q84 16 84 46 Q70 30 55 32 Q40 30 26 46Z" fill="${hair}"/><circle cx="45" cy="52" r="3" fill="#222"/><circle cx="65" cy="52" r="3" fill="#222"/><path d="M47 64 Q55 70 63 64" stroke="#a33" stroke-width="2.5" fill="none" stroke-linecap="round"/></svg>`;
}
/* --- Laden --- */
function curItem(){return S.queue[S.qi]}
function renderShop(){
  const el=$('#st-shop'),it=curItem(),isBusy=!!cur;
  const name=it?(it.type==='event'?NODES[it.node].w:it.type==='new'?it.c.name:jobOf(it.jid).name):'';
  const world=`<div class="shop-world-shell">
    <div class="shop-world-topbar">
      <div class="shop-world-brand"><span class="shop-world-mark">K</span><div><strong>KURONEKO REPAIR</strong><small>Electronic Service · Tokyo 2005</small></div></div>
      <div class="shop-world-stats"><span>TAG <b>${S.day}</b></span><span>KASSE <b>${yen(S.money)}</b></span><span>RUF <b>${S.rep}</b></span></div>
    </div>
    <div class="shop-world" id="shop-world">
      <div class="shop-world-loading"><span>黒猫修理</span><small>Reparaturladen wird vorbereitet …</small></div>
      <div class="shop-world-title"><b>Kuroneko Electronics</b><span>${it?(isBusy?'KUNDENGESPRÄCH':'KUNDE WARTET'):'SHOP · FREIE ZEIT'}</span></div>
      <div class="shop-crosshair" aria-hidden="true"></div>
      <div class="shop-world-prompt"><span>E</span><strong>Interagieren</strong></div>
      <div class="shop-world-controls"><span><b>W A S D</b> Bewegen</span><span><b>Maus</b> Umschauen</span><span><b>E</b> Interagieren</span></div>
      <div class="shop-world-mobile">
        <button type="button" data-move="w" aria-label="Vorwärts">▲</button>
        <div><button type="button" data-move="a" aria-label="Links">◀</button><button type="button" data-move="s" aria-label="Rückwärts">▼</button><button type="button" data-move="d" aria-label="Rechts">▶</button></div>
      </div>
      <div class="shop-world-actionbar">
        <button type="button" data-world-action="customer"><span>♙</span>Kunde</button>
        <button type="button" data-world-action="bench"><span>⚒</span>Werkbank</button>
        <button type="button" data-world-action="computer"><span>▣</span>PC</button>
        <button type="button" data-world-action="jobs"><span>▤</span>Aufträge</button>
        <button type="button" data-world-action="exit"><span>↗</span>Feierabend</button>
      </div>
      <div id="dlg" class="world-dialog"></div>
    </div>
    <div class="shop-world-foot"><span>${it?(isBusy?'Das Gespräch läuft. Wähle eine Antwort im Dialog.':name+' ist angekommen. Gehe zum Tresen oder nutze „Kunde“.'):'Der Laden ist ruhig. Arbeite an Aufträgen, bestelle Ersatzteile oder beende den Tag.'}</span><span>3D · FIRST PERSON · SINGLE PLAYER</span></div>
  </div>`;
  let body='';
  if(S.phase==='end'){body=''}
  else if(!it){
    body=`<div class="card shop-day-card"><p>Keine Kunden mehr heute. Repariere offene Geräte, bestelle Teile am PC und schließe den Laden, wenn du fertig bist.</p><button class="btn pink" id="endday">Laden schließen (Tag ${S.day} beenden)</button></div>`;
  }else if(!cur){
    const left=S.queue.length-S.qi;
    body=`<div class="card shop-day-card"><p class="muted">${left} Kund(innen) warten. ${it.type==='pickup'?'Ein Kunde möchte ein repariertes Gerät abholen.':it.type==='wait'?'Ein Kunde fragt nach seinem Gerät.':'Eine neue Reparaturanfrage ist eingetroffen.'}</p><button class="btn" id="greet">Kunden begrüßen</button></div>`;
  }
  el.innerHTML=world+body;
  if($('#greet'))$('#greet').onclick=()=>{sfx(520,.1);startItem()};
  if($('#endday'))$('#endday').onclick=()=>{sfx(330,.15);endDayDialog()};
  if(window.KuronekoShop3D){
    const ok=window.KuronekoShop3D.mount($('#shop-world'),{hasCustomer:!!it,customerName:name,day:S.day,money:S.money,rep:S.rep});
    const loading=$('.shop-world-loading');if(loading)loading.remove();
    if(!ok&&!$('#shop-world .shop-world-fallback'))$('#shop-world').insertAdjacentHTML('afterbegin','<div class="shop-world-fallback"><b>Kuroneko Repair</b><p>3D ist in diesem Browser nicht verfügbar. Nutze die Schnellaktionen rechts.</p></div>');
  }
  if(cur)drawDlg();
  el.querySelectorAll('[data-world-action]').forEach(b=>b.addEventListener('click',()=>handleShopInteraction(b.dataset.worldAction)));
}

function startItem(){
  const it=curItem();if(!it)return;
  if(it.type==='new')cur={node:it.c.intro,item:it};
  else if(it.type==='event')cur={node:it.node,item:it};
  else if(it.type==='pickup'){const j=jobOf(it.jid);const pn=j.pick&&NODES[j.pick]?j.pick:null;cur={node:pn,item:it,job:j};if(!pn){finishPickup();return}}
  else if(it.type==='wait'){const j=jobOf(it.jid);NODES['w'+j.id]={w:j.name,t:'Ist mein '+DEV[j.dev].name+' schon fertig? Ich warte schon länger...',c:[{l:'Noch nicht, tut mir leid. Morgen bestimmt.',n:null,fx:{rep:-3}}]};cur={node:'w'+j.id,item:it,job:j}}
  renderShop();
}
function drawDlg(){
  const n=NODES[cur.node],box=$('#dlg');
  box.innerHTML=`<div class="dialog"><div class="who">${n.w}</div><p>${n.t}</p><div class="choices">${n.c.map((c,i)=>`<button class="btn alt" data-i="${i}">${c.l}</button>`).join('')}</div></div>`;
  box.querySelectorAll('button').forEach(b=>b.onclick=()=>choose(+b.dataset.i));
}
function choose(i){
  sfx(700,.06);
  const n=NODES[cur.node],c=n.c[i],it=cur.item;
  let job=cur.job;
  if(c.acc){job=createJob(it.c);}
  applyFx(c.fx,job);
  if(c.n){cur.node=c.n;if(c.acc){cur.job=job}drawDlg();renderHud();return}
  if(c.acc){renderHud();showQuote(job);return}
  if(c.decline){nextCustomer();return}
  if(it.type==='pickup'){finishPickup();return}
  nextCustomer();
}
function createJob(c){
  const j={id:S.nid++,name:c.name,dev:c.dev,faults:c.faults.slice(),fee:DEV[c.dev].fee+Math.round((c.faults.length-1)*1500),accDay:S.day,stage:'new',st:null,pick:c.pick,story:c.id,online:false,q:0,done:false};
  if(S.pendDisc){j.fee=Math.round(j.fee*.5/100)*100;S.pendDisc=0}
  S.jobs.push(j);return j;
}
function showQuote(job){
  const base=job.fee;
  cur.quote=true;
  $('#dlg').innerHTML=`<div class="dialog"><div class="who">Kassenzettel: ${DEV[job.dev].name}</div><p>Symptom: ${job.faults.map(f=>SYMPTOM[f]).join(', ')}.<br>Wie viel verlangst du für die Reparatur?</p><div class="choices"><button class="btn alt" data-m=".8">Günstig ${yen(base*.8)} (Ruf +1)</button><button class="btn alt" data-m="1">Fair ${yen(base)}</button><button class="btn alt" data-m="1.3">Teuer ${yen(base*1.3)} (Ruf -2, Kunde könnte meckern)</button></div></div>`;
  $('#dlg').querySelectorAll('button').forEach(b=>b.onclick=()=>{
    const m=+b.dataset.m;job.fee=Math.round(base*m/100)*100;
    if(m<1)applyFx({rep:1});if(m>1)applyFx({rep:-2});
    sfx(880,.12);toast('Gerät angenommen: '+DEV[job.dev].name);nextCustomer();});
}
function nextCustomer(){S.qi++;cur=null;save();renderHud();renderTabs();renderShop()}
function finishPickup(){
  const j=cur.job,it=cur.item;
  const q=j.q||0;
  const pay=Math.round(j.fee*(0.75+0.25*q)/100)*100;
  S.money+=pay;S.stats.earned+=pay;S.stats.done++;
  let rep=q>.85?2:q<.5?-2:0;applyFx({rep});
  S.jobs=S.jobs.filter(x=>x.id!==j.id);
  sfx(990,.2,'triangle');
  S.qi++;cur=null;save();renderHud();renderTabs();
  $('#st-shop').innerHTML=`<div class="card"><h2>Abholung</h2><p>${j.name} zahlt <b class="lemon">${yen(pay)}</b>. Sauberkeit: ${Math.round(q*100)}%.</p><button class="btn" id="okp">Weiter</button></div>`;
  $('#okp').onclick=()=>renderShop();
}
/* --- Auftragsliste --- */
function renderJobs(){
  const el=$('#st-jobs');
  const inv=Object.entries(S.inv).filter(([k,n])=>n>0).map(([k,n])=>{const [t,p]=k.split(':');return `<span class="tag">${n}× ${DEV[t].name.split(' ')[0]} ${(DEV[t].parts.find(x=>x.id===p)||{label:p}).label}</span>`}).join('')||'<span class="muted">leer, bestelle Teile am PC</span>';
  el.innerHTML=`<h2>Aufträge</h2><div class="jobs">${S.jobs.map(j=>{const d=DEV[j.dev];const need=j.faults.map(f=>`${(d.parts.find(p=>p.id===f)||{label:f}).label}${(S.inv[partKey(j.dev,f)]>0||(j.st&&j.st.have&&j.st.have[f]))?' (da)':''}`).join(', ');
    return `<div class="card"><h3>${j.name}: ${d.name}</h3><div class="muted">Symptom: ${j.faults.map(f=>SYMPTOM[f]||'Unbekannter Fehler').join(', ')}</div><div>Ersatzteile: ${need}</div><div>Lohn: <b class="lemon">${yen(j.fee)}</b> ${j.online?'<span class="tag">Online</span>':''}</div><div class="bar"><i style="width:${j.stage==='done'?100:j.stage==='work'?50:0}%"></i></div><p style="margin:6px 0 0;display:flex;gap:6px;flex-wrap:wrap">${j.stage==='done'?`<span class="tag">fertig</span><button class="btn pink" data-use="${j.id}">Gerät ausprobieren</button><span class="muted">Noch nicht zurückgegeben</span>`:`<button class="btn" data-j="${j.id}">An die Werkbank</button>`}</p></div>`}).join('')||'<p class="muted">Keine offenen Aufträge.</p>'}</div><h3 style="margin-top:14px">Lager</h3><div>${inv}</div>`;
  el.querySelectorAll('[data-j]').forEach(b=>b.onclick=()=>{S.bench=+b.dataset.j;sfx(600,.06);go('bench')});
  el.querySelectorAll('[data-use]').forEach(b=>b.onclick=()=>openDeviceDemo(+b.dataset.use));
}
/* --- Reparierte Geräte ausprobieren: erst bei Abholung/Versand verschwinden sie. --- */
function openDeviceDemo(id){
  const j=jobOf(id);if(!j||j.stage!=='done'){toast('Das Gerät ist noch nicht fertig.');return}
  const d=DEV[j.dev];j.uses=j.uses||0;j.uses++;
  const demos={
    handheld:`<div class="demo-screen"><div id="demo-status">Pocket-Spiel: Finde das leuchtende Pixel!</div><div class="demo-grid" id="pixel-grid">${Array.from({length:9},(_,i)=>`<button data-cell="${i}">·</button>`).join('')}</div><div>Punkte: <b id="pixel-score">0</b></div></div>`,
    console:`<div class="demo-screen"><div id="demo-status">FAMIKO SYSTEM · Speicherkarte erkannt</div><p>Starte einen kleinen Reaktionstest mit dem Controller.</p><button class="btn" id="demo-console">Spiel starten</button><b id="demo-score">Bereit</b></div>`,
    phone:`<div class="demo-screen"><div id="demo-status">NOKIRA PHONE · Empfang: 4 Balken</div><p id="phone-number">Wähle eine Kurzwahl.</p><div class="demo-controls">${['Yuki','Werkstatt','Mei'].map((n,i)=>`<button class="btn alt" data-call="${n}">${n}</button>`).join('')}</div></div>`,
    mp3:`<div class="demo-screen"><div id="demo-status">WALKABOUT PLAYER · Track 01</div><p>Originaler Testton – kein Musikstück aus einem bestehenden Spiel.</p><button class="btn" id="demo-music">▶ Wiedergabe</button><span id="music-state">Pausiert</span></div>`,
    camera:`<div class="demo-screen"><div id="photo-preview" style="height:110px;border:2px solid #7a8490;background:linear-gradient(145deg,#253a4d,#779b9b);display:grid;place-items:center;font-size:30px">◈</div><p id="photo-count">0 Fotos aufgenommen</p><button class="btn" id="demo-photo">Foto aufnehmen</button></div>`,
    radio:`<div class="demo-screen"><div id="demo-status">TANAKA RADIO ·  FM 88.0</div><input id="radio-tune" type="range" min="880" max="1080" value="880" style="width:100%"><p id="radio-label">88.0 MHz · Kuroneko Testkanal</p><button class="btn" id="demo-radio">Sender anspielen</button></div>`,
    watch:`<div class="demo-screen"><div id="watch-clock">10:08</div><p>Schritte heute: 00428 · Akku 100%</p><button class="btn" id="watch-face">Zifferblatt wechseln</button></div>`,
    gamepad:`<div class="demo-screen"><div id="demo-status">NEKO PAD · Eingabetest</div><p>Drücke die Tasten, um die Eingabe zu prüfen.</p><div class="demo-controls">${['A','B','X','Y','L','R'].map(v=>`<button class="btn alt" data-pad="${v}">${v}</button>`).join('')}</div><b id="pad-status">Warte auf Eingabe …</b></div>`,
    laptop:`<div class="demo-screen"><div id="demo-status">MORIBOOK · Systemdiagnose erfolgreich</div><p>Alle Geräte wurden erkannt. Öffne das Testprogramm.</p><button class="btn" id="laptop-test">Test starten</button><b id="laptop-result">Bereit</b></div>`,
    tablet:`<div class="demo-screen"><div id="demo-status">KUMO TAB · Touchtest</div><p>Tippe auf die Kreise, um den Touchscreen zu testen.</p><div class="demo-controls">${[1,2,3,4].map(v=>`<button class="btn alt" data-touch="${v}">●</button>`).join('')}</div><b id="touch-status">Touch bereit</b></div>`,
    earbuds:`<div class="demo-screen"><div id="demo-status">MIMI AUDIO · Links/Rechts verbunden</div><button class="btn" id="buds-test">Klangtest</button><span id="buds-result">Bereit</span></div>`,
    speaker:`<div class="demo-screen"><div id="demo-status">HOSHI SPEAKER · Bluetooth verbunden</div><button class="btn" id="speaker-test">Testton abspielen</button><span id="speaker-result">Bereit</span></div>`,
    camcorder:`<div class="demo-screen"><div id="demo-status">MIKAN HANDYCAM · REC</div><div style="height:90px;background:linear-gradient(135deg,#25364d,#a0b4a2);border:2px solid #aab4c3"></div><button class="btn" id="video-test">Aufnahme testen</button><span id="video-result">Standby</span></div>`
  };
  const body=demos[j.dev]||`<div class="demo-screen"><div id="demo-status">${d.name} · Selbsttest erfolgreich</div><p>Das reparierte Gerät funktioniert wieder.</p><button class="btn" id="generic-test">Selbsttest durchführen</button><b id="generic-result">Bereit</b></div>`;
  $('#ovbox').innerHTML=`<h2>${d.name} ausprobieren</h2><p>${j.name} hat das Gerät noch nicht abgeholt. Du kannst es jetzt selbst benutzen.</p><div class="demo-shell">${body}</div><p class="muted">Nutzungen vor der Rückgabe: ${j.uses}</p><button class="btn alt" id="close-demo">Zurück zur Auftragsliste</button>`;
  $('#ov').hidden=false;
  const done=()=>{save();};
  $('#close-demo').onclick=()=>{$('#ov').hidden=true;save();renderJobs()};
  const score=$('#pixel-score');if(score){let points=0,target=Math.floor(Math.random()*9);const cells=$$('#pixel-grid button');const update=()=>cells.forEach((b,i)=>{b.classList.toggle('target',i===target);b.textContent=i===target?'✦':'·'});update();cells.forEach(b=>b.onclick=()=>{if(+b.dataset.cell===target){points++;score.textContent=points;sfx(900,.06,'triangle');target=Math.floor(Math.random()*9);update()}else{sfx(180,.07);$('#demo-status').textContent='Daneben! Versuche es erneut.'}})}
  if($('#demo-console'))$('#demo-console').onclick=()=>{$('#demo-score').textContent='Punktestand: '+(1+Math.floor(Math.random()*9));$('#demo-status').textContent='Pixel-Spiel läuft!';sfx(740,.1,'square')};
  $('#ovbox').querySelectorAll('[data-call]').forEach(b=>b.onclick=()=>{$('#phone-number').textContent='Anruf bei '+b.dataset.call+' … Verbindung hergestellt.';sfx(650,.1,'sine')});
  if($('#demo-music'))$('#demo-music').onclick=()=>{const playing=$('#demo-music').dataset.playing!=='1';$('#demo-music').dataset.playing=playing?'1':'0';$('#demo-music').textContent=playing?'Ⅱ Pause':'▶ Wiedergabe';$('#music-state').textContent=playing?'Testton läuft':'Pausiert';sfx(playing?523:220,.25,'sine',.025)};
  if($('#demo-photo'))$('#demo-photo').onclick=()=>{const n=1+Number($('#photo-count').dataset.count||0);$('#photo-count').dataset.count=n;$('#photo-count').textContent=n+' Fotos aufgenommen';$('#photo-preview').textContent='📷';$('#photo-preview').style.background=`linear-gradient(${n*35}deg,#263d54,#8bb5a5,#d4a477)`;sfx(1100,.06,'triangle')};
  if($('#radio-tune'))$('#radio-tune').oninput=e=>{$('#radio-label').textContent=(e.target.value/10).toFixed(1)+' MHz · '+(e.target.value<950?'Kuroneko Pop':'Akiba Stereo')};
  if($('#demo-radio'))$('#demo-radio').onclick=()=>sfx(330+Number($('#radio-tune').value),.22,'sine',.025);
  if($('#watch-face'))$('#watch-face').onclick=()=>{$('#watch-clock').textContent=['10:08','21:45','07:30'][Math.floor(Math.random()*3)];sfx(800,.06)};
  $('#ovbox').querySelectorAll('[data-pad]').forEach(b=>b.onclick=()=>{$('#pad-status').textContent='Taste '+b.dataset.pad+' erkannt ✓';sfx(600,.05)});
  if($('#laptop-test'))$('#laptop-test').onclick=()=>{$('#laptop-result').textContent='CPU ✓ · RAM ✓ · Display ✓';sfx(950,.12,'triangle')};
  $('#ovbox').querySelectorAll('[data-touch]').forEach(b=>b.onclick=()=>{$('#touch-status').textContent='Touchpunkt '+b.dataset.touch+' erkannt ✓';sfx(700,.045)});
  for(const id2 of ['buds-test','speaker-test','video-test','generic-test'])if($('#'+id2))$('#'+id2).onclick=()=>{const target=$('#'+id2.replace('-test','-result'))||$('#generic-result');if(target)target.textContent='Test erfolgreich ✓';sfx(id2==='video-test'?850:520,.12,'triangle')};
  done();
}
const $$=s=>Array.from(document.querySelectorAll(s));

/* --- Tagesende --- */
function endDayDialog(){
  const pend=S.queue.length-S.qi;
  const online=S.jobs.filter(j=>j.online&&j.stage==='done');
  const onPay=online.reduce((a,j)=>a+j.fee,0);
  $('#ovbox').innerHTML=`<h2>Feierabend, Tag ${S.day}</h2><p>Miete & Strom: <b>${yen(S.rent)}</b>${onPay?`<br>Online-Aufträge verschickt: <b class="lemon">+${yen(onPay)}</b>`:''}</p><p class="muted">Offene Aufträge: ${S.jobs.filter(j=>j.stage!=='done'&&!j.online).length}</p><div class="row"><button class="btn pink" id="ed">Tag beenden</button><button class="btn alt" id="ec">Noch nicht</button></div>`;
  $('#ov').hidden=false;$('#ec').onclick=()=>$('#ov').hidden=true;
  $('#ed').onclick=()=>{$('#ov').hidden=true;endDay(onPay)};
}
function endDay(onPay){
  S.money+=onPay;S.stats.earned+=onPay;S.stats.done+=S.jobs.filter(j=>j.online&&j.stage==='done').length;
  S.jobs=S.jobs.filter(j=>!(j.online&&j.stage==='done'));
  S.mail.forEach(m=>{if(m.state==='open'&&m.day<=S.day-1)m.state='expired'});
  S.money-=S.rent;
  if(S.money<0){return ending('closed')}
  if(S.flags.sold){return ending('sold')}
  if(S.day>=MAXDAY){return ending(null)}
  S.day++;startDay();save();sfx(300,.2);go('shop');toast('Neuer Tag: '+S.day);
}
function ending(force){
  let id=force;const f=S.flags,r=S.rep,m=S.money;
  if(!id){
    if(f.blackmail&&f.threat)id='dark';
    else if(f.police&&f.justice&&r>=60)id='justice';
    else if(m>=40000&&r>=70)id='boom';
    else if(f.mori_kind&&f.love&&r>=55)id='heart';
    else id='calm';
  }
  const E={
   closed:['Die Rolläden bleiben unten','Die Kasse ist leer, die Miete nicht bezahlt. Du schließt Kuroneko Repair. Irgendwo in Akihabara wird bald ein neues Schild hängen.'],
   sold:['Neue Wege','Du hast den Laden an Herrn Sato verkauft. Mit dem Geld ziehst du nach Osaka und fängst von vorn an. Die Werkzeuge nimmst du mit.'],
   dark:['Schatten über Akiba','Der Chip hat dich reich gemacht, aber Kenji lässt dich nicht in Ruhe. Du hörst nachts Schritte vor dem Laden. Manche Reparaturen lassen sich nicht rückgängig machen.'],
   justice:['Der ehrliche Händler','Dein Mut hat der Stadt geholfen. Die Polizei grüßt dich auf der Straße und die Kunden stehen Schlange vor dem Laden.'],
   boom:['Kuroneko wächst','Kasse voll, Ruf makellos. Du stellst zwei Lehrlinge ein und eröffnest bald eine zweite Filiale in Shibuya.'],
   heart:['Ein Laden mit Herz','Herr Mori kommt jeden Sonntag auf einen Tee, Yuki und Haruka helfen beim Aufräumen. Der Laden ist klein, aber warm.'],
   calm:['Ruhiger Alltag','Eine Woche ist vorbei. Nicht jedes Gerät wurde gerettet, aber du hast deinen Platz in der Nachbarschaft gefunden. Morgen öffnet der Laden wieder.']
  }[id];
  S.phase='end';save();
  $('#ovbox').innerHTML=`<h2>${E[0]}</h2><p>${E[1]}</p><p class="muted">Repariert: ${S.stats.done} Geräte · Verdient: ${yen(S.stats.earned)} · Kasse: ${yen(S.money)} · Ruf: ${S.rep}<br>Es gibt 7 Enden. Spiele neu und entscheide anders.</p><button class="btn pink" id="again">Neues Spiel</button>`;
  $('#ov').hidden=false;$('#again').onclick=()=>{$('#ov').hidden=true;newGame();save();go('shop')};
}
/* ===== WERKBANK ===== */
let tool='hand',hintTxt='';
function benchJob(){return S.jobs.find(j=>j.id===S.bench&&j.stage!=='done')}
function initBench(j){
  const d=DEV[j.dev];
  j.stage='work';
  const dirt=[];let seed=j.id*7+3;const rr=()=>{seed=(seed*9301+49297)%233280;return seed/233280};
  for(let i=0;i<14;i++)dirt.push({x:50+rr()*300,y:45+rr()*210,r:9+rr()*11,a:.55+rr()*.4,hard:rr()<.35});
  const parts={};d.parts.forEach(p=>parts[p.id]=j.faults.includes(p.id)?'broken':'ok');
  j.st={screws:d.screws,sOut:0,screwOut:Array(d.screws).fill(false),cover:true,coverOff:false,flipped:false,closing:false,parts,dirt,tested:false,checked:{},have:{},mistakes:[],micro:makeMicroBoard(j,d),ph:'front'};
}
function renderBench(){
  const el=$('#st-bench'),j=benchJob();
  if(!j){el.innerHTML=`<div class="card"><h2>Werkbank</h2><p class="muted">Wähle bei den Aufträgen ein Gerät aus.</p><button class="btn" id="tojobs">Zu den Aufträgen</button></div>`;$('#tojobs').onclick=()=>go('jobs');return}
  if(!j.st)initBench(j);
  const st=j.st,d=DEV[j.dev];
  if(st.flipped===undefined)st.flipped=false;
  if(!st.mistakes)st.mistakes=[];
  if(!st.closing)st.closing=false;
  if(!Array.isArray(st.screwOut))st.screwOut=Array.from({length:d.screws},(_,i)=>i<(st.sOut||0));
  if(!Array.isArray(st.micro))st.micro=makeMicroBoard(j,d);
  const microIssues=st.micro.some(m=>m.state==='broken'||m.state==='removed'||m.state==='installing'||(m.pinOut||[]).some(Boolean));
  const identified=st.micro.filter(m=>m.identified);
  const chipLogHtml=identified.length?identified.map(m=>{const info=microInfo(m.type),bad=m.state==='broken'||m.state==='removed';return `<span class="${bad?'bad':''}">${m.ref}: ${info.label} · ${m.state==='broken'?'DEFEKT':m.state==='removed'?'fehlt':m.state==='new'?'ersetzt':m.state==='installing'?'wird verlötet':'OK'}</span>`}).join(''):'<span>Noch keine ICs getestet. Wähle den Chip-Tester und klicke auf U01–U18.</span>';
  const allScrewsOut=st.screwOut.length===d.screws&&st.screwOut.every(Boolean);
  const allScrewsIn=st.screwOut.every(v=>!v);
  const dirtLeft=st.dirt.reduce((a,x)=>a+x.a,0),dirtMax=st.dirt.length*.75;
  const clean=Math.max(0,1-dirtLeft/dirtMax);
  const steps=[
    ['Gerät umdrehen',st.flipped||st.coverOff||st.tested],
    ['Schrauben lösen',allScrewsOut||st.coverOff||st.closing],
    ['Rückseite öffnen',st.coverOff||st.closing||st.tested],
    ['Platine ausbauen',st.boardOut],
    ['Prüfen & reinigen',st.coverOff&&clean>.8],
    ['Teile reparieren',st.coverOff&&!Object.values(st.parts).includes('broken')&&!Object.values(st.parts).includes('removed')&&!microIssues],
    ['Mikrochips prüfen',!microIssues],
    ['Deckel & Schrauben',st.closing&&allScrewsIn],
    ['Funktionstest',st.tested]
  ];
  const stepsHtml=`<div class="prog">${steps.map(s=>`<span class="${s[1]?'on':''}">${s[0]}</span>`).join('')}</div>`;
  const side=st.coverOff?'Innenleben':st.flipped?'Rückseite':'Vorderseite';
  const screwsDone=st.screwOut.filter(Boolean).length;
  let todoTitle='Front Panel',todoAction='Remove dust',todoValue=Math.round(clean*100),todoMeta='Staub und Schmutz von der Geräteoberseite entfernen';
  if(st.flipped&&!st.coverOff){todoTitle='Back Panel';todoAction='Remove screws';todoValue=Math.round(screwsDone/Math.max(1,d.screws)*100);todoMeta=screwsDone+'/'+d.screws+' Schrauben in der Magnetschale';}
  if(st.coverOff&&!st.boardOut){todoTitle='Internal Assembly';todoAction='Remove motherboard';todoValue=0;todoMeta='Clips lösen und die Platine vorsichtig anheben';}
  if(st.boardOut){todoTitle='Motherboard';todoAction='Identify & resolder';todoValue=Math.round(identified.length/Math.max(1,st.micro.length)*100);todoMeta=identified.length+'/'+st.micro.length+' ICs mit dem CT-08 getestet';}
  if(st.closing){todoTitle='Reassembly';todoAction='Secure the case';todoValue=Math.round((d.screws-screwsDone)/Math.max(1,d.screws)*100);todoMeta=(d.screws-screwsDone)+'/'+d.screws+' Schrauben eingesetzt';}
  const stageWidth=st.boardOut?800:(d.portrait?330:460);
  const stageRatio=st.boardOut?'4 / 3':d.portrait?'3 / 4':'4 / 3';
  const todoMarkup=`<aside class="repair-note" aria-label="Reparaturaufgaben"><div class="note-rings"></div><div class="note-heading">To-do list:</div><div class="note-device">${todoTitle}</div><div class="note-task">1) ${todoAction}: ${todoValue}%</div><div class="note-progress"><span style="width:${todoValue}%"></span></div><div class="note-meta">${todoMeta}</div><div class="note-rule"></div><div class="note-check">${st.tested?'✓ Funktionstest abgeschlossen':'○ Reparatur in Arbeit'}</div></aside>`;
  el.innerHTML=`<div class="row" style="align-items:center;justify-content:space-between"><div><h2>${d.name} (${j.name})</h2><span class="tag">${side}</span><span class="tag">Schraubenkopf: ${d.bit}</span></div><div><button class="btn alt" id="bq">Anderes Gerät</button></div></div>${stepsHtml}
  <div class="bench"><div class="tools" id="tools">${TOOLS.map(t=>`<button data-t="${t.id}" aria-pressed="${tool===t.id}"><span class="tool-icon">${t.icon}</span><span>${t.name}<small>${t.sub}</small></span></button>`).join('')}</div>
  <div class="workstation"><div class="bench-gear"><span class="work-lamp"><i></i> LED-LUPENLAMPE</span><span class="esd-chip">⏚ ESD-SCHUTZMATTE</span><span class="bench-clock">PRECISION REPAIR · 2005</span></div>
  <div class="table" id="tbl">
    <div class="bench-props" aria-hidden="true">
      <div class="prop-tray"><span>🔩</span><span>▰</span><span>◉</span><span>⌁</span><b>PARTS TRAY</b></div>
      <div class="prop-mouse"><i></i></div>
      <div class="prop-cup"><i></i><i></i><i></i><i></i><b></b></div>
      <div class="prop-paper"><span>REPAIR NOTES</span><i></i><i></i></div>
      <div class="prop-driver"></div>
    </div>
    <div class="device3d-stage" id="device3d-stage" style="width:min(100%,${stageWidth}px);aspect-ratio:${stageRatio}"><div class="device3d-canvas" id="device3d-canvas"></div><div class="device-hit-layer" id="device-hit-layer">${deviceSvg(j,clean)}</div></div>
    ${todoMarkup}
  </div>
  <div class="bench-drawer"><div class="bench-well"><b>Magnetschale</b><span class="screws">● ● ● ●</span></div><div class="bench-well"><b>Bauteilablage</b><span>▰ ▪ ▰ ▪</span></div><div class="bench-well"><b>Reiniger</b><span class="chemical">IPA · Mikrofasertuch</span></div><div class="bench-well"><b>IC-Teststation · CT-08</b><span>🔬 U01–U18 einzeln prüfen</span></div></div>
  <div class="chip-log"><b>Chip-Testprotokoll · ${identified.length}/${st.micro.length} erkannt</b><div class="chip-log-list">${chipLogHtml}</div></div><div class="hint" id="hint">${hintTxt||'Nimm das Gerät zuerst in die Hand und drehe es um.'}</div><div class="row" id="acts"></div></div></div>`;
  $('#bq').onclick=()=>go('jobs');
  $('#tools').querySelectorAll('button').forEach(b=>b.onclick=()=>{tool=b.dataset.t;sfx(500,.04);renderBench()});
  wireBench(j,clean);
  if(window.Kuroneko3D)window.Kuroneko3D.mount(j);
}
function wireBench(j,clean){
  const st=j.st,d=DEV[j.dev],tbl=$('#tbl'),acts=$('#acts');
  const microIssues=(st.micro||[]).some(m=>m.state==='broken'||m.state==='removed'||m.state==='installing'||(m.pinOut||[]).some(Boolean));
  const allScrewsOut=Array.isArray(st.screwOut)&&st.screwOut.length===d.screws&&st.screwOut.every(Boolean);
  const allScrewsIn=Array.isArray(st.screwOut)&&st.screwOut.every(v=>!v);
  const say=t=>{hintTxt=t;const h=$('#hint');if(h)h.textContent=t};
  const redraw=()=>{tbl.style.pointerEvents='none';setTimeout(()=>{if(tbl.isConnected){tbl.style.pointerEvents='';renderBench()}},520)};
  const animate=(target)=>{
    const cl='tool-'+tool;tbl.classList.remove('tool-driver','tool-tweezers','tool-brush','tool-cloth','tool-meter','tool-chiptest','tool-solder','tool-hand');
    void tbl.offsetWidth;tbl.classList.add(cl);animateToolAction(target);
    if(target){target.classList.add('tool-hit');setTimeout(()=>target.classList.remove('tool-hit'),550)}
    setTimeout(()=>tbl.classList.remove(cl),600);
  };
  let b='';
  if(!st.flipped&&!st.coverOff&&!st.tested)b+=`<button class="btn pink" id="a_flipback">Gerät umdrehen</button>`;
  if(st.flipped&&!st.coverOff&&!st.closing&&allScrewsOut)b+=`<button class="btn" id="a_off">Rückdeckel abnehmen</button>`;
  if(st.coverOff&&!Object.values(st.parts).includes('broken')&&!Object.values(st.parts).includes('removed')&&!microIssues&&!st.closing)b+=`<button class="btn" id="a_on">Rückdeckel aufsetzen</button>`;
  if(st.flipped&&!st.coverOff&&st.closing&&allScrewsIn)b+=`<button class="btn pink" id="a_flipfront">Gerät zurückdrehen</button>`;
  if(!st.flipped&&!st.coverOff&&st.closing&&allScrewsIn)b+=`<button class="btn pink" id="a_test">Einschalten & Funktionstest</button>`;
  acts.innerHTML=b;
  if($('#a_flipback'))$('#a_flipback').onclick=()=>{
    if(tool!=='hand'){say('Nimm das Gerät mit der Hand und drehe es um.');return}
    animate();st.flipped=true;st.ph='back';sfx(260,.16,'triangle');say('Rückseite liegt oben. Jetzt kannst du die Schrauben lösen.');redraw();
  };
  if($('#a_off'))$('#a_off').onclick=()=>{if(tool!=='hand'){say('Zum Abnehmen des Rückdeckels brauchst du deine Hand.');return}animate();st.coverOff=true;st.ph='inside';sfx(260,.12);say('Rückdeckel vorsichtig abgenommen. Jetzt siehst du die Platine und alle Bauteile.');redraw()};
  if($('#a_on'))$('#a_on').onclick=()=>{
    if(tool!=='hand'){say('Setze den Rückdeckel mit der Hand auf.');return}
    if(clean<.6&&!st.warned){st.warned=1;say('Das Innere ist noch ziemlich schmutzig. Der Kunde zahlt später weniger. Drücke erneut, um trotzdem fortzufahren.');return}
    animate();st.coverOff=false;st.closing=true;st.screwOut=Array(d.screws).fill(true);st.sOut=d.screws;st.ph='closing';sfx(300,.1);say('Deckel sitzt. Drehe die Schrauben jetzt einzeln wieder hinein.');redraw();
  };
  if($('#a_flipfront'))$('#a_flipfront').onclick=()=>{
    if(tool!=='hand'){say('Nimm das Gerät mit der Hand und drehe es auf die Vorderseite.');return}
    animate();st.flipped=false;st.ph='front';sfx(520,.13,'triangle');say('Vorderseite oben. Jetzt kannst du das Gerät einschalten und testen.');redraw();
  };
  if($('#a_test'))$('#a_test').onclick=()=>{if(tool!=='hand'){say('Zum Einschalten brauchst du deine Hand.');return}animate();tbl.style.pointerEvents='none';setTimeout(()=>{if(tbl.isConnected)testDevice(j,clean)},420)};
  // Schrauben: Werkzeug und Rückseite müssen stimmen, die Reihenfolge ist bewusst vereinfacht.
  // Jede Schraube kann einzeln und in beliebiger Reihenfolge gelöst bzw. eingesetzt werden.
  tbl.querySelectorAll('.sc').forEach(g=>g.onclick=()=>{
    if(tool!=='driver'){say('Wähle links den Schraubenzieher und klicke direkt auf eine Schraube.');return}
    if(!st.flipped||st.coverOff){say('Erst umdrehen – die Schrauben sitzen auf der Rückseite.');return}
    const i=+g.dataset.i;
    if(!st.screwOut)st.screwOut=Array.from({length:d.screws},(_,k)=>k<(st.sOut||0));
    if(!st.closing){
      if(st.screwOut[i]){say('Diese Schraube ist bereits gelöst. Nimm eine andere.');return}
      st.screwOut[i]=true;st.sOut=st.screwOut.filter(Boolean).length;animate(g);sfx(850,.07);say('Schraube '+st.sOut+' von '+d.screws+' gelöst.');redraw();save();
    } else {
      if(!st.screwOut[i]){say('Diese Schraube sitzt bereits fest.');return}
      st.screwOut[i]=false;st.sOut=st.screwOut.filter(Boolean).length;animate(g);sfx(720,.07);say(st.sOut?'Noch '+st.sOut+' Schraube(n) einsetzen.':'Alle Schrauben sitzen. Drehe das Gerät jetzt auf die Vorderseite.');redraw();save();
    }
  });
  // Bauteile prüfen, auslöten oder mit Pinzette an Steckverbindern lösen.
  tbl.querySelectorAll('.pt').forEach(g=>g.onclick=()=>{
    const pid=g.dataset.p,p=d.parts.find(x=>x.id===pid),lab=p.label,stt=st.parts[pid];
    if(!st.coverOff){say('Erst das Gerät umdrehen, die Schrauben lösen und den Rückdeckel abnehmen.');return}
    if(tool==='meter'){
      if(stt==='removed'){say(lab+': Bauteil fehlt. Hier kann nichts gemessen werden.');return}
      st.checked[pid]=(stt==='broken')?'bad':'ok';animate(g);sfx(stt==='broken'?200:1200,.1);say(lab+': '+(stt==='broken'?'defekt!':'Messwert in Ordnung.'));redraw();return;
    }
    if(tool==='solder'){
      if(stt==='broken'){
        st.parts[pid]='removed';delete st.checked[pid];animate(g);sfx(150,.2,'sawtooth');say(lab+' sauber ausgelötet. Jetzt brauchst du ein passendes Ersatzteil.');redraw();return;
      }
      if(stt==='ok'||stt==='new'){
        st.parts[pid]='removed';st.mistakes.push(pid);delete st.checked[pid];animate(g);sfx(125,.22,'sawtooth');
        say('Ups! '+lab+' war noch in Ordnung. Du hast es versehentlich ausgelötet und dabei beschädigt. Dasselbe Teil lässt sich nicht wieder einlöten – du brauchst ein neues aus dem Ersatzteillager.');redraw();save();return;
      }
      if(stt==='removed'){
        const key=partKey(j.dev,pid);
        if(!(S.inv[key]>0)){say('Kein Ersatz für '+lab+' auf Lager. Bestelle es am PC; das ausgelötete Original ist nicht wiederverwendbar.');return}
        S.inv[key]--;st.parts[pid]='new';delete st.checked[pid];animate(g);sfx(1000,.15,'triangle');say('Neues Bauteil '+lab+' eingelötet.');redraw();renderTabs();save();return;
      }
    }
    if(tool==='tweezers'){
      if(p.attach!=='socket'){say(lab+' ist fest verlötet. Dafür brauchst du den Lötkolben.');return}
      if(stt==='removed'){
        const key=partKey(j.dev,pid);if(!(S.inv[key]>0)){say('Kein Ersatzstecker auf Lager. Bestelle '+lab+' am PC.');return}
        S.inv[key]--;st.parts[pid]='new';animate(g);sfx(900,.1,'triangle');say('Ersatzteil '+lab+' mit der Pinzette eingesetzt.');redraw();renderTabs();save();return;
      }
      if(stt==='ok'||stt==='broken'||stt==='new'){
        st.parts[pid]='removed';delete st.checked[pid];animate(g);sfx(640,.08);say(lab+' aus dem Steckplatz gehoben. Du brauchst ein Ersatzteil, wenn du es nicht wieder einsetzen kannst.');redraw();save();return;
      }
    }
    say('Mit diesem Werkzeug geht das nicht.');
  });
  // Jeder winzige IC ist ein eigener Trefferbereich. Die Bezeichnung bleibt verborgen,
  // bis der separate Chip-Tester genau diesen Chip identifiziert hat.
  tbl.querySelectorAll('.micro-chip').forEach(g=>g.onclick=()=>{
    const m=st.micro.find(x=>x.id===g.dataset.micro);if(!m)return;
    const info=microInfo(m.type);
    if(!st.coverOff){say('Erst das Gerät öffnen, damit du an die Platine kommst.');return}
    if(tool==='chiptest'){
      m.identified=true;animate(g);sfx(m.state==='broken'?210:1050,.12,m.state==='broken'?'triangle':'sine');
      say(m.ref+' erkannt: '+info.label+'. '+info.desc+'. Status: '+(m.state==='broken'?'DEFEKT – muss ersetzt werden':m.state==='removed'?'fehlt':'in Ordnung')+'.');
      save();redraw();return;
    }
    if(tool==='meter'){
      say('Das normale Messgerät zeigt hier nur elektrische Werte. Für den Namen und die eindeutige Diagnose brauchst du den Chip-Tester.');return;
    }
    if(tool==='solder'){
      if(!m.identified){say('Unbekannter Chip '+m.ref+'. Erst mit dem Chip-Tester identifizieren, dann auslöten.');return}
      const key=microKey(j.dev,m.type);
      if(m.state==='removed'){
        if(!(S.inv[key]>0)){say('Ersatz fehlt: '+info.label+'. Bestelle den exakt passenden Mikrochip im PC-Shop.');return}
        S.inv[key]--;m.state='new';m.fault=false;animate(g);sfx(1120,.14,'triangle');say(info.label+' passend eingesetzt. '+(S.inv[key]||0)+' Stück verbleiben.');renderTabs();save();redraw();return;
      }
      if(m.state==='broken'){
        m.state='removed';m.removed=true;animate(g);sfx(155,.18,'sawtooth');say(m.ref+' ('+info.label+') sauber ausgelötet. Jetzt den passenden Ersatzchip bestellen.');save();redraw();return;
      }
      if(m.state==='ok'||m.state==='new'){
        m.state='removed';m.removed=true;m.damaged=true;animate(g);sfx(130,.2,'sawtooth');
        say('Achtung! '+m.ref+' ('+info.label+') war in Ordnung. Du hast den Chip versehentlich ausgelötet und beschädigt. Er kann nicht wiederverwendet werden – ein neuer muss her.');save();redraw();return;
      }
    }
    if(tool==='tweezers'){
      say(m.ref+' ist direkt aufgelötet. Benutze zuerst den Chip-Tester und danach den Lötkolben.');return;
    }
    say('Wähle den Chip-Tester zum Identifizieren oder den Lötkolben zum Auslöten.');
  });

  // Pinsel und Alkohol-Tuch arbeiten als Wischbewegung direkt über der Matte.
  let down=false,lastCleanAt=0;
  const dirtAt=e=>{
    const fromEvent=e.target&&e.target.closest?e.target.closest('.dirt'):null;
    if(fromEvent)return fromEvent;
    const under=document.elementFromPoint(e.clientX,e.clientY);
    return under&&under.closest?under.closest('.dirt'):null;
  };
  const scrub=el=>{
    if(!el||!el.classList||!el.classList.contains('dirt')||!st.coverOff)return false;
    const i=Number(el.dataset.i),dust=st.dirt[i];if(!dust||dust.a<=.02)return false;
    if(tool==='brush')dust.a-=dust.hard?.035:.12;
    else if(tool==='cloth')dust.a-=dust.hard?.10:.18;
    else return false;
    const opacity=Math.max(0,dust.a);
    el.setAttribute('opacity',opacity);
    animateToolAction(el);animate(el);
    if(opacity<=.02){
      el.remove();sfx(1500,.025);
      const cleanliness=Math.max(0,1-st.dirt.reduce((a,y)=>a+Math.max(0,y.a),0)/(st.dirt.length*.75));
      if(cleanliness>.8)say('Die Platine ist sauber. Prüfe jetzt die Bauteile.');
    }
    if(Date.now()-lastCleanAt>200){lastCleanAt=Date.now();save()}
    return true;
  };
  tbl.addEventListener('pointerdown',e=>{
    if(tool!=='brush'&&tool!=='cloth')return;
    const dirt=dirtAt(e);if(!dirt||!st.coverOff)return;
    down=true;
    try{tbl.setPointerCapture(e.pointerId)}catch(_){}
    scrub(dirt);e.preventDefault();
  });
  tbl.addEventListener('pointermove',e=>{if(down){const dirt=dirtAt(e);if(dirt)scrub(dirt)}});
  const stop=()=>{if(down){down=false;if(tbl.isConnected){save();renderProgOnly(j)}}};
  tbl.addEventListener('pointerup',stop);tbl.addEventListener('pointercancel',stop);
}
function renderProgOnly(j){
  const st=j&&j.st;if(!st)return;
  const note=$('.repair-note');if(!note)return;
  const total=(st.dirt||[]).reduce((a,x)=>a+Math.max(0,x.a),0);
  const max=Math.max(1,(st.dirt||[]).length*.75);
  const clean=Math.round(Math.max(0,1-total/max)*100);
  if(st.coverOff&&!st.boardOut){
    const task=note.querySelector('.note-task'),bar=note.querySelector('.note-progress span'),meta=note.querySelector('.note-meta');
    if(task)task.textContent='1) Innenraum reinigen: '+clean+'%';
    if(bar)bar.style.width=clean+'%';
    if(meta)meta.textContent='Pinsel für Staub, Alkohol-Tuch für hartnäckige Rückstände';
  }
}
function showBits(j){
  const st=j.st,d=DEV[j.dev];
  $('#ovbox').innerHTML=`<h2>Schrauben-Aufsatz</h2><p>Welchen Aufsatz setzt du ein? Ein Blick aufs Gehäuse hilft: Kreuzschlitz klein, Kreuzschlitz mittel oder sechskant-ähnlich?</p><div class="choices">${BITS.map(b=>`<button class="btn alt" data-b="${b}">${b}</button>`).join('')}</div>`;
  $('#ov').hidden=false;
  $('#ovbox').querySelectorAll('button').forEach(b=>b.onclick=()=>{
    if(b.dataset.b===d.bit){st.bit=d.bit;sfx(900,.08);$('#ov').hidden=true;hintTxt='Passt. Jetzt Schrauben anklicken.';renderBench()}
    else{sfx(150,.15);toast('Passt nicht, '+b.dataset.b+' rutscht durch');}
  });
}
function testDevice(j,clean){
  const st=j.st;
  const microBad=(st.micro||[]).some(m=>m.state==='broken'||m.state==='removed');
  const ok=!Object.values(st.parts).includes('broken')&&!Object.values(st.parts).includes('removed')&&!microBad;
  if(!ok){st.closing=false;hintTxt=microBad?'Mindestens ein winziger IC ist defekt oder fehlt. Drehe das Gerät wieder um, öffne es und nutze den Chip-Tester.':'Ein Teil fehlt oder ist defekt. Öffne das Gerät erneut und prüfe die Bauteile.';renderBench();return}
  st.tested=true;j.q=Math.min(1,Math.max(0,clean));j.stage='done';sfx(1100,.3,'triangle');
  $('#ovbox').innerHTML=`<h2>Es läuft!</h2><p>${DEV[j.dev].name} von ${j.name} ist repariert. Sauberkeit: ${Math.round(j.q*100)}%.<br>${j.online?'Heute Abend wird es verschickt.':'Der Kunde holt es morgen ab.'}</p><button class="btn" id="okt">Super</button>`;
  $('#ov').hidden=false;$('#okt').onclick=()=>{$('#ov').hidden=true;S.bench=null;hintTxt='';save();go('jobs')};
  renderTabs();
}
/* ===== GRAFIK: Materialien & Bauteile ===== */
(function(){
  const wood="<svg xmlns='http://www.w3.org/2000/svg' width='500' height='320'><filter id='w' x='0' y='0' width='100%' height='100%'><feTurbulence type='fractalNoise' baseFrequency='0.008 0.28' numOctaves='5' seed='11'/><feColorMatrix values='0.55 0 0 0 0.18  0.38 0 0 0 0.09  0.2 0 0 0 0.04  0 0 0 0 1'/></filter><rect width='100%' height='100%' filter='url(#w)'/></svg>";
  document.documentElement.style.setProperty('--wood','url("data:image/svg+xml,'+encodeURIComponent(wood)+'")');
  const st=document.createElement('style');
  st.textContent='.shopscene .counter{background:var(--wood),#5b4033!important;background-size:cover!important;box-shadow:inset 0 6px 8px #fff3,0 -4px 12px #0008}.cust svg{filter:drop-shadow(0 8px 6px #0008)}.crt{background:linear-gradient(145deg,#d9d3c4,#a9a393)!important;box-shadow:inset 0 2px 0 #fff8,0 8px 20px #000a}.win{box-shadow:inset 0 0 40px #0003}';
  document.head.appendChild(st);
})();
function seeded(n){let s=n*7919+13;return()=>{s=(s*9301+49297)%233280;return s/233280}}
function hit(a,b,m=6){return !(a.x+a.w+m<b.x||b.x+b.w+m<a.x||a.y+a.h+m<b.y||b.y+b.h+m<a.y)}
const ART_DEFS=`<defs>
<filter id="grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="3" seed="3" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .5 -.12" result="g"/><feComposite in="g" in2="SourceAlpha" operator="in" result="gi"/><feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="gi"/></feMerge></filter>
<filter id="sh" x="-20%" y="-20%" width="140%" height="160%"><feDropShadow dx="1.5" dy="3" stdDeviation="2.4" flood-color="#000" flood-opacity=".6"/></filter>
<filter id="blur" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="1.8"/></filter>
<linearGradient id="gl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".42"/><stop offset=".45" stop-color="#fff" stop-opacity=".04"/><stop offset="1" stop-color="#000" stop-opacity=".42"/></linearGradient>
<linearGradient id="gl2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".28"/><stop offset=".35" stop-color="#fff" stop-opacity="0"/></linearGradient>
<linearGradient id="pcb" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#27935f"/><stop offset="1" stop-color="#115238"/></linearGradient>
<linearGradient id="met" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eef1f6"/><stop offset=".5" stop-color="#9ea6b4"/><stop offset="1" stop-color="#5a6170"/></linearGradient>
<linearGradient id="cyl" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#16224a"/><stop offset=".3" stop-color="#5373d0"/><stop offset=".6" stop-color="#27397a"/><stop offset="1" stop-color="#0b1230"/></linearGradient>
<linearGradient id="glass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1e2a42"/><stop offset=".5" stop-color="#080c18"/><stop offset="1" stop-color="#263552"/></linearGradient>
<linearGradient id="cop" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f0a064"/><stop offset=".5" stop-color="#b8602c"/><stop offset="1" stop-color="#6b3515"/></linearGradient>
<radialGradient id="lens" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#b9a4ff"/><stop offset=".5" stop-color="#3b2a86"/><stop offset="1" stop-color="#0c0a22"/></radialGradient>
<radialGradient id="cone" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#4a4f5c"/><stop offset=".55" stop-color="#1a1d26"/><stop offset=".8" stop-color="#6b7080"/><stop offset="1" stop-color="#2a2d36"/></radialGradient>
<radialGradient id="dust"><stop offset="0" stop-color="#9a8560" stop-opacity="1"/><stop offset=".6" stop-color="#8a7656" stop-opacity=".7"/><stop offset="1" stop-color="#8a7656" stop-opacity="0"/></radialGradient>
<radialGradient id="grime"><stop offset="0" stop-color="#150d07" stop-opacity="1"/><stop offset=".7" stop-color="#2a1a0e" stop-opacity=".85"/><stop offset="1" stop-color="#2a1a0e" stop-opacity="0"/></radialGradient>
<radialGradient id="burn"><stop offset="0" stop-color="#000" stop-opacity=".7"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
<radialGradient id="screw" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#fcfcfc"/><stop offset=".6" stop-color="#9aa0aa"/><stop offset="1" stop-color="#454a52"/></radialGradient>
<radialGradient id="hole" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#000"/><stop offset="1" stop-color="#2a2a30"/></radialGradient>
</defs>`;
function partArt(p,t){
  const {x,y,w,h}=p,cx=x+w/2,cy=y+h/2,r=Math.min(w,h)/2;
  switch(p.id){
  case 'screen':return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="url(#glass)" stroke="#05070d" stroke-width="3"/><polygon points="${x+8},${y+4} ${x+w*.55},${y+4} ${x+w*.3},${y+h-4} ${x+8},${y+h-4}" fill="#fff" opacity=".1"/><rect x="${x+w*.3}" y="${y+h}" width="${w*.4}" height="10" fill="#b9733a"/>`;
  case 'battery':return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="5" fill="#2a2f3b" stroke="#0b0d12" stroke-width="2"/><rect x="${x+6}" y="${y+6}" width="${w-12}" height="${h-12}" rx="3" fill="url(#met)"/><rect x="${x+6}" y="${y+h*.4}" width="${w-12}" height="${h*.2}" fill="#2c5ee0"/><rect x="${x-5}" y="${y+h*.3}" width="6" height="${h*.4}" fill="#d8b24a"/><text x="${x+w-10}" y="${y+h*.2+4}" fill="#222" font-size="9" text-anchor="end" font-family="monospace">3.7V Li-ion</text>`;
  case 'btn':case 'keypad':{let s=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="#2e3140" stroke="#0b0d12" stroke-width="2"/>`;const cols=Math.floor(w/22),rows=Math.floor(h/20);for(let i=0;i<cols;i++)for(let k=0;k<rows;k++){s+=`<circle cx="${x+(w/cols)*(i+.5)}" cy="${y+(h/rows)*(k+.5)}" r="6" fill="#d9d4cb"/><circle cx="${x+(w/cols)*(i+.5)-1.5}" cy="${y+(h/rows)*(k+.5)-1.5}" r="2.6" fill="#fff" opacity=".6"/>`}return s}
  case 'psu':{let s=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="url(#met)" stroke="#33384a" stroke-width="2"/>`;for(let i=0;i<7;i++)s+=`<rect x="${x+10}" y="${y+8+i*((h-18)/7)}" width="${w-20}" height="3" rx="1.5" fill="#2a2e3a"/>`;return s}
  case 'laser':return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="url(#met)" stroke="#33384a" stroke-width="2"/><rect x="${x+8}" y="${y+h*.4}" width="${w-16}" height="6" fill="#2a2e3a"/><circle cx="${cx}" cy="${cy}" r="${r*.55}" fill="url(#lens)" stroke="#111" stroke-width="2"/><circle cx="${cx-5}" cy="${cy-5}" r="3" fill="#fff" opacity=".7"/>`;
  case 'fan':{let s=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="#1b1d26" stroke="#0b0d12" stroke-width="3"/>`;for(let i=0;i<7;i++)s+=`<path transform="rotate(${i*51.4} ${cx} ${cy})" d="M${cx} ${cy} Q${cx+r*.9} ${cy-r*.2} ${cx+r*.7} ${cy-r*.75} Q${cx+r*.2} ${cy-r*.5} ${cx} ${cy}Z" fill="#4a4f60" stroke="#262935"/>`;return s+`<circle cx="${cx}" cy="${cy}" r="${r*.22}" fill="url(#met)" stroke="#111"/>`}
  case 'speaker':{return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#cone)" stroke="#0b0d12" stroke-width="3"/><circle cx="${cx}" cy="${cy}" r="${r*.7}" fill="none" stroke="#8a8fa0" stroke-width="1.2"/><circle cx="${cx}" cy="${cy}" r="${r*.45}" fill="none" stroke="#8a8fa0" stroke-width="1"/><circle cx="${cx}" cy="${cy}" r="${r*.18}" fill="#14161d"/>`}
  case 'motor':return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#met)" stroke="#33384a" stroke-width="3"/><circle cx="${cx}" cy="${cy}" r="${r*.7}" fill="none" stroke="#6b7283" stroke-width="2"/><circle cx="${cx}" cy="${cy}" r="${r*.28}" fill="#2a2e3a" stroke="#111"/><circle cx="${cx}" cy="${cy}" r="${r*.1}" fill="#e9edf3"/>`;
  case 'jack':return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="5" fill="#2c3040" stroke="#0b0d12" stroke-width="2"/><circle cx="${cx}" cy="${cy}" r="${r*.55}" fill="url(#met)" stroke="#111" stroke-width="2"/><circle cx="${cx}" cy="${cy}" r="${r*.3}" fill="url(#hole)"/>`;
  case 'sensor':{let s=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="#262a36" stroke="#0b0d12" stroke-width="2"/>`;for(let i=0;i<10;i++){s+=`<rect x="${x+6+i*((w-16)/9)}" y="${y-4}" width="3" height="5" fill="#d8b24a"/><rect x="${x+6+i*((w-16)/9)}" y="${y+h-1}" width="3" height="5" fill="#d8b24a"/>`}return s+`<rect x="${x+8}" y="${y+8}" width="${w-16}" height="${h-16}" rx="2" fill="url(#lens)" stroke="#05060f"/><polygon points="${x+10},${y+10} ${x+w*.5},${y+10} ${x+10},${y+h*.6}" fill="#fff" opacity=".2"/>`}
  case 'flash':case 'capacitor':{let s='';const n=2,cw=w/n-6;for(let i=0;i<n;i++){const bx=x+3+i*(w/n);s+=`<rect x="${bx}" y="${y+8}" width="${cw}" height="${h-8}" fill="url(#cyl)" stroke="#0a1030"/><ellipse cx="${bx+cw/2}" cy="${y+8}" rx="${cw/2}" ry="6" fill="#7e8bb8" stroke="#0a1030"/><rect x="${bx}" y="${y+h*.45}" width="${cw}" height="9" fill="#d8d8e8" opacity=".85"/>`}return s}
  case 'tuner':{let s=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="#2a2e3a" stroke="#0b0d12" stroke-width="2"/><rect x="${x+8}" y="${y+10}" width="${w*.6}" height="${h-20}" rx="6" fill="url(#cop)" stroke="#4a2410"/>`;for(let i=0;i<8;i++)s+=`<line x1="${x+8}" y1="${y+14+i*((h-28)/7)}" x2="${x+8+w*.6}" y2="${y+14+i*((h-28)/7)}" stroke="#4a2410" stroke-width="1.2"/>`;return s+`<circle cx="${x+w*.84}" cy="${cy}" r="${r*.42}" fill="url(#met)" stroke="#111" stroke-width="2"/><line x1="${x+w*.84}" y1="${cy}" x2="${x+w*.84+r*.3}" y2="${cy-r*.3}" stroke="#222" stroke-width="2.5"/>`}
  case 'camera':case 'lens':return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="5" fill="#252a34" stroke="#080b10" stroke-width="3"/><circle cx="${cx}" cy="${cy}" r="${Math.min(w,h)*.42}" fill="url(#met)" stroke="#111" stroke-width="3"/><circle cx="${cx}" cy="${cy}" r="${Math.min(w,h)*.29}" fill="url(#lens)" stroke="#080b10" stroke-width="3"/><circle cx="${cx-7}" cy="${cy-8}" r="4" fill="#fff" opacity=".55"/>`;
  case 'charging':case 'usb':return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="5" fill="#252a35" stroke="#080b10" stroke-width="2"/><rect x="${x+w*.18}" y="${y+h*.22}" width="${w*.64}" height="${h*.56}" rx="4" fill="url(#met)" stroke="#303541" stroke-width="2"/><rect x="${x+w*.32}" y="${y+h*.4}" width="${w*.36}" height="${h*.2}" rx="2" fill="#171a22"/>`;
  case 'board':return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="5" fill="url(#pcb)" stroke="#092b20" stroke-width="3"/><rect x="${x+w*.2}" y="${y+h*.2}" width="${w*.6}" height="${h*.55}" rx="3" fill="#151a25" stroke="#a6aab0" stroke-width="2"/><path d="M${x+6} ${cy}H${x+w-6}M${cx} ${y+5}V${y+h-5}" stroke="#d6b15e" stroke-width="2" opacity=".75"/>`;
  case 'trackpad':return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="7" fill="#858b96" stroke="#333946" stroke-width="3"/><rect x="${x+5}" y="${y+5}" width="${w-10}" height="${h-10}" rx="5" fill="#c9ced4" stroke="#f5f5f5" stroke-opacity=".6"/>`;
  case 'stick':return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#20242c" stroke="#07090d" stroke-width="3"/><circle cx="${cx}" cy="${cy}" r="${r*.7}" fill="#545c69"/><path d="M${cx} ${cy}L${cx+8} ${cy-r*.65}" stroke="#c9cdd5" stroke-width="8" stroke-linecap="round"/><circle cx="${cx+8}" cy="${cy-r*.65}" r="${r*.23}" fill="#161a22"/>`;
  case 'antenna':return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="5" fill="#1e2536" stroke="#0a0c13" stroke-width="2"/><path d="M${x+8} ${y+h-5}Q${cx} ${y-8} ${x+w-8} ${y+h-5}" fill="none" stroke="#d8b24a" stroke-width="4"/><circle cx="${cx}" cy="${y+9}" r="4" fill="#d8b24a"/>`;
  default:return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="#15171e" stroke="#000" stroke-width="2"/>`;
  }
}
function deviceShape(d){
  const forms={
    handheld:'M38 8H362Q392 8 392 38V262Q392 292 362 292H38Q8 292 8 262V38Q8 8 38 8Z',
    console:'M18 38Q18 10 48 10H352Q382 10 382 38V262Q382 290 352 290H48Q18 290 18 262Z',
    phone:'M80 45H320Q370 45 370 95V205Q370 255 320 255H80Q30 255 30 205V95Q30 45 80 45Z',
    mp3:'M85 8H315Q365 8 365 58V242Q365 292 315 292H85Q35 292 35 242V58Q35 8 85 8Z',
    camera:'M28 45Q28 20 55 20H145L170 8H250L270 28H350Q382 28 382 60V260Q382 282 355 282H48Q18 282 18 252V65Q18 45 28 45Z',
    radio:'M18 22Q18 8 38 8H362Q382 8 382 28V272Q382 292 362 292H38Q18 292 18 272Z',
    tablet:'M45 5H355Q390 5 390 40V260Q390 295 355 295H45Q10 295 10 260V40Q10 5 45 5Z',
    laptop:'M18 45Q18 15 48 15H352Q382 15 382 45V245Q382 275 352 275H48Q18 275 18 245Z',
    gamepad:'M95 28Q120 10 155 28L175 48H225L245 28Q280 10 305 28Q355 48 382 100L370 250Q365 286 330 286Q300 286 270 230H130Q100 286 70 286Q35 286 30 250L18 100Q45 48 95 28Z',
    watch:'M200 5A145 145 0 1 1 199.9 5Z',
    buds:'M110 8H290Q330 8 330 48V252Q330 292 290 292H110Q70 292 70 252V48Q70 8 110 8Z',
    speaker:'M75 8H325Q370 8 370 53V247Q370 292 325 292H75Q30 292 30 247V53Q30 8 75 8Z',
    ereader:'M42 8H358Q390 8 390 40V260Q390 292 358 292H42Q10 292 10 260V40Q10 8 42 8Z',
    minidisc:'M65 8H335Q390 8 390 63V237Q390 292 335 292H65Q10 292 10 237V63Q10 8 65 8Z',
    router:'M35 35Q35 10 60 10H340Q365 10 365 35V265Q365 290 340 290H60Q35 290 35 265Z'
  };
  return forms[d.form]||forms.handheld;
}
function svgFrame(d){
  const portrait=!!d.portrait;
  return {view:portrait?'0 0 300 400':'0 0 400 300',transform:portrait?'translate(300 0) rotate(90)':'',width:d.width||340};
}
function frontDeviceSvg(j){
  const d=DEV[j.dev],f=svgFrame(d),shape=deviceShape(d);let a=`<svg viewBox="${f.view}" id="dsv" style="width:min(100%,${f.width}px);height:auto" class="device-front">${ART_DEFS}<g transform="${f.transform}">`;
  a+=`<path d="${shape}" fill="${d.color}" stroke="#0a0b13" stroke-width="8" filter="url(#sh)"/><path d="${shape}" fill="url(#gl)" stroke="#ffffff66" stroke-width="2"/>`;
  const id=j.dev;
  if(id==='phone'||id==='watch'||id==='tablet'||id==='handheld'||id==='laptop'||id==='ereader'){
    a+=`<rect x="75" y="25" width="250" height="205" rx="${id==='watch'?70:14}" class="front-screen"/><rect x="88" y="38" width="224" height="179" rx="8" fill="#182b41"/><path d="M100 190L155 105L205 160L245 110L300 190Z" fill="#387d88" opacity=".7"/><circle cx="200" cy="75" r="18" fill="#ffcf7a" opacity=".9"/><text x="200" y="255" text-anchor="middle" fill="#fff" font-family="monospace" font-size="12">${d.name}</text>`;
    if(id==='laptop')a+=`<path d="M55 255H345L365 280H35Z" fill="#9ca5b0" stroke="#303541" stroke-width="3"/><rect x="155" y="260" width="90" height="9" rx="4" fill="#576171"/>`;
  } else if(id==='camera'||id==='camcorder'){
    a+=`<rect x="35" y="75" width="165" height="125" rx="10" fill="#151b25" stroke="#aeb8c5" stroke-width="4"/><circle cx="270" cy="145" r="82" fill="url(#met)" stroke="#111" stroke-width="6"/><circle cx="270" cy="145" r="61" fill="url(#lens)" stroke="#080b10" stroke-width="5"/><circle cx="250" cy="120" r="12" fill="#fff" opacity=".45"/><rect x="62" y="43" width="70" height="18" rx="5" fill="#d4d7df"/>`;
  } else if(id==='router'){
    a+=`<rect x="45" y="65" width="310" height="175" rx="18" fill="#252c37" stroke="#9aa7b7" stroke-width="4"/><g stroke="#adb9c8" stroke-width="7" stroke-linecap="round"><path d="M85 75L45 8M315 75L355 8"/></g><g fill="#7fe0c8">${[0,1,2,3].map(i=>`<circle cx="${110+i*48}" cy="205" r="5"/>`).join('')}</g><text x="200" y="145" text-anchor="middle" fill="#e9eef5" font-size="15">KITSUNE Wi-Fi</text>`;
  } else if(id==='minidisc'){
    a+=`<rect x="55" y="35" width="290" height="230" rx="25" fill="#313b49" stroke="#d5dce5" stroke-width="4"/><rect x="85" y="65" width="155" height="90" rx="8" fill="#a8c8b8"/><circle cx="285" cy="155" r="40" fill="#aeb7c4" stroke="#5b6574" stroke-width="5"/><text x="162" y="118" text-anchor="middle" fill="#172b2b" font-size="12">MD PLAYER</text>`;
  } else if(id==='console'){
    a+=`<rect x="25" y="35" width="350" height="230" rx="18" fill="#222936" stroke="#a9b5c7" stroke-width="4"/><circle cx="75" cy="150" r="30" fill="#10151e" stroke="#687488" stroke-width="3"/><path d="M62 150H88M75 137V163" stroke="#dce1e8" stroke-width="5"/><circle cx="320" cy="120" r="11" fill="#ff6b9a"/><circle cx="345" cy="145" r="11" fill="#7fe0c8"/><circle cx="320" cy="170" r="11" fill="#ffe27a"/>`;
  } else if(id==='gamepad'){
    a+=`<path d="M85 90Q120 58 158 90L180 115H220L242 90Q280 58 315 90L365 150L345 235Q335 260 305 245L260 210H140L95 245Q65 260 55 235L35 150Z" fill="#232936" stroke="#aab2c2" stroke-width="5"/><path d="M90 150H145M117 123V177" stroke="#dce1e8" stroke-width="10" stroke-linecap="round"/><circle cx="285" cy="135" r="13" fill="#ff6b9a"/><circle cx="318" cy="160" r="13" fill="#7fe0c8"/><circle cx="285" cy="185" r="13" fill="#ffe27a"/>`;
  } else if(id==='radio'){
    a+=`<rect x="28" y="35" width="344" height="230" rx="10" fill="#6c442a" stroke="#d9ae75" stroke-width="5"/><rect x="48" y="55" width="195" height="55" rx="4" fill="#f1dba0"/><path d="M60 96Q80 65 100 96T140 96T180 96T220 96" fill="none" stroke="#9b542b" stroke-width="3"/><circle cx="295" cy="150" r="55" fill="#33251f" stroke="#d2b48b" stroke-width="8"/><circle cx="295" cy="150" r="17" fill="#c69b5f"/>`;
  } else if(id==='mp3'){
    a+=`<rect x="95" y="20" width="210" height="260" rx="35" fill="#252a36" stroke="#dce0e8" stroke-width="4"/><rect x="120" y="45" width="160" height="105" rx="7" fill="#a8c8b8"/><text x="200" y="95" fill="#192c2b" font-size="15" text-anchor="middle" font-family="monospace">KURONEKO FM</text><circle cx="200" cy="215" r="48" fill="#aeb8c4"/><circle cx="200" cy="215" r="35" fill="#4a5361"/>`;
  } else if(id==='earbuds'){
    a+=`<rect x="105" y="55" width="190" height="210" rx="55" fill="#eef0f2" stroke="#737b86" stroke-width="4"/><path d="M105 130Q200 155 295 130" fill="none" stroke="#9ca3ad" stroke-width="3"/><ellipse cx="155" cy="185" rx="24" ry="38" fill="#fff" stroke="#a0a8b3" stroke-width="3"/><ellipse cx="245" cy="185" rx="24" ry="38" fill="#fff" stroke="#a0a8b3" stroke-width="3"/>`;
  } else if(id==='speaker'){
    a+=`<rect x="55" y="25" width="290" height="250" rx="48" fill="#242a34" stroke="#8d98a8" stroke-width="5"/><circle cx="200" cy="145" r="95" fill="url(#cone)" stroke="#a5aebb" stroke-width="5"/><circle cx="200" cy="145" r="28" fill="#171b22"/>`;
  }
  // Herstellerplakette, Ports und echte Gehäusekanten
  a+=`<rect x="155" y="${d.portrait?365:275}" width="90" height="13" rx="3" fill="#1118"/><text x="200" y="${d.portrait?375:284}" font-size="8" fill="#fff9" text-anchor="middle" font-family="monospace">KURONEKO LAB</text></g></svg>`;
  return a;
}
function deviceSvg(j,clean){
  const st=j.st,d=DEV[j.dev],rr=seeded(j.id),f=svgFrame(d),shape=deviceShape(d);
  if(!st.flipped&&!st.coverOff)return frontDeviceSvg(j);
  let s=`<svg viewBox="${f.view}" id="dsv" style="width:min(100%,${f.width}px);height:auto">${ART_DEFS}<g transform="${f.transform}">`;
  // Gehaeuseboden mit eigener Silhouette je Geraet
  s+=`<path d="${shape}" fill="${d.color}" filter="url(#grain)" stroke="#080a11" stroke-width="7"/><path d="${shape}" fill="url(#gl)" stroke="#ffffff55" stroke-width="2"/>`;
  // Platine und Bauteile bleiben innerhalb der individuellen Gehaeuseform.
  s+=`<defs><clipPath id="caseClip"><path d="${shape}"/></clipPath></defs><g clip-path="url(#caseClip)">`;
  s+=`<rect x="22" y="22" width="356" height="256" rx="10" fill="url(#pcb)" stroke="#06281b" stroke-width="3" filter="url(#grain)"/>`;
  // Leiterbahnen
  let tr='';for(let i=0;i<26;i++){let px=34+rr()*330,py=34+rr()*230,dp=`M${px.toFixed(0)} ${py.toFixed(0)}`;for(let k=0;k<3;k++){if(k%2===0)px=Math.max(34,Math.min(366,px+(rr()-.5)*200));else py=Math.max(34,Math.min(266,py+(rr()-.5)*160));dp+=`${k%2===0?'H':'V'}${(k%2===0?px:py).toFixed(0)}`}tr+=`<path d="${dp}"/>`}
  s+=`<g fill="none" stroke="#43c28a" stroke-width="1.7" opacity=".55" stroke-linejoin="round">${tr}</g><g fill="none" stroke="#06281b" stroke-width="1.7" opacity=".3" transform="translate(1.2 1.6)">${tr}</g>`;
  // Montagebohrungen
  [[34,34],[366,34],[34,266],[366,266]].forEach(p=>s+=`<circle cx="${p[0]}" cy="${p[1]}" r="6" fill="url(#hole)" stroke="#d8b24a" stroke-width="2.5"/>`);
  // Viele kleine passive SMD-Bauteile zwischen den grossen Baugruppen.
  const occ=d.parts.map(p=>({x:p.x-4,y:p.y-4,w:p.w+8,h:p.h+8}));(st.micro||[]).forEach(m=>occ.push({x:m.x-5,y:m.y-5,w:m.w+10,h:m.h+10}));let rs=0,tries=0;
  while(rs<24&&tries++<800){
    const w=8+Math.floor(rr()*9),h=4+Math.floor(rr()*3),b={x:36+rr()*(328-w),y:36+rr()*(228-h),w,h};
    if(occ.some(o=>hit(o,b,3)))continue;occ.push(b);rs++;
    s+=`<g><rect x="${b.x}" y="${b.y}" width="${w}" height="${h}" rx="1" fill="#d9c9a0" stroke="#7a6a40" stroke-width=".7"/><rect x="${b.x}" y="${b.y}" width="2" height="${h}" fill="#cfd3d9"/><rect x="${b.x+w-2}" y="${b.y}" width="2" height="${h}" fill="#cfd3d9"/></g>`;
  }
  // Individuelle IC-Gehäuse mit eigenen Pins und unsichtbarer, etwas grösserer Klickfläche.
  // Die Chip-Bezeichnung ist absichtlich erst nach einer Messung mit dem Chip-Tester sichtbar.
  (st.micro||[]).forEach(m=>{
    const info=microInfo(m.type),x=m.x,y=m.y,w=m.w,h=m.h,removed=m.state==='removed';
    let pins='';const n=Math.max(2,Math.floor(w/3));
    for(let k=0;k<n;k++){
      const px=x+1+(w-2)*(k/(n-1));
      pins+=`<rect x="${px-0.7}" y="${y-2.6}" width="1.4" height="2.7" fill="#cbd0d6"/><rect x="${px-0.7}" y="${y+h-.1}" width="1.4" height="2.7" fill="#cbd0d6"/>`;
    }
    const status=m.identified?(m.state==='broken'?'#ff5a5a':removed?'#ffe27a':'#7fe0c8'):'#9ba2a9';
    s+=`<g class="micro-chip" data-micro="${m.id}" role="button" tabindex="0" aria-label="${m.ref}${m.identified?' · '+info.label:' · unbekannter Mikrochip'}">`;
    s+=`<rect class="micro-hit" x="${x-5}" y="${y-5}" width="${w+10}" height="${h+10}"/>`;
    if(removed){s+=`<rect x="${x-1}" y="${y-1}" width="${w+2}" height="${h+2}" rx="1" fill="#0b3a28" stroke="#d8b24a" stroke-width=".8" stroke-dasharray="2 1"/>`;for(let k=0;k<n;k++){const px=x+1+(w-2)*(k/(n-1));s+=`<circle cx="${px}" cy="${y-1}" r=".9" fill="#e5c36b"/><circle cx="${px}" cy="${y+h+1}" r=".9" fill="#e5c36b"/>`}
    }else{
      s+=`<g filter="url(#sh)"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="1.3" fill="${m.identified&&m.state==='broken'?'#382027':'#141820'}" stroke="#05070b" stroke-width=".8"/>${pins}<circle cx="${x+2}" cy="${y+2}" r=".75" fill="#757d89"/><text x="${x+w/2}" y="${y+h*.72}" text-anchor="middle" font-size="${Math.min(4.2,w*.3)}" fill="#8993a0" font-family="monospace">${m.ref}</text></g>`;
    }
    if(m.identified)s+=`<circle cx="${x+w-1}" cy="${y+1}" r="1.8" fill="${status}" stroke="#f4f4f4" stroke-width=".55"/>`;
    s+='</g>';
  });
  // Bauteile
  d.parts.forEach(p=>{
    const stt=st.parts[p.id];
    s+=`<g class="pt" data-p="${p.id}" style="cursor:pointer">`;
    if(stt==='removed'){
      s+=`<rect x="${p.x}" y="${p.y}" width="${p.w}" height="${p.h}" rx="6" fill="#0b3a28" opacity=".55" stroke="#ffffffaa" stroke-width="2" stroke-dasharray="6 5"/>`;
      for(let i=0;i<8;i++)s+=`<circle cx="${p.x+8+i*((p.w-16)/7)}" cy="${p.y+6}" r="3" fill="#d8b24a"/><circle cx="${p.x+8+i*((p.w-16)/7)}" cy="${p.y+p.h-6}" r="3" fill="#d8b24a"/>`;
    } else {
      s+=`<g filter="url(#sh)">${partArt(p,stt)}</g>`;
      if(stt==='broken')s+=`<circle cx="${p.x+p.w*.7}" cy="${p.y+p.h*.4}" r="${Math.min(p.w,p.h)*.4}" fill="url(#burn)" opacity=".5"/>`;
      if(stt==='new')s+=`<rect x="${p.x-2}" y="${p.y-2}" width="${p.w+4}" height="${p.h+4}" rx="7" fill="none" stroke="#7fe0c8" stroke-width="2.5" opacity=".85"/>`;
    }
    s+=`<text x="${p.x+p.w/2}" y="${p.y+p.h+13}" fill="#fff" font-size="10.5" text-anchor="middle" font-family="sans-serif" stroke="#04140d" stroke-width="3" paint-order="stroke">${p.label}</text>`;
    const ck=st.checked[p.id];
    if(ck)s+=`<circle cx="${p.x+p.w-4}" cy="${p.y+4}" r="10" fill="${ck==='ok'?'#1f9d6d':'#d83a3a'}" stroke="#fff" stroke-width="2"/><text x="${p.x+p.w-4}" y="${p.y+9}" fill="#fff" font-size="14" text-anchor="middle" font-weight="700">${ck==='ok'?'✓':'✗'}</text>`;
    s+='</g>';
  });
  // Schmutz
  st.dirt.forEach((x,i)=>{if(x.a>0.02)s+=`<circle class="dirt" data-i="${i}" cx="${x.x}" cy="${x.y}" r="${(x.r*1.5).toFixed(1)}" fill="${x.hard?'url(#grime)':'url(#dust)'}" opacity="${x.a}" filter="url(#blur)" pointer-events="all"/>`});
  // Ende des geclippten Innenraums
  s+='</g>';
  // Deckel
  if(!st.coverOff){
    s+=`<g id="cover"><g filter="url(#sh)"><path d="${shape}" fill="${d.color}" filter="url(#grain)"/></g><path d="${shape}" fill="url(#gl)" stroke="#000a" stroke-width="3"/><path d="${shape}" fill="url(#gl2)" stroke="#ffffff55" stroke-width="1.5"/><rect x="25" y="22" width="350" height="256" rx="16" fill="none" stroke="#000" stroke-opacity=".22" stroke-width="2"/>`;
    for(let i=0;i<6;i++)s+=`<rect x="${130+i*24}" y="52" width="12" height="3.5" rx="1.7" fill="#000" opacity=".4"/>`;
    s+=`<rect x="110" y="120" width="180" height="62" rx="5" fill="#f1efe8" opacity=".92" stroke="#00000033"/><text x="200" y="146" font-family="DotGothic16,sans-serif" font-size="17" text-anchor="middle" fill="#2a2a38">${d.name}</text><text x="200" y="168" font-family="monospace" font-size="9" text-anchor="middle" fill="#555">MODEL ${(j.id*37%900)+100} · MADE IN JAPAN · 2001</text>`;
    s+=`<circle cx="64" cy="252" r="9" fill="#14141a" opacity=".85"/><circle cx="336" cy="252" r="9" fill="#14141a" opacity=".85"/>`;
    const pos=d.screwLocs||[[34,34],[366,34],[34,266],[366,266],[200,34],[200,266],[120,266],[280,266]];
    for(let i=0;i<d.screws;i++){const q=pos[i],out=Array.isArray(st.screwOut)?!!st.screwOut[i]:i<(st.sOut||0);
      s+=`<g class="sc" data-i="${i}" style="cursor:pointer"><circle cx="${q[0]}" cy="${q[1]}" r="12" fill="transparent"/>`;
      if(out)s+=`<circle cx="${q[0]}" cy="${q[1]}" r="7.5" fill="url(#hole)" stroke="#0008" stroke-width="1.5"/>`;
      else{s+=`<circle cx="${q[0]}" cy="${q[1]}" r="8" fill="#0006" transform="translate(1 1.6)"/><circle cx="${q[0]}" cy="${q[1]}" r="8" fill="url(#screw)" stroke="#2b2e34" stroke-width="1.5"/>`;
        if(d.bit==='Torx'){let pts='';for(let k=0;k<12;k++){const a=k*Math.PI/6,rad=k%2?2.8:5.2;pts+=`${(q[0]+Math.cos(a)*rad).toFixed(1)},${(q[1]+Math.sin(a)*rad).toFixed(1)} `}s+=`<polygon points="${pts}" fill="#24272d"/>`}
        else if(d.bit==='Ph1')s+=`<path d="M${q[0]-5.5} ${q[1]}H${q[0]+5.5}M${q[0]} ${q[1]-5.5}V${q[1]+5.5}" stroke="#24272d" stroke-width="2.6" stroke-linecap="round"/>`;
        else s+=`<path d="M${q[0]-4} ${q[1]}H${q[0]+4}M${q[0]} ${q[1]-4}V${q[1]+4}" stroke="#24272d" stroke-width="1.8" stroke-linecap="round"/>`}
      s+='</g>';}
    s+='</g>';
  }
  return s+'</g></svg>';
}
/* ===== PC / Y2K-BROWSER ===== */
let pcTab='shop',pcFilter='all',pcSearch='';
function normalizeSearch(v){return String(v||'').toLocaleLowerCase('de').replace(/ß/g,'ss').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim();}
function editDistance(a,b){
  if(Math.abs(a.length-b.length)>2)return 3;
  let prev=Array.from({length:b.length+1},(_,i)=>i);
  for(let i=1;i<=a.length;i++){const cur=[i];for(let j=1;j<=b.length;j++)cur[j]=Math.min(cur[j-1]+1,prev[j]+1,prev[j-1]+(a[i-1]===b[j-1]?0:1));prev=cur;}
  return prev[b.length];
}
function smartShopMatch(query,haystack){
  const q=normalizeSearch(query);if(!q)return true;
  const text=normalizeSearch(haystack),words=text.split(' ');
  return q.split(' ').filter(Boolean).every(token=>{
    if(text.includes(token))return true;
    const max=token.length>=7?2:1;
    return words.some(word=>word.length>=2&&Math.abs(word.length-token.length)<=max&&editDistance(token,word)<=max);
  });
}

function renderPC(){
  const el=$('#st-pc');
  const open=S.mail.filter(m=>m.state==='open').length;
  const tabs=[['shop','Akiba-Parts'],['mail','Posteingang'+(open?' ('+open+')':'')],['book','Kassenbuch']];
  let page='';
  if(pcTab==='shop'){
    const types=Object.keys(DEV);
    const products=[];
    types.filter(t=>pcFilter==='all'||pcFilter===t).forEach(t=>{
      DEV[t].parts.forEach(p=>products.push({dev:t,key:partKey(t,p.id),label:p.label,price:partPrice(t,p.id),kind:'Ersatzteil',desc:DEV[t].name+' '+p.label}));
      MICRO_CATALOG.forEach(m=>products.push({dev:t,key:microKey(t,m.id),label:m.label+' ('+m.short+')',price:Math.max(500,Math.round(DEV[t].fee*.055/100)*100),kind:'Mikrochip',desc:DEV[t].name+' Platinen-IC '+m.label+' '+m.desc+' U SMD Chip'}));
      SMD_CATALOG.forEach(m=>products.push({dev:t,key:smdKey(t,m.id),label:m.label+' ('+m.code+')',price:Math.max(150,Math.round(DEV[t].fee*.012/100)*100),kind:'SMD-Bauteil',desc:DEV[t].name+' Platine '+m.label+' '+m.code+' SMD Ersatz'}));
    });
    let rows='';
    products.forEach(p=>{
      const have=S.inv[p.key]||0;
      const needed=S.jobs.some(j=>j.dev===p.dev&&((p.kind==='Mikrochip'&&j.st&&j.st.micro&&j.st.micro.some(m=>m.type===p.key.split(':micro_')[1]&&(m.state==='broken'||m.state==='removed')))||(p.kind==='SMD-Bauteil'&&j.st&&j.st.smdParts&&j.st.smdParts.some(m=>m.type===p.key.split(':smd_')[1]&&(m.state==='broken'||m.state==='removed')))||(p.kind==='Ersatzteil'&&j.faults.includes(p.key.split(':')[1])))&&j.stage!=='done');
      rows+=`<tr data-shop-row data-search="${p.desc} ${p.kind} ${p.key} ${p.label}"><td>${DEV[p.dev].name}${needed?' <b style="color:#c00">(gebraucht)</b>':''}</td><td>${p.label}<br><small>${p.kind}</small></td><td>${yen(p.price)}</td><td>${have}</td><td><button class="buy" data-k="${p.key}" data-p="${p.price}" ${S.money<p.price?'disabled':''}>Kaufen</button></td></tr>`;
    });
    page=`<div class="marq">&#9733; AKIBA-PARTS.co.jp &#9733; Lieferung morgen früh &#9733; Besucher Nr. 004217 &#9733;</div>
    <label for="shop-search" style="display:block;font-weight:bold;margin:8px 0 4px">Intelligente Ersatzteil-Suche</label>
    <input id="shop-search" type="search" value="${pcSearch.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;')}" placeholder="z. B. akuu, displai, audio chip …" autocomplete="off" style="width:100%;max-width:520px;padding:8px;border:2px inset #aaa;background:#fff;color:#111;font:14px Arial,sans-serif">
    <small style="display:block;color:#555;margin:3px 0 8px">Findet auch ähnliche Schreibweisen. Groß-/Kleinschreibung und Umlaute sind egal.</small>
    <p>Filter: <a class="lnk" data-f="all">alle</a> ${types.map(t=>`<a class="lnk" data-f="${t}">${DEV[t].name.split(' ')[0]}</a>`).join(' | ')}</p>
    <div class="scroll"><table><tr><th>Gerät</th><th>Teil / Chip</th><th>Preis</th><th>Lager</th><th></th></tr>${rows}</table><p id="shop-no-results" style="display:none;color:#a00">Keine passenden Teile gefunden. Versuche einen anderen Suchbegriff.</p></div>${S.orders.length?`<p><b>Unterwegs:</b> ${S.orders.length} Paket(e)</p>`:''}`;
  } else if(pcTab==='mail'){
    page=`<h3 style="margin:0 0 8px">Posteingang</h3>`+(S.mail.length?S.mail.slice().reverse().map(m=>{
      const d=DEV[m.dev],pt=d.parts.find(p=>p.id===m.fault);
      return `<div style="border:1px solid #999;padding:6px;margin-bottom:6px"><b>${m.from}</b> (Tag ${m.day})<br>Betreff: Reparaturanfrage ${d.name}<br>"Mein Gerät: ${SYMPTOM[m.fault]}. Ich zahle ${yen(m.fee)} und schicke es per Post."<br>${m.state==='open'?`<button class="buy" data-a="${m.id}">Annehmen</button> <button class="buy" data-d="${m.id}">Ablehnen</button>`:`<i>${m.state==='accepted'?'angenommen':m.state==='declined'?'abgelehnt':'verfallen'}</i>`}</div>`}).join(''):'<p>Keine Nachrichten.</p>');
  } else {
    page=`<h3 style="margin:0 0 8px">Kassenbuch</h3><table><tr><th>Posten</th><th>Betrag</th></tr><tr><td>Kasse</td><td>${yen(S.money)}</td></tr><tr><td>Miete & Strom (pro Tag)</td><td>${yen(S.rent)}</td></tr><tr><td>Verdient insgesamt</td><td>${yen(S.stats.earned)}</td></tr><tr><td>Repariert</td><td>${S.stats.done}</td></tr><tr><td>Ruf im Viertel</td><td>${S.rep}/100</td></tr></table><p>Tipp: Bestelle Teile am Vortag, sie kommen morgens an. Saubere Geräte bringen mehr Geld.</p>`;
  }
  el.innerHTML=`<div class="crt"><div class="win"><div class="title"><span>Tokyo-Net Explorer 6.0 - ${tabs.find(t=>t[0]===pcTab)[1]}</span><span>_ □ ✕</span></div><div class="menu">${tabs.map(t=>`<button data-t="${t[0]}" aria-selected="${pcTab===t[0]}">${t[1]}</button>`).join('')}</div><div class="page">${page}</div></div></div>`;
  el.querySelectorAll('.menu button').forEach(b=>b.onclick=()=>{pcTab=b.dataset.t;sfx(600,.04);renderPC()});
  el.querySelectorAll('[data-f]').forEach(a=>a.onclick=()=>{pcFilter=a.dataset.f;renderPC()});
  const searchInput=$('#shop-search');
  if(searchInput){searchInput.oninput=()=>{pcSearch=searchInput.value;let visible=0;el.querySelectorAll('[data-shop-row]').forEach(row=>{const show=smartShopMatch(pcSearch,row.dataset.search||'');row.hidden=!show;if(show)visible++});const empty=$('#shop-no-results');if(empty)empty.style.display=visible?'none':'block'};if(pcSearch)searchInput.dispatchEvent(new Event('input'));}
  el.querySelectorAll('.buy[data-k]').forEach(b=>b.onclick=()=>{
    const pr=+b.dataset.p;if(S.money<pr)return;S.money-=pr;S.orders.push({key:b.dataset.k,arrive:S.day+1});sfx(1200,.1,'triangle');toast('Bestellt. Kommt morgen.');save();renderHud();renderPC()});
  el.querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>{
    const m=S.mail.find(x=>x.id===+b.dataset.a);m.state='accepted';
    S.jobs.push({id:S.nid++,name:m.from.split('@')[0],dev:m.dev,faults:[m.fault],fee:m.fee,accDay:S.day,stage:'new',st:null,pick:null,story:null,online:true,q:0});
    toast('Auftrag angenommen. Er liegt bei den Aufträgen.');sfx(880,.1);save();renderTabs();renderPC()});
  el.querySelectorAll('[data-d]').forEach(b=>b.onclick=()=>{S.mail.find(x=>x.id===+b.dataset.d).state='declined';save();renderTabs();renderPC()});
}
/* ===== CHיפLAB 3D / MATTE / PIN-BY-PIN UPGRADE ===== */
// New advanced tools are unlocked through successful customer repairs.
TOOLS.push(
  {id:'hotair',icon:'♨️',name:'Heißluftstation',sub:'SMD-Pins einzeln lösen',unlock:1},
  {id:'spudger',icon:'🪛',name:'ESD-Spudger',sub:'Platine und Clips lösen',unlock:2},
  {id:'microscope',icon:'🔎',name:'Digitalmikroskop',sub:'Kleine Kontakte vergrößern',unlock:3},
  {id:'ultrasonic',icon:'🫧',name:'Ultraschallbad',sub:'Feine Verschmutzung entfernen',unlock:4}
);
function toolIsUnlocked(t){return !t.unlock || (S&&S.stats&&S.stats.done>=t.unlock)}
function partPinCount(p){
  const fixed={screen:8,battery:6,btn:10,keypad:10,psu:8,laser:8,fan:6,speaker:6,motor:6,jack:4,sensor:10,flash:4,capacitor:4,tuner:8,camera:8,charging:6,board:12,trackpad:6,stick:6,usb:6,antenna:4,lens:8};
  return fixed[p.id]||Math.max(4,Math.min(12,Math.round((p.w+p.h)/28)));
}
function microPinCount(m){return Math.max(2,Math.floor(m.w/3))*2}
const SMD_CATALOG=[
  {id:'resistor',label:'SMD-Widerstand 10 kΩ',code:'R'},
  {id:'capacitor',label:'Keramik-Kondensator',code:'C'},
  {id:'diode',label:'Schutzdiode',code:'D'},
  {id:'inductor',label:'SMD-Spule',code:'L'},
  {id:'transistor',label:'Transistor',code:'Q'},
  {id:'fuse',label:'Mikrosicherung',code:'F'}
];
function smdKey(dev,type){return partKey(dev,'smd_'+type)}
function makeSmdParts(j,d){
  const rr=seeded(j.id*877+41),occupied=d.parts.map(p=>({x:p.x-8,y:p.y-8,w:p.w+16,h:p.h+16}));
  (j.st&&j.st.micro||[]).forEach(m=>occupied.push({x:m.x-6,y:m.y-6,w:m.w+12,h:m.h+12}));
  const out=[];let tries=0;
  while(out.length<12&&tries++<2400){
    const w=9+Math.floor(rr()*5),h=5+Math.floor(rr()*3),b={x:30+Math.floor(rr()*(340-w)),y:28+Math.floor(rr()*(244-h)),w,h};
    if(occupied.some(o=>hit(o,b,3)))continue;
    occupied.push(b);const c=SMD_CATALOG[(out.length+j.id)%SMD_CATALOG.length];
    out.push({id:c.code+String(out.length+1).padStart(2,'0'),type:c.id,label:c.label,x:b.x,y:b.y,w,h,state:'ok',pinOut:[false,false]});
  }
  return out;
}
function smdLayer(j){
  const st=j.st;let s='';
  (st.smdParts||[]).forEach(m=>{
    const x=m.x,y=m.y,w=m.w,h=m.h,removed=m.state==='removed',install=m.state==='installing';
    if(removed){s+=`<rect x="${x-2}" y="${y-2}" width="${w+4}" height="${h+4}" rx="1" fill="#0b281f" stroke="#d8b24a" stroke-width="1" stroke-dasharray="2 1"/>`;}
    else{
      const fill=m.type==='resistor'?'#292d35':m.type==='capacitor'?'#d3cbb7':m.type==='diode'?'#252b34':m.type==='inductor'?'#bd9c64':m.type==='transistor'?'#171e28':'#c8c8b9';
      s+=`<g class="smd-chip" data-smd="${m.id}" style="cursor:pointer"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="1.2" fill="${fill}" stroke="#090d12" stroke-width=".8"/><rect x="${x+1}" y="${y+1}" width="${w-2}" height="${h-2}" rx=".7" fill="none" stroke="${install?'#7fe0c8':'#e4d6aa'}" stroke-width=".6"/><text x="${x+w/2}" y="${y+h*.72}" text-anchor="middle" fill="#e2decf" font-size="${Math.min(4,w*.28)}">${m.id}</text></g>`;
    }
  });
  return s;
}
function smdPinLayer(j){
  let s='';
  (j.st.smdParts||[]).forEach(m=>{
    [[m.x-1,m.y+m.h/2],[m.x+m.w+1,m.y+m.h/2]].forEach((q,i)=>{
      const loose=!!(m.pinOut||[])[i];
      s+=`<g class="smd-pin" data-smd="${m.id}" data-pin="${i}" aria-label="${m.id} Lötstelle ${i+1}"><rect class="pin-metal" x="${q[0]-1.1}" y="${q[1]-1.3}" width="2.2" height="2.6" fill="${loose?'#765c38':'#dbc17b'}" stroke="#3c321f" stroke-width=".4"/><rect class="pin-hit" x="${q[0]-2.7}" y="${q[1]-2.7}" width="5.4" height="5.4"/></g>`;
    });
  });
  return s;
}
function prepareBenchState(j){
  const st=j.st,d=DEV[j.dev];
  st.screwOut=Array.isArray(st.screwOut)?st.screwOut:Array(d.screws).fill(false);
  if(!Array.isArray(st.screwsInBowl))st.screwsInBowl=st.screwOut.map(Boolean);
  st.joints=st.joints||{};st.matItems=Array.isArray(st.matItems)?st.matItems:[];st.trashItems=Array.isArray(st.trashItems)?st.trashItems:[];
  st.boardOut=!!st.boardOut;st.viewRotX=Number.isFinite(st.viewRotX)?st.viewRotX:13;st.viewRotY=Number.isFinite(st.viewRotY)?st.viewRotY:-17;
  st.boardRotX=Number.isFinite(st.boardRotX)?st.boardRotX:21;st.boardRotY=Number.isFinite(st.boardRotY)?st.boardRotY:-14;
  d.parts.forEach(p=>{const n=partPinCount(p);if(!Array.isArray(st.joints[p.id]))st.joints[p.id]=Array(n).fill(st.parts[p.id]==='removed');if(st.joints[p.id].length!==n)st.joints[p.id]=Array.from({length:n},(_,i)=>!!st.joints[p.id][i]);});
  (st.micro||[]).forEach(m=>{const n=microPinCount(m);if(!Array.isArray(m.pinOut))m.pinOut=Array(n).fill(m.state==='removed');if(m.pinOut.length!==n)m.pinOut=Array.from({length:n},(_,i)=>!!m.pinOut[i]);});
  if(!Array.isArray(st.smdParts))st.smdParts=makeSmdParts(j,d);
  st.smdParts.forEach(m=>{if(!Array.isArray(m.pinOut))m.pinOut=Array(2).fill(m.state==='removed');});
}
const _initBenchUpgrade=initBench;
initBench=function(j){_initBenchUpgrade(j);prepareBenchState(j)};
function matPush(j,item){
  const st=j.st;st.matItems=st.matItems||[];
  if(!st.matItems.some(x=>x.id===item.id))st.matItems.push(item);
}
function matItemLabel(item){return item.label+(item.faulty?' · defekt':'')}
function drawMatExtras(j){
  const st=j.st,host=$('.workstation');if(!host)return;
  const old=$('#bench-extra');if(old)old.remove();
  const panel=document.createElement('div');panel.id='bench-extra';panel.className='bench-extra';
  const items=st.matItems||[];
  panel.innerHTML=`<div class="mat-panel"><h3>ESD-Matte · Teileablage <span class="muted">(${items.length} Teile)</span></h3><div class="mat-surface" id="mat-surface">${items.length?items.map(x=>`<div class="mat-part ${st.selectedMatId===x.id?'selected':''}" draggable="true" data-matid="${x.id}" title="Auf der Matte abgelegt"><span>▰ ${matItemLabel(x)}</span><button type="button" data-throw="${x.id}" title="In den Mülleimer">×</button></div>`).join(''):'<span class="mat-empty">Ausgelötete Teile erscheinen hier. Ziehe sie zum Sortieren über die Matte.</span>'}</div><div class="bench-status-row"><span class="tag">${(st.screwsInBowl||[]).filter(Boolean).length}/${dScrews(j)} Schrauben in der Magnetschale</span><span class="tag">${(st.trashItems||[]).length} Teile entsorgt</span><span class="tag">Platine: ${st.boardOut?'ausgebaut':'eingesetzt'}</span></div></div><div class="trash-panel"><h3>🗑 Mülleimer für defekte Teile</h3><div class="trash-bin" id="trash-bin" title="Defekte Teile hier hineinziehen"><span style="font-size:27px">🗑</span><b>Defekte Teile entsorgen</b><span class="trash-count">${(st.trashItems||[]).length} Teile im Eimer</span></div><small class="muted">Nur vollständig ausgebaute Teile können entsorgt werden. Gute Ersatzteile solltest du behalten.</small></div>`;
  host.appendChild(panel);
  const surf=$('#mat-surface'),bin=$('#trash-bin');
  panel.querySelectorAll('.mat-part').forEach(el=>{
    el.addEventListener('click',e=>{if(e.target.closest('[data-throw]'))return;st.selectedMatId=el.dataset.matid;panel.querySelectorAll('.mat-part').forEach(x=>x.classList.toggle('selected',x===el));sayBench('Teil auf der Matte ausgewählt. Du kannst es zum Mülleimer ziehen.');save()});
    el.addEventListener('dragstart',e=>{e.dataTransfer.setData('text/plain',el.dataset.matid);if(bin)bin.classList.add('drag-over')});
    el.addEventListener('dragend',()=>bin&&bin.classList.remove('drag-over'));
  });
  panel.querySelectorAll('[data-throw]').forEach(b=>b.onclick=()=>throwMatItem(j,b.dataset.throw));
  if(bin){bin.addEventListener('dragover',e=>{e.preventDefault();bin.classList.add('drag-over')});bin.addEventListener('dragleave',()=>bin.classList.remove('drag-over'));bin.addEventListener('drop',e=>{e.preventDefault();bin.classList.remove('drag-over');throwMatItem(j,e.dataTransfer.getData('text/plain'))});bin.addEventListener('click',()=>{if(st.selectedMatId)throwMatItem(j,st.selectedMatId);else sayBench('Wähle zuerst ein Teil auf der ESD-Matte aus.')})}
}
function dScrews(j){return DEV[j.dev].screws}
function sayBench(t){hintTxt=t;const h=$('#hint');if(h)h.textContent=t}
function throwMatItem(j,id){
  const st=j.st,idx=(st.matItems||[]).findIndex(x=>x.id===id);if(idx<0){sayBench('Dieses Teil liegt nicht auf der Matte.');return}
  const item=st.matItems[idx];if(!item.faulty){S.rep=Math.max(0,S.rep-2);toast('Ein brauchbares Teil entsorgt: Ruf −2.')}else toast('Defektes Teil fachgerecht entsorgt.');
  st.trashItems=st.trashItems||[];st.trashItems.push({...item,discardedDay:S.day});st.matItems.splice(idx,1);if(st.selectedMatId===id)st.selectedMatId=null;
  save();renderHud();renderBench();sayBench(item.label+' wurde in den Mülleimer geworfen.');
}
function pinPositions(p,n){
  const per=Math.ceil(n/2),pos=[];
  for(let i=0;i<n;i++){const top=i<per,idx=top?i:i-per,count=top?per:n-per;const x=p.x+7+(Math.max(1,p.w-14))*(count===1?.5:idx/(count-1));pos.push({x,y:top?p.y-2:p.y+p.h+2})}
  return pos;
}
function partPinLayer(j){
  const st=j.st,d=DEV[j.dev];let out='';
  d.parts.forEach(p=>{
    const n=partPinCount(p),states=st.joints[p.id]||Array(n).fill(false),pos=pinPositions(p,n);
    pos.forEach((q,i)=>{const loose=!!states[i];out+=`<g class="part-pin" data-p="${p.id}" data-pin="${i}" aria-label="${p.label} Lötstelle ${i+1}"><circle class="pin-metal" cx="${q.x}" cy="${q.y}" r="2.4" fill="${loose?'#765c38':'#e2c477'}" stroke="#29251d" stroke-width=".7"/><rect class="pin-hit" x="${q.x-2.8}" y="${q.y-2.8}" width="5.6" height="5.6"/></g>`});
  });
  (st.micro||[]).forEach(m=>{
    const n=microPinCount(m),half=n/2,states=m.pinOut||Array(n).fill(false);
    for(let i=0;i<n;i++){const row=i<half?0:1,idx=i%half,x=m.x+1+(m.w-2)*(half===1?.5:idx/(half-1)),y=row===0?m.y-2.6:m.y+m.h+2.6,loose=!!states[i];out+=`<g class="micro-pin" data-micro="${m.id}" data-pin="${i}" aria-label="${m.ref} Pin ${i+1}"><rect class="pin-metal" x="${x-1.4}" y="${y-1.1}" width="2.8" height="2.2" rx=".45" fill="${loose?'#685033':'#d9c17f'}" stroke="#332a1b" stroke-width=".35"/><rect class="pin-hit" x="${x-1.35}" y="${y-2.25}" width="2.7" height="4.5"/></g>`}
  });
  return out;
}
function boardOnlySvg(j,clean){
  const st=j.st,d=DEV[j.dev],rr=seeded(j.id*101+13);let s=`<svg viewBox="0 0 400 300" id="dsv" class="board-view" style="width:min(100%,900px);height:auto" aria-label="Ausgebaute Platine von ${d.name}">${ART_DEFS}<g>`;
  s+=`<path d="M28 17H372Q388 17 388 33V267Q388 283 372 283H28Q12 283 12 267V33Q12 17 28 17Z" fill="#101a18" opacity=".85" transform="translate(0 7)"/><path d="M28 17H372Q388 17 388 33V267Q388 283 372 283H28Q12 283 12 267V33Q12 17 28 17Z" fill="url(#pcb)" stroke="#d6c59a" stroke-width="4" filter="url(#grain)"/><path d="M34 23H366Q380 23 380 37V263Q380 277 366 277H34Q20 277 20 263V37Q20 23 34 23Z" fill="none" stroke="#66b98d" stroke-width="1.5" opacity=".7"/>`;
  let traces='';for(let i=0;i<56;i++){let x=35+rr()*330,y=30+rr()*240,dx=(rr()-.5)*90,dy=(rr()-.5)*70;traces+=`<path d="M${x.toFixed(1)} ${y.toFixed(1)}h${dx.toFixed(1)}v${dy.toFixed(1)}h${(rr()-.5)*55}"/>`}
  s+=`<g fill="none" stroke="#8fbd76" stroke-width="1.2" opacity=".48" stroke-linecap="round" stroke-linejoin="round">${traces}</g><g fill="none" stroke="#d6b45c" stroke-width=".8" opacity=".45">${traces}</g>`;
  [[34,34],[366,34],[34,266],[366,266],[200,34],[200,266]].forEach(q=>s+=`<circle cx="${q[0]}" cy="${q[1]}" r="6" fill="url(#hole)" stroke="#d8b24a" stroke-width="2.4"/>`);
  // Connector rails and test points add board-level detail.
  s+=`<g fill="#d2b66d" stroke="#52452e" stroke-width=".7">${Array.from({length:18},(_,i)=>`<rect x="${42+i*7}" y="18" width="3.8" height="5" rx=".7"/>`).join('')}${Array.from({length:10},(_,i)=>`<circle cx="${350+i*2.6}" cy="${220+(i%2)*6}" r="1.8"/>`).join('')}</g>`;
  // Small passive components; the main solder points are individually clickable below.
  for(let i=0;i<34;i++){const x=34+rr()*330,y=32+rr()*236,w=7+rr()*7,h=3+rr()*3;if(d.parts.some(p=>hit({x,y,w,h},{x:p.x-5,y:p.y-5,w:p.w+10,h:p.h+10},2))||(st.micro||[]).some(m=>hit({x,y,w,h},{x:m.x-4,y:m.y-4,w:m.w+8,h:m.h+8},2)))continue;const type=i%4;s+=type===0?`<g><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="1" fill="#292d35" stroke="#d4c59d" stroke-width=".7"/><path d="M${x+2} ${y}v${h}M${x+w-2} ${y}v${h}" stroke="#c9b176" stroke-width="1.3"/></g>`:type===1?`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="1.5" fill="#c6bca7" stroke="#56504a" stroke-width=".6"/>`:type===2?`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx=".5" fill="#202733" stroke="#d9c17b" stroke-width=".8"/>`:`<ellipse cx="${x+w/2}" cy="${y+h/2}" rx="${w/2}" ry="${h/2}" fill="#c3a86d" stroke="#44351f"/>`}
  d.parts.forEach(p=>{const state=st.parts[p.id];s+=`<g class="pt" data-p="${p.id}" style="cursor:pointer">`;if(state==='removed'){s+=`<rect x="${p.x}" y="${p.y}" width="${p.w}" height="${p.h}" rx="5" fill="#0b281f" stroke="#d8b24a" stroke-width="2" stroke-dasharray="5 4"/>`}else{s+=`<g filter="url(#sh)">${partArt(p,state)}</g>`;if(state==='broken')s+=`<circle cx="${p.x+p.w*.7}" cy="${p.y+p.h*.4}" r="${Math.min(p.w,p.h)*.38}" fill="url(#burn)"/>`;if(state==='new')s+=`<rect x="${p.x-2}" y="${p.y-2}" width="${p.w+4}" height="${p.h+4}" rx="6" fill="none" stroke="#7fe0c8" stroke-width="2"/>`}s+=`<text x="${p.x+p.w/2}" y="${p.y+p.h+13}" fill="#fff" font-size="10.5" text-anchor="middle" stroke="#04140d" stroke-width="3" paint-order="stroke">${p.label}</text></g>`});
  (st.micro||[]).forEach(m=>{const x=m.x,y=m.y,w=m.w,h=m.h,n=Math.max(2,Math.floor(w/3));s+=`<g class="micro-chip" data-micro="${m.id}" style="cursor:pointer"><rect class="micro-hit" x="${x-5}" y="${y-5}" width="${w+10}" height="${h+10}"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="1.5" fill="${m.state==='broken'?'#45242a':'#151a22'}" stroke="#04070b" stroke-width="1.1"/>`;for(let i=0;i<n;i++){const px=x+1+(w-2)*(i/(n-1));s+=`<rect x="${px-.7}" y="${y-2.5}" width="1.4" height="2.5" fill="#c9c5b1"/><rect x="${px-.7}" y="${y+h}" width="1.4" height="2.5" fill="#c9c5b1"/>`}s+=`<circle cx="${x+2}" cy="${y+2}" r=".7" fill="#a7adba"/><text x="${x+w/2}" y="${y+h*.72}" fill="#9ca6ae" font-size="${Math.min(4.4,w*.3)}" text-anchor="middle">${m.ref}</text></g>`});
  st.dirt.forEach((x,i)=>{if(x.a>.02)s+=`<circle class="dirt" data-i="${i}" cx="${x.x}" cy="${x.y}" r="${x.r*1.4}" fill="url(#grime)" opacity="${x.a}"/>`});
  s+=smdLayer(j)+partPinLayer(j)+smdPinLayer(j);
  s+=`<text x="200" y="294" fill="#d9d6b7" text-anchor="middle" font-family="monospace" font-size="8" letter-spacing="2">${d.name.toUpperCase()} · MAIN LOGIC BOARD · REV ${j.id%9+1}.0</text></g></svg>`;
  return s;
}
const _deviceSvgUpgrade=deviceSvg;
deviceSvg=function(j,clean){
  if(j&&j.st&&j.st.boardOut)return boardOnlySvg(j,clean);
  let svg=_deviceSvgUpgrade(j,clean);
  const frame=svgFrame(DEV[j.dev]);
  const displayWidth=Math.min(560,Math.round(frame.width*1.12));
  svg=svg.replace(/width:min\(100%,\d+px\)/,`width:min(100%,${displayWidth}px)`);
  if(j&&j.st&&j.st.coverOff)svg=svg.replace('</g></svg>',smdLayer(j)+partPinLayer(j)+smdPinLayer(j)+'</g></svg>');
  return svg;
};
function jointArray(st,p){return st.joints[p.id]||(st.joints[p.id]=Array(partPinCount(p)).fill(false))}
function finishPartRemoval(j,p,wasGood){
  const st=j.st;st.parts[p.id]='removed';delete st.checked[p.id];
  matPush(j,{id:'part:'+p.id,label:p.label,kind:'part',partId:p.id,faulty:true,day:S.day});
  sayBench(wasGood?p.label+' war noch in Ordnung. Durch das Auslöten ist es beschädigt und liegt jetzt auf der ESD-Matte.':'Alle Lötstellen von '+p.label+' sind gelöst. Das defekte Teil liegt auf der ESD-Matte.');
}
function processPartPin(j,pid,index){
  const st=j.st,d=DEV[j.dev],p=d.parts.find(x=>x.id===pid);if(!p)return;
  const state=st.parts[pid];let pins=jointArray(st,p);const n=pins.length;  if(!st.coverOff||!st.boardOut){sayBench('Baue zuerst die Platine mit der Hand oder dem Spudger aus.');return}
  if(tool!=='solder'&&tool!=='hotair'){sayBench('Für jede einzelne Lötstelle brauchst du den Lötkolben oder die freigeschaltete Heißluftstation.');return}
  if(state==='removed'){
    if(!S.inv[partKey(j.dev,pid)]){sayBench('Ersatzteil fehlt. Bestelle '+p.label+' im PC-Shop.');return}
    S.inv[partKey(j.dev,pid)]--;st.parts[pid]='installing';st.joints[pid]=Array(n).fill(true);pins=st.joints[pid];sayBench('Ersatzteil '+p.label+' eingesetzt. Löte jetzt jeden Kontakt einzeln fest.');
  }
  if(st.parts[pid]==='installing'){
    if(!pins[index]){sayBench('Diese Lötstelle ist bereits fest.');return}
    pins[index]=false;const done=pins.every(x=>!x);
    if(done){st.parts[pid]='new';sayBench(p.label+': alle '+n+' Kontakte sind wieder verlötet.');sfx(1050,.11,'triangle')}
    else sayBench(p.label+': Kontakt '+(index+1)+' von '+n+' verlötet.');
  }else if(state==='ok'||state==='broken'||state==='new'){
    if(pins[index]){sayBench('Diese Lötstelle ist bereits gelöst.');return}
    pins[index]=true;const loose=pins.filter(Boolean).length;
    if(loose===n){finishPartRemoval(j,p,state!=='broken');sfx(150,.15,'sawtooth')}
    else sayBench(p.label+': '+loose+'/'+n+' Lötstellen gelöst. Löte die übrigen Kontakte einzeln aus.');
  }else{sayBench('Dieser Anschluss ist gerade nicht bearbeitbar.');return}
  save();renderBench();renderTabs();
}
function processSmdPin(j,smdId,index){
  const st=j.st,m=(st.smdParts||[]).find(x=>x.id===smdId);if(!m)return;
  if(!st.coverOff||!st.boardOut){sayBench('Baue die Platine zuerst aus, um die SMD-Lötstellen zu erreichen.');return}
  if(tool!=='solder'&&tool!=='hotair'){sayBench('Für jede SMD-Lötstelle brauchst du den Lötkolben oder die Heißluftstation.');return}
  if(m.state==='removed'){
    const key=smdKey(j.dev,m.type);if(!(S.inv[key]>0)){sayBench('Ersatz fehlt: '+m.label+'. Bestelle das SMD-Bauteil im PC-Shop.');return}
    S.inv[key]--;m.state='installing';m.pinOut=[true,true];sayBench(m.label+' eingesetzt. Löte beide Kontakte einzeln fest.');
  }
  if(m.state==='installing'){
    if(!m.pinOut[index]){sayBench('Dieser SMD-Kontakt ist bereits verlötet.');return}
    m.pinOut[index]=false;
    if(m.pinOut.every(x=>!x)){m.state='new';sayBench(m.id+': beide Kontakte sind verlötet.');sfx(1050,.1,'triangle')}
    else sayBench(m.id+': Kontakt '+(index+1)+'/2 verlötet.');
  }else if(m.state==='ok'||m.state==='new'||m.state==='broken'){
    if(m.pinOut[index]){sayBench('Dieser SMD-Kontakt ist bereits gelöst.');return}
    m.pinOut[index]=true;
    if(m.pinOut.every(Boolean)){
      m.state='removed';matPush(j,{id:'smd:'+m.id,label:m.id+' '+m.label,kind:'smd',smdId:m.id,faulty:true,day:S.day});
      sayBench(m.label+': beide Lötstellen gelöst. Das Bauteil liegt auf der ESD-Matte.');sfx(145,.15,'sawtooth');
    }else sayBench(m.id+': erste Lötstelle gelöst. Noch 1 Kontakt fehlt.');
  }
  save();renderBench();renderTabs();
}
function processMicroPin(j,microId,index){
  const st=j.st,m=(st.micro||[]).find(x=>x.id===microId);if(!m)return;
  const info=microInfo(m.type),n=microPinCount(m);m.pinOut=m.pinOut||Array(n).fill(false);
  if(!st.coverOff||!st.boardOut){sayBench('Baue die Platine zuerst aus, um die winzigen IC-Pins zu erreichen.');return}
  if(!m.identified){sayBench('Unbekannter Chip '+m.ref+'. Erst mit dem CT-08-Chip-Tester identifizieren.');return}
  if(tool!=='solder'&&tool!=='hotair'){sayBench('Wähle Lötkolben oder Heißluft und löse jeden Chip-Pin einzeln.');return}
  if(m.state==='removed'){
    const key=microKey(j.dev,m.type);if(!(S.inv[key]>0)){sayBench('Ersatz fehlt: '+info.label+'. Bestelle genau diesen Chip im Shop.');return}
    S.inv[key]--;m.state='installing';m.pinOut=Array(n).fill(true);m.damaged=false;sayBench(info.label+' eingesetzt. Jetzt jeden einzelnen Pin wieder anlöten.');
  }
  if(m.state==='installing'){
    if(!m.pinOut[index]){sayBench('Dieser Pin ist bereits verlötet.');return}
    m.pinOut[index]=false;const done=m.pinOut.every(x=>!x);
    if(done){m.state='new';m.fault=false;sayBench(m.ref+': alle '+n+' Pins sind verlötet. Chip sitzt fest.');sfx(1080,.12,'triangle')}
    else sayBench(m.ref+': Pin '+(index+1)+'/'+n+' verlötet.');
  }else if(m.state==='ok'||m.state==='broken'||m.state==='new'){
    if(m.pinOut[index]){sayBench('Dieser Pin ist bereits ausgelötet.');return}
    const wasGood=m.state!=='broken';if(wasGood)m.damaged=true;
    m.pinOut[index]=true;const loose=m.pinOut.filter(Boolean).length;
    if(loose===n){m.state='removed';m.removed=true;matPush(j,{id:'micro:'+m.id,label:m.ref+' '+info.label,kind:'micro',microId:m.id,faulty:true,day:S.day});sayBench(m.ref+': alle '+n+' Pins sind ausgelötet. Der Chip liegt jetzt auf der ESD-Matte.');sfx(145,.16,'sawtooth')}
    else sayBench(m.ref+': '+loose+'/'+n+' Pins ausgelötet. Jeder Pin muss einzeln gelöst werden.');
  }else{sayBench('Dieser Chip kann gerade nicht bearbeitet werden.');return}
  save();renderBench();renderTabs();
}
function attach3DRotation(j){
  if(window.Kuroneko3D){window.Kuroneko3D.attachRotation(j);return;}
  const svg=$('#dsv');if(!svg)return;svg.style.opacity='1';
}
function attachScrewHold(j){
  const st=j.st,d=DEV[j.dev],tbl=$('#tbl');if(!tbl)return;
  tbl.querySelectorAll('.sc').forEach(g=>{
    g.onclick=null;let timer=null,done=false;const i=+g.dataset.i;
    g.addEventListener('pointerdown',e=>{
      e.preventDefault();if(tool!=='driver'){sayBench('Wähle den Schraubenzieher. Halte dann jede Schraube 3 Sekunden gedrückt.');return}
      if(!st.flipped||st.coverOff){sayBench('Die Schrauben sitzen auf der Rückseite. Drehe das Gerät zuerst um.');return}
      if(st.closing){if(!st.screwOut[i]){sayBench('Diese Schraube sitzt bereits fest.');return}st.screwOut[i]=false;st.screwsInBowl[i]=false;st.sOut=st.screwOut.filter(Boolean).length;sayBench(st.sOut?'Noch '+st.sOut+' Schrauben einsetzen.':'Alle Schrauben sitzen. Drehe das Gerät zurück.');save();renderBench();return}
      if(st.screwOut[i]){sayBench('Diese Schraube ist bereits gelöst und liegt in der Magnetschale.');return}
      done=false;g.classList.add('holding');sayBench('Schraube '+(i+1)+' lösen … halte 3 Sekunden gedrückt.');
      try{g.setPointerCapture(e.pointerId)}catch(_){ }
      timer=setTimeout(()=>{done=true;st.screwOut[i]=true;st.screwsInBowl[i]=true;st.sOut=st.screwOut.filter(Boolean).length;g.classList.remove('holding');sfx(850,.1,'triangle');sayBench('Schraube '+(i+1)+' gelöst und automatisch in die Magnetschale gelegt ('+st.sOut+'/'+d.screws+').');save();renderBench()},3000);
    });
    const cancel=()=>{if(timer&&!done){clearTimeout(timer);timer=null;g.classList.remove('holding');sayBench('Zu früh losgelassen. Halte die Schraube volle 3 Sekunden gedrückt.')} };
    g.addEventListener('pointerup',cancel);g.addEventListener('pointercancel',cancel);
  });
}
function attachBoardActions(j){
  const st=j.st,acts=$('#acts');if(!acts)return;
  const add=(id,label,cls,fn)=>{if($('#'+id))return;const b=document.createElement('button');b.id=id;b.className='btn '+(cls||'');b.textContent=label;b.onclick=fn;acts.appendChild(b)};
  if(st.coverOff&&!st.closing&&!st.boardOut)add('a_boardout','Platine ausbauen','pink',()=>{if(tool!=='hand'&&tool!=='spudger'){sayBench('Wähle die Hand oder den freigeschalteten ESD-Spudger.');return}st.boardOut=true;sfx(360,.15,'triangle');sayBench('Platine vorsichtig ausgebaut. Du kannst sie jetzt separat in 3D drehen und von beiden Seiten bearbeiten.');save();renderBench()});
  if(st.coverOff&&!st.closing&&st.boardOut)add('a_boardin','Platine wieder einsetzen','',()=>{if(tool!=='hand'&&tool!=='spudger'){sayBench('Zum Einsetzen brauchst du die Hand oder den ESD-Spudger.');return}st.boardOut=false;sfx(620,.12,'triangle');sayBench('Platine sitzt wieder im Gehäuse.');save();renderBench()});
  add('a_rotate_reset','3D-Ansicht zurücksetzen','alt',()=>{if(st.boardOut){st.boardRotX=21;st.boardRotY=-14}else{st.viewRotX=13;st.viewRotY=-17}renderBench()});
}
function attachPinActions(j){
  const tbl=$('#tbl'),st=j.st,d=DEV[j.dev],svg=tbl&&tbl.querySelector('#dsv');
  if(!tbl||!svg)return;
  tbl.querySelectorAll('.pt,.micro-chip,.smd-chip,.dirt,.part-pin,.micro-pin,.smd-pin').forEach(el=>{el.onclick=null});
  svg.addEventListener('click',e=>{
    const hit=e.target&&e.target.closest?e.target.closest('.part-pin,.micro-pin,.smd-pin,.pt,.micro-chip,.smd-chip,.dirt'):null;
    if(!hit||!svg.contains(hit))return;
    e.preventDefault();e.stopPropagation();animateToolAction(hit);
    if(hit.classList.contains('part-pin')){processPartPin(j,hit.dataset.p,Number(hit.dataset.pin));return}
    if(hit.classList.contains('micro-pin')){processMicroPin(j,hit.dataset.micro,Number(hit.dataset.pin));return}
    if(hit.classList.contains('smd-pin')){processSmdPin(j,hit.dataset.smd,Number(hit.dataset.pin));return}
    if(hit.classList.contains('dirt')){
      if(tool==='ultrasonic'){
        if(!st.coverOff){sayBench('Öffne zuerst das Gerät und lege die Platine frei.');return}
        st.dirt.forEach(x=>x.a=0);sfx(420,.2,'sine');sayBench('Ultraschallreinigung abgeschlossen. Feine Verschmutzungen wurden entfernt.');save();renderBench();
      }else if(tool==='brush'||tool==='cloth')sayBench('Ziehe den Pinsel oder das Alkohol-Tuch über die verschmutzte Fläche.');
      else sayBench('Wähle Pinsel, Tuch + Alkohol oder das Ultraschallbad zum Reinigen.');
      return;
    }
    if(hit.classList.contains('pt')){
      const p=d.parts.find(x=>x.id===hit.dataset.p);if(!p)return;
      const state=st.parts[p.id];
      if(!st.coverOff){sayBench('Erst das Gerät umdrehen, die Schrauben lösen und den Rückdeckel abnehmen.');return}
      if(tool==='meter'){
        if(state==='removed'){sayBench(p.label+': Bauteil fehlt. Hier kann nichts gemessen werden.');return}
        st.checked[p.id]=state==='broken'?'bad':'ok';sayBench(p.label+': '+(state==='broken'?'Defekt erkannt.':'Durchgang in Ordnung.'));
        sfx(state==='broken'?190:1180,.1);save();renderBench();return;
      }
      if(tool==='tweezers'){
        if(p.attach!=='socket'){sayBench(p.label+' ist verlötet. Dafür brauchst du den Lötkolben und die einzelnen Lötpads.');return}
        if(state==='removed'){
          const key=partKey(j.dev,p.id);if(!(S.inv[key]>0)){sayBench('Kein Ersatz für '+p.label+' auf Lager. Bestelle ihn im PC-Shop.');return}
          S.inv[key]--;st.parts[p.id]='new';const mi=(st.matItems||[]).findIndex(x=>x.id==='socket:'+p.id);if(mi>=0)st.matItems.splice(mi,1);
          sayBench('Ersatzteil '+p.label+' mit der Pinzette eingesetzt.');sfx(980,.1,'triangle');save();renderTabs();renderBench();return;
        }
        if(state==='ok'||state==='broken'||state==='new'){
          st.parts[p.id]='removed';delete st.checked[p.id];matPush(j,{id:'socket:'+p.id,label:p.label,kind:'socket',partId:p.id,faulty:state==='broken',day:S.day});
          sayBench(p.label+' vorsichtig aus dem Steckplatz gehoben und auf der Matte abgelegt.');sfx(650,.08);save();renderBench();return;
        }
      }
      if(tool==='solder'||tool==='hotair'){
        if(!st.boardOut){sayBench('Baue die Platine zuerst aus. Danach kannst du jede goldene Lötstelle einzeln anklicken.');return}
        sayBench('Klicke die einzelnen goldenen Lötpads am Rand von '+p.label+'. Jeder Kontakt muss separat gelöst werden.');return;
      }
      sayBench('Für '+p.label+' kannst du das Messgerät, die Pinzette (bei Steckverbindern) oder Lötkolben/Heißluft an den einzelnen Kontakten nutzen.');
      return;
    }
    if(hit.classList.contains('micro-chip')){
      const m=(st.micro||[]).find(x=>x.id===hit.dataset.micro);if(!m)return;const info=microInfo(m.type);
      if(!st.coverOff){sayBench('Öffne zuerst das Gerät, um an die Platine zu kommen.');return}
      if(tool==='chiptest'){
        m.identified=true;sayBench(m.ref+' erkannt: '+info.label+'. '+info.desc+'. Zustand: '+(m.state==='broken'?'DEFEKT':m.state==='removed'?'ausgebaut':m.state==='installing'?'wird eingelötet':'in Ordnung')+'.');
        sfx(m.state==='broken'?190:1120,.12);save();renderBench();return;
      }
      if(tool==='microscope'){
        st.magnifiedChip=st.magnifiedChip===m.id?null:m.id;sayBench(st.magnifiedChip?m.ref+' wird unter dem Digitalmikroskop vergrößert.':m.ref+' wieder in Normalgröße.');
        save();renderBench();return;
      }
      if(tool==='meter'){sayBench('Das Messgerät zeigt elektrische Werte. Für die genaue Funktion und den Namen brauchst du den CT-08-Chip-Tester.');sfx(m.state==='broken'?180:1080,.08);return}
      if(tool==='solder'||tool==='hotair'){
        if(!m.identified){sayBench('Unbekannter Chip '+m.ref+'. Erst mit dem CT-08 identifizieren.');return}
        sayBench('Löte nicht auf dem Chipkörper: Klicke jeden einzelnen goldenen Pin am Rand.');return;
      }
      if(tool==='tweezers'){sayBench(m.ref+' ist fest verlötet. Löse zuerst alle Pins mit dem Lötkolben.');return}
      sayBench('Mit dem CT-08 identifizierst du '+m.ref+'. Zum Auslöten brauchst du Lötkolben oder Heißluft.');return;
    }
    if(hit.classList.contains('smd-chip')){
      const m=(st.smdParts||[]).find(x=>x.id===hit.dataset.smd);if(!m)return;
      if(tool==='meter'){
        st.checkedSmd=st.checkedSmd||{};st.checkedSmd[m.id]=m.state==='broken'?'bad':'ok';
        sayBench(m.id+': '+m.label+' · '+(m.state==='removed'?'fehlt':m.state==='installing'?'wird verlötet':m.state==='broken'?'defekt':'Wert im Soll.'));
        sfx(m.state==='broken'?180:1080,.08);save();return;
      }
      if(tool==='solder'||tool==='hotair'){sayBench('Löse die zwei goldenen Kontakte von '+m.id+' einzeln. Das Bauteil ist erst nach beiden Pins frei.');return}
      if(tool==='tweezers'){sayBench(m.id+' ist aufgelötet. Verwende Lötkolben oder Heißluft an beiden Kontakten.');return}
      sayBench('Wähle das Messgerät zum Prüfen oder den Lötkolben für die einzelnen Kontakte.');
    }
  });
}
function attachToolCursor(j){
  const tbl=$('#tbl');if(!tbl)return;
  let cursor=$('#tool-cursor');
  if(!cursor){cursor=document.createElement('div');cursor.id='tool-cursor';cursor.className='tool-cursor';cursor.setAttribute('aria-hidden','true');cursor.innerHTML='<span class="tool-cursor-icon"></span><small></small>';tbl.appendChild(cursor)}
  const selected=TOOLS.find(x=>x.id===tool);
  cursor.querySelector('.tool-cursor-icon').textContent=selected?selected.icon:'✋';
  cursor.querySelector('small').textContent=selected?selected.name:'Hand';
  tbl.onpointermove=e=>{const r=tbl.getBoundingClientRect();cursor.style.left=(e.clientX-r.left)+'px';cursor.style.top=(e.clientY-r.top)+'px';cursor.classList.add('visible')};
  tbl.onpointerleave=()=>cursor.classList.remove('visible');
  tbl.onpointerdown=()=>{cursor.classList.remove('is-working');void cursor.offsetWidth;cursor.classList.add('is-working')};
}
function animateToolAction(target){
  const cursor=$('#tool-cursor');
  if(cursor){cursor.classList.remove('is-working');void cursor.offsetWidth;cursor.classList.add('is-working')}
  if(target&&target.classList){target.classList.remove('tool-contact');void target.getBoundingClientRect();target.classList.add('tool-contact');setTimeout(()=>target.classList.remove('tool-contact'),320)}
}
function enhanceBench(){
  const j=benchJob();if(!j||!j.st)return;prepareBenchState(j);
  const st=j.st;
  $('#tools')?.querySelectorAll('button[data-t]').forEach(b=>{
    const t=TOOLS.find(x=>x.id===b.dataset.t);if(!t)return;const locked=!toolIsUnlocked(t);b.disabled=locked;
    const small=b.querySelector('small');if(small){small.textContent=locked?`🔒 Freischaltung: ${t.unlock} abgeholte Reparaturen`:t.sub;small.classList.toggle('unlock-label',locked)}
    b.title=locked?`Wird nach ${t.unlock} abgeholten Reparaturen freigeschaltet`:t.sub;
  });
  const head=$('.bench > .row');if(head&&!$('#bench-controls')){const controls=document.createElement('div');controls.id='bench-controls';controls.className='bench-controls';controls.innerHTML='<span class="tag">3D: Ziehe auf einer freien Stelle zum Drehen</span><span class="tag">SMD: jeden Pin einzeln löten</span><span class="tag">Schrauben: 3 Sekunden halten</span>';head.insertAdjacentElement('afterend',controls)}
  attachScrewHold(j);attachPinActions(j);attachBoardActions(j);attach3DRotation(j);attachToolCursor(j);drawMatExtras(j);
  const closeBtn=$('#a_on');
  if(closeBtn){
    const baseClose=closeBtn.onclick;
    closeBtn.onclick=function(){
      const loosePart=DEV[j.dev].parts.some(p=>(st.joints[p.id]||[]).some(Boolean));
      const looseChip=(st.micro||[]).some(m=>m.state==='installing'||(m.pinOut||[]).some(Boolean));
      const looseSmd=(st.smdParts||[]).some(m=>m.state==='installing'||m.state==='removed'||(m.pinOut||[]).some(Boolean));
      if(st.boardOut){sayBench('Die Platine muss zuerst wieder ins Gerät eingesetzt werden.');return}
      if(loosePart||looseChip||looseSmd||Object.values(st.parts).includes('installing')){sayBench('Noch nicht schließen: Löte erst alle einzelnen Kontakte vollständig fest.');return}
      if(baseClose)baseClose();
    };
  }
}
const _renderBenchUpgrade=renderBench;
renderBench=function(){const current=benchJob();if(current&&current.st)prepareBenchState(current);_renderBenchUpgrade();enhanceBench()};
const _testDeviceUpgrade=testDevice;
testDevice=function(j,clean){
  prepareBenchState(j);const st=j.st,d=DEV[j.dev];
  const loosePart=d.parts.some(p=>(st.joints[p.id]||[]).some(Boolean));
  const looseChip=(st.micro||[]).some(m=>m.state==='installing'||(m.pinOut||[]).some(Boolean));
  const looseSmd=(st.smdParts||[]).some(m=>m.state==='installing'||m.state==='removed'||(m.pinOut||[]).some(Boolean));
  const loosePartState=Object.values(st.parts).includes('installing');
  if(st.boardOut||loosePart||looseChip||looseSmd||loosePartState){sayBench('Vor dem Funktionstest: Platine einsetzen, alle einzelnen Lötstellen schließen und alle Chips vollständig verlöten.');renderBench();return}
  _testDeviceUpgrade(j,clean);
};

/* ===== START ===== */
(function boot(){
  const s=load();
  if(s){S=s;S.nid=S.nid||100;if(S.phase==='end'){newGame()}}else newGame();
  Object.assign(NODES,S.fn||{});
  S.jobs.forEach(j=>{if(j.st&&j.st.dirt==null)j.st=null;if(j.st){if(j.st.flipped===undefined)j.st.flipped=false;if(!j.st.mistakes)j.st.mistakes=[];if(j.st.closing===undefined)j.st.closing=false;}});
  go('shop');
  if(!s){
    $('#ovbox').innerHTML=`<h2>Willkommen bei Kuroneko Repair</h2><p>Tokyo, 2005. Du führst einen kleinen Reparaturladen. Drehe Geräte um, halte jede Schraube 3 Sekunden gedrückt und sie landet automatisch in der Magnetschale. Öffne das Gehäuse und baue die Platine aus. Ziehe an freien Stellen, um Gerät und Platine in 3D-Perspektive zu drehen. Identifiziere winzige ICs mit dem CT-08 und löte jeden einzelnen Pin sowie jede Lötstelle separat. Ausgebaute Teile landen auf der ESD-Matte; defekte Teile kannst du in den Mülleimer werfen. Neue Werkzeuge werden mit abgeholten Reparaturen freigeschaltet. Pass auf: Intakte Teile können versehentlich beschädigt werden. Nach dem Funktionstest darfst du reparierte Geräte ausprobieren, bis sie abgeholt werden. Bestelle Ersatzteile am PC.</p><button class="btn pink" id="go">Laden öffnen</button>`;
    $('#ov').hidden=false;$('#go').onclick=()=>{$('#ov').hidden=true;sfx(660,.1)};
  }
})();