(()=>{'use strict';
const TOUCH=!!(window.matchMedia&&matchMedia('(pointer:coarse)').matches&&!matchMedia('(any-pointer:fine)').matches);
/* =====================================================================
   B's JOURNAL - draft 5 - Belinda Ortlepp
   Anything not drawn yet shows as a square with an X. Put PNGs in the
   assets folder with the exact names and they replace the X squares.
   All the text you may want to edit is in the CONTENT section below.
   ===================================================================== */
const W=480,H=270,GROUND=240;
const FP='"Pixelta","InterB",sans-serif',FB='"InterB","Helvetica Neue",Arial,sans-serif';
const SHOW_LABELS=true;                 // file-name labels on the X squares (false hides them)
const FIRE_FPS=3;
const ZOOM_SCALE=3;                     // how far the camera zooms into a stall (whole numbers stay crisp)
const HAIR_SCALE=1.12,HAIR_DY=4,HAIR_PIVOT=[94,193];
const HAIR_SEQ=[[1,.42],[2,.42],[3,.42],[4,.42]];
const TAIL_FPS=3;
const BTN_ART={x:13,y:6,w:103,h:18},BTN_SCALE=1.25,BTN_GAP=5,BTN_TEXT=11;
const LOGO_VIS={x:142,y:22,w:201,h:59},LOGO_TEXT={cx:243.5,cy:60.5,size:26};
const HILL_TOP=185;
const INTRO={sky:[0,.3],cloud1:[.25,.6],cloud2:[.55,.6],hillFar:[1.0,.7],hillNear:[1.2,.7],logo:[1.9,.8],buttons:[2.75,.3]};
const INTRO_END=3.1;
const LAMP_CX=344.5;                    // the lamp's centre inside bg-all-lamp.png (it is drawn at its exact height)

/* ---------- CONTENT (edit these) ---------- */
const CV_FILE='assets/Belinda-Ortlepp-CV.pdf';
const WEBSITE_URL='';                   // put your published site address here (it then appears on the contact page)
const CONTACT={
  heading:"Thanks for playing! Let's talk:",
  items:[
    {icon:'email-icon',   label:'Email',    sub:'belinda.ortlepp@gmail.com', url:'mailto:belinda.ortlepp@gmail.com'},
    {icon:'linkedin-icon',label:'LinkedIn', sub:'belinda-ortlepp',            url:'https://www.linkedin.com/in/belinda-ortlepp-29aaa52b4/'},
    {icon:'behance-icon', label:'Behance',  sub:'belindaortlepp',             url:'https://www.behance.net/belindaortlepp'},
    {icon:'CV-icon',      label:'My CV',    sub:'Download (PDF)',             url:CV_FILE,download:'Belinda-Ortlepp-CV.pdf'},
    ...(WEBSITE_URL?[{icon:'website-icon',label:'Website',sub:WEBSITE_URL.replace(/^https?:\/\//,''),url:WEBSITE_URL}]:[])]};
const INTRO_LINES=[
  {who:'Belinda',t:"Hi, I'm Belinda Ortlepp, a motion designer who enjoys giving ideas a story, a sense of character, and a reason to exist."},
  {who:'Belinda',t:"I work across animation, 3D designs, visual storytelling, and digital experiences."},
  {who:'Belinda',t:"I'm a bit of a jack of all trades: I move between animation, 3D, illustration, pixel art and interface design, and I like letting each one make the others better."},
  {who:'Belinda',t:"What connects these interests is my curiosity about how people feel when they encounter a piece of work, whether they are watching a short film, exploring an interface, or discovering a brand for the first time."},
  {who:'Peanut',t:"Mrrp. I'm Peanut, Belinda's guide. This whole website is a game, and every picture in it was drawn by hand."},
  {who:'Peanut',t:"Belinda believes human-made work has meaning and individuality, so she drew it all herself, one pixel at a time. A portfolio should be something you explore, not just scroll past."},
  {who:'Peanut',t:"Walk around, open the market stalls to see her work, collect the floating journal pages to read what drives her, and use the map to visit anywhere you like. Everything you find is saved in your journal."}];
const BEHANCE_LABEL='VIEW FULL PROJECT ON BEHANCE';
const WORKS=[
 {id:'a',short:'RED BULL',title:'Red Bull | Marketing Campaign',year:'2025',tools:'Figma, Adobe software',team:'',
  problem:'Create an interconnected transmedia campaign for Red Bull based on their tagline, "Red Bull gives you wings."',
  insight:"The Wright Experiment: linking the experimental nature of the Wright brothers with Red Bull's experimental stunts.",
  solution:'A campaign across WhatsApp Channels, a limited edition Legacy Edition can, a YouTube video ad and Instagram student awards.',
  link:'https://www.behance.net/gallery/256454377/Red-Bull-Marketing-Campaign',
  skills:[[0,'Figma'],[0,'Adobe software'],[1,'Brand and marketing'],[1,'Design Centered Research'],[2,'Strong communication'],[2,'Time management'],[2,'Working under pressure']]},
 {id:'b',short:'LIGHT WEIGHT',title:'The Light Weight | Motion Tracking',year:'2026',tools:'Blender, Adobe software',team:'',
  problem:'Create a 3D object to place in a 3D tracked scene that you filmed.',
  insight:'Creating a gnome that wants to be a paperweight, but has fallen asleep.',
  solution:'A sleepy 3D gnome, modelled in Blender and motion tracked into my own filmed scene.',
  link:'https://www.behance.net/gallery/256451775/Paperweight',
  skills:[[0,'Blender'],[0,'Adobe software'],[0,'Video editing'],[1,'Motion tracking'],[1,'Photography'],[2,'Fast learner']]},
 {id:'c',short:'GOOD COFFEE',title:'GOOD COFFEE | UI/UX Design',year:'2025',tools:'Figma, Adobe software',team:'',
  problem:'Create animated UI components to feature during the online order section of a mobile app.',
  insight:'Create a progress bar, loading spinner, and error message that matches the style of Good Coffee Great Coffee.',
  solution:'Animated payment, notification, loading and error screens, planned with sketches and low fidelity wireframes.',
  link:'https://www.behance.net/gallery/256455467/GOOD-COFFEE-UIUX-Design',
  skills:[[0,'Figma'],[0,'Adobe software'],[1,'UI/UX design'],[1,'UI animation'],[2,'Problem solving'],[2,'Adaptability']]},
 {id:'d',short:"L'OREAL",title:"L'OREAL Brandstorm | Fragrance System",year:'2026',tools:'Blender, Adobe software',team:'Group project with Nwabisa Mguda and Hareaipha Monyane',
  problem:'Fragrance is overwhelming, and lack innovation in layering for men. Trial systems come at high costs.',
  insight:'Create a fragrance system that eliminates decision fatigue, and creates a customisable experience.',
  solution:'A customisable 3D perfume bottle system, developed from sketches and modelled and rendered in Blender.',
  link:'https://www.behance.net/gallery/256453947/LOREAL-Perfume-Bottle-System',
  skills:[[0,'Adobe software'],[0,'Blender'],[1,'Brand and marketing'],[1,'Design Centered Research'],[2,'Teamwork'],[2,'Problem solving']]}];
const metaOf=w=>[['Year',w.year],['Tools',w.tools],['Team',w.team]].filter(m=>m[1]);
const sectionsOf=w=>[['The problem',w.problem],['Insight',w.insight],['Solution',w.solution]];
const MILESTONES=[
 {h:'Accomplishment',t:'Loeries Bronze Winner.'},
 {h:'Accomplishment',t:'Pendoring Finalist.'},
 {h:'Accomplishment',t:"L'Oreal Brandstorm 2026: Nominated Participant."},
 {h:'Accomplishment',t:'Golden Key International Honours Society: Member.'},
 {h:'Education',t:'Emeris IIE University: Experience Design specialising in Motion Design, 2024 to current.'},
 {h:'Education',t:'Randburg High School: High School Diploma at NSC level.'}];
const SKILL_CATS=['Software and tools','Design and motion'];
WORKS.forEach(w=>{w.skills=w.skills.filter(x=>x[0]<SKILL_CATS.length);});

const POSITIONING="For my clients, my personal brand is unique amongst creative Motion Designers because I put the opinion of my client first, drive my work with passion and quality and take every opportunity to learn from mistakes.";
const PROMISE="For my clients, I can provide quality, human-generated work that can only improve from a client's feedback, so that the client can proudly advertise or publish my work under their brand and get the ideal outcome from it.";
const PAGES=[
{short:'Human made',title:"My designs are meant to be human created.",body:"I find a lot of value in human created work and delivering something I created myself from start to finish. In the world of developing AI, where it becomes harder to distinguish what is real and what is not, I personally hate to see an advertisement that was clearly done by AI. It lacks meaning and individuality, which is important in the process of design."},
{short:'Always learning',title:"Whatever I am doing is an opportunity to learn.",body:"Feedback is important to me as a designer, especially when it comes from a client themself. I am never married to my own designs, and I know when something is meant to be left out of a design, I will do so without any hardships. A client's opinion is what matters at the end of the day, and if they expect something of me that I have never delivered on before, I will learn to do so instead of turning the opportunity away."},
{short:'Quality, on time',title:"I will always try to produce the best quality work in time.",body:"When I am met with a deadline, I will coordinate my tasks from the day I get the brief to the day it is due. I do not believe in doing everything a few days before the deadline, as it's impossible to know if I will find the perfect design on the first go. I will design, ask for feedback and improve my work as time goes on. Often, this process is expected to repeat multiple times until the client is satisfied, that is why I will give myself the time to make those improvements."},
{short:'Best foot forward',title:"I will always put my best foot forward.",body:"Whether it comes to presenting myself or my work, it is important to me that an employer or client will only see my best. There is a balance in seeing the good and the bad, but only if there is a promise for improvement, which is putting my best foot forward."},
{short:'Passion over money',title:"I will strive to be driven by interest and passion rather than money.",body:"I would rather like to work in my dream career and on projects that excite me, than working a dead-end job just because it pays more money. It's always been said that if you work with your hobbies and interests, you will never work a day in your life. I would like to not feel dread when I get a brief or must meet with a client."},
{short:'Better each design',title:"I will strive to be better with each design through hard work.",body:"Designing might be born from talent but is only maintained and improved through hard work. My career is an opportunity to put myself in an exponential growing curve. If I find that my work is stagnant or not improving at a similar pace than peers or coworkers, it's my sign to work harder or try a new avenue for a career."},
{short:'Personal ethics',title:"I will always stand by my personal ethics.",body:"To me, my work should reflect who I am as a person. I find it difficult to work on something I don't agree with or goes against my list of personal values. I find it important to have a job or meet with a client whose brand is already aligned with myself. It makes it easier to work for them and deliver exactly what they are looking for."}];
const nFound=()=>save.pages.length;

/* ---------- ZONES ---------- */
const WORKX=[190,460,730,1000];
const ZONES=[
{id:'hub',title:'The Hilltop Camp',sub:'About Me',segs:['hub'],cat:'Mrrp. Walk right to start the quest!',lamps:[360,680],
 props:[
  {key:'about-signpost',ph:[27,39],x:240,label:'Signpost',beam:'HELLO',tx:0,ty:10.5,tsize:8,kind:'dialog',lines:()=>[
    {who:'Belinda',t:"Welcome to my journal! Here is what to expect: this camp is all about me, the market ahead has my four projects, and the campfire at the end is where you can say hello."},
    {who:'Peanut',t:"Mrrp. Floating pages along the path are Belinda's Design Manifesto. Collect them all. Everything you find is saved in your journal, and J opens it any time."}]},
  {key:'about-signpost-large',ph:[54,84],x:480,label:'Signpost',texts:[['PROMISE',-.5,14,8],['POSITIONING',-1,30,8]],kind:'dialog',lines:()=>[{who:'Promise',t:PROMISE},{who:'Positioning',t:POSITIONING}]}],
 pages:[{id:0,x:140},{id:1,x:405},{id:2,x:610}]},
{id:'market',title:'Crossroads Market',sub:'My Work',segs:['gallery','studio'],cat:'Mrrp. Four stalls, four projects. Walk up and press E.',lamps:[325,865,1385],
 props:[
  ...WORKS.map((w,i)=>({key:'work-'+w.id,ph:[83,79],x:WORKX[i],label:w.title.split(' | ')[0],beam:w.short,tx:0,ty:12,tsize:8,kind:'card',card:()=>({title:w.title,sub:'Project '+(i+1)+' of 4',hero:'work-'+w.id,reel:'reel-'+w.id,journal:i})})),
  {key:'market-noticeboard',ph:[87,78],x:1270,label:'Notice board',papers:true,kind:'card',card:()=>({title:'Milestones',sub:'Accomplishments and education',items:MILESTONES})}],
 pages:[{id:3,x:385},{id:4,x:595},{id:5,x:925},{id:6,x:1135}]},
{id:'finale',title:'The Save Point',sub:'Contact',segs:['trail-finale'],fire:true,cat:'Mrrp. Time to save our progress.',lamps:[140,660],
 props:[{key:'campfire',ph:[52,45],x:483,label:'Campfire',kind:'save',nosprite:true}],pages:[]}];
ZONES.forEach(z=>{z.w=720*z.segs.length;});
const FIREX=483;
/* map hotspots (inside map.png, 480 x 270) */
const MAPSPOTS=[{zone:0,name:'Hilltop Camp',r:[44,186,80,36]},{zone:1,name:'Crossroads Market',r:[214,60,40,70]},{zone:2,name:'Save Point',r:[364,174,36,46]}];

/* ---------- ASSETS ---------- */
const MANIFEST={
 'title-sky':1,'title-clouds-1':1,'title-clouds-2':1,'title-hill-far':1,'title-hill-near':1,'title-girl-body':1,'title-girl-hair':4,
 'title-cat-body':1,'title-cat-tail':4,'title-cat-ears':2,'title-logo':1,'title-button':3,
 'bg-finale-fire':2,'finale-sky':1,'bg-all-lamp':1,
 'char-idle':1,'char-walk':2,'cat-body':1,'cat-tail':3,'dialogue-icon':1,
 'item-page':1,'ui-page-icon':1,
 'email-icon':1,'linkedin-icon':1,'behance-icon':1,'CV-icon':1,'website-icon':1,
 'prop-work-a':1,'prop-work-b':1,'prop-work-c':1,'prop-work-d':1,'prop-about-signpost':1,'prop-about-signpost-large':1,'prop-stall':1,'prop-market-noticeboard':1};
['hub','skills','gallery','studio','trail-finale'].forEach(s=>['far','mid','main'].forEach(l=>{MANIFEST['bg-'+s+'-'+l]=1;}));
const IMG={},FR={};
const cv=document.getElementById('c'),ctx=cv.getContext('2d');ctx.imageSmoothingEnabled=false;
const $=id=>document.getElementById(id);
const tcv=$('tc'),tx=tcv.getContext('2d');let KX=1,KY=1,OFFY=0,TXON=true;
const fx=s=>String(s).replace(/'/g,'\u2019');
function TXT(str,x,y,size,color,align,alpha,body){if(!TXON)return;tx.save();tx.globalAlpha=alpha===undefined?1:alpha;tx.font=(body?Math.round(size*.82*2)/2:size)+'px '+(body?FB:FP);tx.textAlign=align||'left';tx.fillStyle=color;tx.fillText(fx(str),x,y+OFFY);tx.restore();}
function loadImg(src){return new Promise(res=>{const i=new Image();i.onload=()=>res(i);i.onerror=()=>res(null);i.src=src;});}
async function preload(){
  const jobs=[];
  for(const name in MANIFEST){const n=MANIFEST[name];for(let i=1;i<=n;i++){const f=n===1?name:name+'-'+i;jobs.push(loadImg('assets/'+f+'.png').then(im=>{IMG[f]=im;}));}}
  await Promise.all(jobs);
  for(const name in MANIFEST){const n=MANIFEST[name],arr=[];for(let i=1;i<=n;i++){const im=IMG[n===1?name:name+'-'+i];if(!im){arr.length=0;break;}arr.push(im);}FR[name]=arr.length?arr:null;}
  ZONES.forEach(prepZone);
}
function mk(w,h,fn){const c=document.createElement('canvas');c.width=w;c.height=h;const g=c.getContext('2d');g.imageSmoothingEnabled=false;fn(g,w,h);return c;}
function prepZone(z){
  const a=IMG['bg-'+z.segs[0]+'-main'];
  if(z.segs.length===1){z.main=a||null;return;}
  const b=IMG['bg-'+z.segs[1]+'-main'];if(!a||!b){z.main=a||b||null;return;}
  z.main=mk(z.w,H,g=>{
    for(let i=0;i<z.segs.length;i++)g.drawImage(a,i*720,0);
    const t=mk(z.w,H,g2=>{for(let i=0;i<z.segs.length;i++)g2.drawImage(b,i*720,0);
      const gr=g2.createLinearGradient(0,0,z.w,0);gr.addColorStop(0,'rgba(0,0,0,0)');gr.addColorStop(.3,'rgba(0,0,0,0)');gr.addColorStop(.7,'rgba(0,0,0,1)');gr.addColorStop(1,'rgba(0,0,0,1)');
      g2.globalCompositeOperation='destination-in';g2.fillStyle=gr;g2.fillRect(0,0,z.w,H);});
    g.drawImage(t,0,0);});
}

/* ---------- X PLACEHOLDERS ---------- */
function phX(x,y,w,h,label){
  const l=Math.round(x-w/2),tp=Math.round(y-h);
  ctx.fillStyle='rgba(251,233,200,.35)';ctx.fillRect(l,tp,w,h);
  ctx.strokeStyle='#2b1d12';ctx.lineWidth=1;ctx.strokeRect(l+.5,tp+.5,w-1,h-1);
  ctx.strokeStyle='#754289';ctx.beginPath();ctx.moveTo(l+1,tp+1);ctx.lineTo(l+w-1,tp+h-1);ctx.moveTo(l+w-1,tp+1);ctx.lineTo(l+1,tp+h-1);ctx.stroke();
  if(SHOW_LABELS&&label){TXT(label,x+.6,tp-1.4,8,'#2b1d12','center');TXT(label,x,tp-2,8,'#fbe9c8','center');}
}
function drawFrames(arr,i,x,y,dir){const im=arr[i%arr.length];ctx.save();ctx.translate(Math.round(x),Math.round(y));ctx.scale(dir||1,1);ctx.drawImage(im,-Math.round(im.width/2),-im.height);ctx.restore();}

/* ---------- STATE ---------- */
const KEY='bs-journal-save-v4',SKEY='bs-journal-sound';
const newSave=()=>({zone:0,x:60,pages:[],seen:[],visited:[0],intro:false,finale:false});
let save=newSave();
let hasSave=false,soundOn=true;
try{const s=localStorage.getItem(KEY);if(s){const o=JSON.parse(s);if(o&&typeof o.zone==='number'){save=Object.assign(newSave(),o);hasSave=true;}}soundOn=localStorage.getItem(SKEY)!=='0';}catch(e){}
function persist(){try{localStorage.setItem(KEY,JSON.stringify(save));hasSave=true;}catch(e){}}
let state='title',zi=0,Z=ZONES[0],camX=0,camY=0,T=0;
const P={x:60,dir:1,st:'idle',idleT:0,wave:0},C={x:40,dir:1,st:'idle',meow:0};
let bubble=null,banner=null,toastT=0,zoom=null,introMode=false;
const fade={a:0,dir:0,cb:null};
let titleSel=0,titleHover=-1,titleDown=-1,titleStart=0,titleKeys=false,TITLE_RECTS=[];
let cine=null,contactT=0,CONTACT_RECTS=[];
const mouse={x:-1,y:-1};
const keys={};

/* ---------- SOUND ---------- */
let AC=null;
function ac(){if(!AC){try{AC=new(window.AudioContext||window.webkitAudioContext)();}catch(e){}}return AC;}
function tone(f,d,type,v,delay){if(!soundOn)return;const a=ac();if(!a)return;const o=a.createOscillator(),g=a.createGain(),t0=a.currentTime+(delay||0);o.type=type||'square';o.frequency.value=f;g.gain.setValueAtTime(v||.025,t0);g.gain.exponentialRampToValueAtTime(.0001,t0+d);o.connect(g);g.connect(a.destination);o.start(t0);o.stop(t0+d+.03);}
const sfx={blip:()=>tone(480+Math.random()*90,.035,'square',.015),select:()=>tone(440,.06,'square',.03),
 page:()=>[660,880,1100,1320].forEach((f,i)=>tone(f,.12,'square',.03,i*.08)),
 meow:()=>{tone(700,.08,'triangle',.05);tone(520,.14,'triangle',.05,.07);},step:()=>tone(90+Math.random()*30,.03,'triangle',.03),
 flip:()=>{tone(260,.07,'triangle',.05);tone(180,.1,'triangle',.04,.08);},save:()=>[523,659,784,1047].forEach((f,i)=>tone(f,.16,'triangle',.05,i*.12)),
 zoom:()=>{tone(330,.12,'triangle',.04);tone(495,.14,'triangle',.04,.08);}};

/* ---------- HELPERS ---------- */
const esc=s=>fx(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const easeOut=p=>1-Math.pow(1-p,3),easeIO=p=>p<.5?2*p*p:1-Math.pow(-2*p+2,2)/2;
const prog=(t,r)=>Math.max(0,Math.min(1,(t-r[0])/r[1]));
const inR=(m,r)=>r&&m.x>=r.x&&m.x<=r.x+r.w&&m.y>=r.y&&m.y<=r.y+r.h;
function toast(t){const e=$('toast');e.textContent=fx(t);e.classList.remove('hidden');toastT=2.8;}
function wrap(text,maxW){const words=fx(text).split(' '),lines=[];let cur='';for(const w of words){const t=cur?cur+' '+w:w;if(ctx.measureText(t).width>maxW&&cur){lines.push(cur);cur=w;}else cur=t;}if(cur)lines.push(cur);return lines;}
function say(t){bubble={t,life:4.2};}
function hideAll(){['dlg','journal','menu','card','map','help'].forEach(id=>$(id).classList.add('hidden'));}
function download(url,name){const a=document.createElement('a');a.href=url;if(name)a.download=name;a.target='_blank';a.rel='noopener';document.body.appendChild(a);a.click();document.body.removeChild(a);}
function copyLink(){const url=WEBSITE_URL||String(window.location.href);const ok=()=>toast('Link copied: '+url.replace(/^https?:\/\//,''));
  const fb=()=>{try{const t=document.createElement('textarea');t.value=url;document.body.appendChild(t);t.select();document.execCommand('copy');document.body.removeChild(t);ok();}catch(e){window.prompt('Copy this link:',url);}};
  if(typeof navigator!=='undefined'&&navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(url).then(ok,fb);else fb();}
function openLink(it){if(it.copy)copyLink();else if(it.download)download(it.url,it.download);else if(/^mailto:/.test(it.url))window.location.href=it.url;else window.open(it.url,'_blank','noopener');}
function fillReel(el,reel,fallback){if(!el)return;const v=document.createElement('video');v.muted=true;v.loop=true;v.autoplay=true;v.playsInline=true;v.preload='auto';
  if(v.setAttribute){v.setAttribute('muted','');v.setAttribute('playsinline','');}
  v.onloadeddata=()=>{el.innerHTML='';el.appendChild(v);const p=v.play();if(p&&p.catch)p.catch(()=>{});};
  v.onerror=()=>{if(fallback)fillHero(el,fallback);};v.src='assets/'+reel+'.mp4';}
function fillHero(el,base){if(!el)return;[ '.jpg','.png','.webp'].reduce((p,ext)=>p.then(r=>r||loadImg('assets/'+base+ext)),Promise.resolve(null)).then(im=>{if(im){el.innerHTML='';const i2=document.createElement('img');i2.src=im.src;el.appendChild(i2);}});}
function xph(label){return '<div class="xph">'+(SHOW_LABELS?'<span>'+esc(label)+'</span>':'')+'</div>';}

/* ---------- ZONES ---------- */
function enterZone(i,x,dir){
  zi=i;Z=ZONES[i];P.x=x;P.dir=dir||1;P.st='idle';P.idleT=0;C.x=x-P.dir*24;C.dir=P.dir;
  camX=clamp(P.x-W/2,0,Z.w-W);camY=0;
  if(!save.visited.includes(i))save.visited.push(i);
  save.zone=i;save.x=x;persist();
  banner={title:Z.title,sub:Z.sub,t:0};bubble=null;
  setTimeout(()=>{if(state==='play'&&Z===ZONES[i])say(Z.cat);},1200);}
function goZone(i,x,dir,then){if(fade.dir)return;fade.dir=1;fade.cb=()=>{enterZone(i,x,dir);if(then)then();};}
function startGame(cont){
  if(!cont){save=newSave();persist();}
  hideAll();camY=0;cine=null;zoom=null;
  if(cont){state='play';enterZone(save.zone,save.x,1);showTop(true);}
  else{enterZone(0,60,1);startIntro();}}
function finishAndReset(){try{localStorage.removeItem(KEY);}catch(er){}save=newSave();hasSave=false;camY=0;cine=null;dlg=null;toTitle();}
/* idle: after 2 minutes with no input, return to the title screen (progress kept, CONTINUE stays).
   Not while reading: journal, project cards/zoom, map, menu, help. */
let IDLE_MS=120000,lastInput=Date.now();
['keydown','mousemove','mousedown','touchstart','pointerdown','wheel'].forEach(ev=>addEventListener(ev,()=>{lastInput=Date.now();},{passive:true}));
setInterval(()=>{
  if(Date.now()-lastInput<IDLE_MS)return;
  if(!['play','contact','cine','dialog','ready','wait'].includes(state)||fade.dir)return;
  if(state==='dialog'&&dlg&&dlg.n===0&&false)return;
  camY=0;cine=null;dlg=null;zoom=null;bubble=null;toTitle();lastInput=Date.now();},1000);
function toTitle(){state='title';hideAll();titleSel=0;titleKeys=false;titleStart=T;camY=0;zoom=null;introMode=false;}
function showTop(){}

/* ---------- DIALOGUE + INTRO CUTSCENE ---------- */
let dlg=null;
function chunk(text,max){if(text.length<=max)return[text];const ss=text.match(/[^.!?]+[.!?]*\s*/g)||[text],res=[];let cur='';for(const s of ss){if((cur+s).length>max&&cur){res.push(cur.trim());cur=s;}else cur+=s;}if(cur.trim())res.push(cur.trim());return res;}
function setPort(w){const e=$('dport');if(e)e.className=(w==='Peanut')?'p':'b';}
function startDialogue(lines,onEnd){
  const out=[];lines.forEach(l=>chunk(l.t,300).forEach(c=>out.push({who:l.who,t:c})));
  dlg={lines:out,i:0,acc:0,n:0,onEnd};state='dialog';showTop(false);
  $('dlg').classList.remove('hidden');$('dname').textContent=fx(out[0].who);setPort(out[0].who);$('dnext').classList.add('hidden');$('dtext').textContent='';}
function advance(){
  if(!dlg)return;const l=dlg.lines[dlg.i];
  if(dlg.n<l.t.length){dlg.acc=dlg.n=l.t.length;return;}
  if(dlg.i<dlg.lines.length-1){dlg.i++;dlg.acc=0;dlg.n=0;$('dname').textContent=fx(dlg.lines[dlg.i].who);setPort(dlg.lines[dlg.i].who);$('dnext').classList.add('hidden');sfx.select();}
  else{$('dlg').classList.add('hidden');const cb=dlg.onEnd;dlg=null;state='play';if(!introMode)showTop(true);if(cb)cb();}}
function updateDialogue(dt){
  if(!dlg)return;const l=dlg.lines[dlg.i];
  if(dlg.n<l.t.length){const b=dlg.n;dlg.acc+=dt*52;dlg.n=Math.min(l.t.length,Math.floor(dlg.acc));if(dlg.n!==b&&dlg.n%3===0&&l.t[dlg.n-1]!==' ')sfx.blip();$('dtext').textContent=fx(l.t.slice(0,dlg.n));}
  else{$('dtext').textContent=fx(l.t);$('dnext').classList.remove('hidden');}}
/* the intro cannot be skipped: it can only be read through, line by line */
function startIntro(){
  introMode=true;state='play';
  setTimeout(()=>{startDialogue(INTRO_LINES,()=>{save.intro=true;persist();state='ready';});},900);
  state='wait';}

/* ---------- INFO CARDS + STALL ZOOM ---------- */
function skillsHTML(sk){return SKILL_CATS.map((cn,ci)=>{const l=sk.filter(x=>x[0]===ci).map(x=>x[1]);return l.length?'<div><b>'+esc(cn)+'</b> '+esc(l.join(', '))+'</div>':'';}).join('');}
function openCard(c,p){
  if(c.journal!==undefined){
    const h='<div class="ctitle">'+esc(c.title)+'</div><div class="csub">'+esc(c.sub||'')+'</div><div class="solo"><div class="hero" id="hero">'+xph('assets/'+c.hero+'.jpg')+'</div><div class="jgo tl" data-journal="'+c.journal+'">View full project in the journal'+(TOUCH?'':' (J)')+'</div></div><div class="chint">'+(TOUCH?'Tap CLOSE to leave':'Press E or Esc to close')+(TOUCH?'. Tap the video to make it bigger':'. Click the video to make it bigger')+'</div><div class="cfoot"><span class="tl" data-close="1">'+(TOUCH?'CLOSE':'CLOSE (E)')+'</span></div>';
    const e=$('card');e.innerHTML=h;e.classList.remove('hidden');state='card';cardJournal=c.journal;
    fillReel($('hero'),c.reel,c.hero);return;}
  cardJournal=null;
  let h='<div class="ctitle">'+esc(c.title)+'</div><div class="csub">'+esc(c.sub||'')+'</div><div class="cmain">';
  if(c.hero){h+='<div class="cleft"><div class="hero" id="hero">'+xph('assets/'+c.hero+'.jpg')+'</div>';
    if(c.skills)h+='<div class="cskills"><b class="sk">Skills used</b>'+skillsHTML(c.skills)+'</div>';
    h+='</div>';}
  h+='<div class="ctext">';
  if(c.meta)h+='<div class="meta">'+c.meta.map(m=>'<span><b>'+esc(m[0])+'</b> '+esc(m[1])+'</span>').join('')+'</div>';
  if(c.text)h+='<p>'+esc(c.text)+'</p>';
  if(c.sections)h+=c.sections.map(x=>'<p><b class="sec">'+esc(x[0])+'</b> '+esc(x[1])+'</p>').join('');
  if(c.bars)h+=c.bars.map(b=>'<div class="bar"><span>'+esc(b[0])+'</span><i><u style="width:'+(b[1]*20)+'%"></u></i></div>').join('');
  if(c.items)h+=c.items.map(it=>'<div class="it"><b>'+esc(it.h)+'</b> '+esc(it.t)+'</div>').join('');
  h+='</div></div><div class="chint">'+(TOUCH?'Tap CLOSE to leave':'Press E or Esc to close')+(c.hero?(TOUCH?'. Tap the video to make it bigger':'. Click the video to make it bigger'):'')+'</div><div class="cfoot">'+(c.link&&c.link.url?'<span class="tl" data-url="'+esc(c.link.url)+'">'+esc(c.link.label)+'</span>':'')+'<span class="tl" data-close="1">'+(TOUCH?'CLOSE':'CLOSE (E)')+'</span></div>';
  const e=$('card');e.innerHTML=h;e.classList.remove('hidden');state='card';
  if(c.hero)(c.reel?fillReel($('hero'),c.reel,c.hero):fillHero($('hero'),c.hero));}
let cardJournal=null;
function cardToJournal(n){if(n===null||n===undefined)return;$('card').classList.add('hidden');zoom=null;jspread.works=n;openJournal('works');}
function beginZoom(p){
  zoom={t:0,dir:1,p,fx:p.x-camX,fy:GROUND-p.ph[1]/2,done:false};state='zoom';sfx.zoom();
  showTop(false);}
function closeCard(){const hb=$('hero');if(hb&&hb.classList&&hb.classList.contains('big')){hb.classList.remove('big');return;}$('card').classList.add('hidden');if(zoom){zoom.dir=-1;zoom.t=Math.min(zoom.t,1);state='zoom';}else state='play';}
$('card').addEventListener('click',e=>{if(e.target.closest&&e.target.closest('#hero')){const hb=$('hero');if(hb&&hb.classList)hb.classList.toggle('big');return;}const t=e.target.closest('[data-close],[data-url],[data-journal]');if(!t)return;sfx.select();if(t.dataset.journal!==undefined)cardToJournal(+t.dataset.journal);else if(t.dataset.close)closeCard();else window.open(t.dataset.url,'_blank','noopener');});
$('dlg').addEventListener('click',advance);

/* ---------- ACTIONS ---------- */
function nearProp(){for(const p of Z.props){if(Math.abs(P.x-p.x)<=p.ph[0]/2+16)return p;}return null;}
function markSeen(p){if(!save.seen.includes(p.key)){save.seen.push(p.key);persist();toast('Saved to your journal');}}
function interact(){
  const p=nearProp();if(!p)return;
  if(p.kind==='dialog')startDialogue(p.lines(),()=>markSeen(p));
  else if(p.kind==='card'){markSeen(p);beginZoom(p);}
  else if(p.kind==='save')startCine();}
function hint(){
  let m;const pgs=(Z.pages||[]).filter(p=>!save.pages.includes(p.id));
  if(pgs.length){const p=pgs.reduce((a,b)=>Math.abs(a.x-P.x)<Math.abs(b.x-P.x)?a:b);m='Mrrp! A journal page is '+(p.x>P.x?'ahead of us.':'behind us.');}
  else{const un=Z.props.find(p=>!save.seen.includes(p.key));
    if(un)m='Mrrp. Try the '+un.label.toLowerCase()+' (press E).';
    else if(zi<ZONES.length-1)m='Mrrp. All done here. Keep walking right!';
    else m='Mrrp. That is everything for now!';}
  say(m);sfx.meow();C.meow=.8;}
function collectPage(){
  for(const pg of (Z.pages||[])){
    if(save.pages.includes(pg.id)||Math.abs(P.x-pg.x)>16)continue;
    save.pages.push(pg.id);persist();sfx.page();P.wave=1.1;
    toast('Journal page found: '+PAGES[pg.id].short+'  ('+save.pages.length+'/7)');
    if(save.pages.length===7)setTimeout(()=>say('Mrrp!! That is all seven pages!'),1400);}}
function setSound(v){soundOn=v;try{localStorage.setItem(SKEY,v?'1':'0');}catch(e){}}

/* ---------- JOURNAL (side tabs, flippable pages, auto-saved) ---------- */
const JL={x:72,y:34,w:158,h:206},JR={x:251,y:34,w:158,h:206};
const JTABS=[{id:'manifesto',label:'MANIFESTO',y:36,h:57},{id:'works',label:'WORKS',y:97,h:66},{id:'about',label:'ABOUT ME',y:168,h:62}];
let jtab='manifesto',jspread={manifesto:0,works:0,about:0},jflip=false;
const spreadsOf=n=>Math.ceil(n/2);
const TAB_PAGES={manifesto:PAGES.length,works:WORKS.length*2,about:5};
function skillsFound(){const f=SKILL_CATS.map(()=>[]);WORKS.forEach(w=>{if(save.seen.includes('work-'+w.id))w.skills.forEach(([c,n])=>{if(!f[c].includes(n))f[c].push(n);});});return f;}
function skillsTotal(){const t=SKILL_CATS.map(()=>[]);WORKS.forEach(w=>w.skills.forEach(([c,n])=>{if(!t[c].includes(n))t[c].push(n);}));return t;}
function lockedHTML(label,why){return '<div class="pe">'+esc(label)+'</div><div class="pt dim">'+esc(why)+'</div>';}
function barsHTML(b){return b.map(x=>'<div class="bar"><span>'+esc(x[0])+'</span><i><u style="width:'+(x[1]*20)+'%"></u></i></div>').join('');}
function pageHTML(tab,i){
  if(i>=TAB_PAGES[tab])return '';
  if(tab==='manifesto'){
    if(!save.pages.includes(i))return lockedHTML('Entry '+(i+1),'This page has not been found yet. Keep exploring and look for the floating pages!');
    const p=PAGES[i];return '<div class="pe">Entry '+(i+1)+'</div><div class="ph">'+esc(p.title)+'</div><div class="pb">'+esc(p.body)+'</div>';}
  if(tab==='works'){
    const n=i>>1,w=WORKS[n],k='work-'+w.id,left=i%2===0;
    if(!save.seen.includes(k))return lockedHTML('Project '+(n+1),left?'Visit stall '+(n+1)+' at the Crossroads Market and press E to see this project here.':'The rest of this project is written here once you have visited its stall.');
    if(left)return '<div class="pe">Project '+(n+1)+'</div><div class="ph">'+esc(w.title)+'</div><div class="hero" data-hero="'+k+'">'+xph('assets/'+k+'.jpg')+'</div><div class="pb">'+metaOf(w).map(m=>'<p><b class="sec">'+esc(m[0])+'</b> '+esc(m[1])+'</p>').join('')+'<p><b class="sec">Skills</b> '+esc(w.skills.map(x=>x[1]).join(', '))+'</p></div>';
    return '<div class="pe">Project '+(n+1)+'</div><div class="pb">'+sectionsOf(w).map(x=>'<div class="ph">'+esc(x[0])+'</div><p>'+esc(x[1])+'</p>').join('')+(w.link?'<a class="lnk" data-url="'+esc(w.link)+'"><b>View full project in Behance</b></a>':'')+'</div>';}
  /* about me */
  if(i===0){if(!save.intro)return lockedHTML('Hello','Finish the introduction to unlock this page.');
    return '<div class="pe">Hello</div><div class="ph">Belinda Ortlepp</div><div class="pb">'+INTRO_LINES.slice(0,4).map(l=>'<p>'+esc(l.t)+'</p>').join('')+'</div>';}
  if(i===1){if(!save.seen.includes('about-signpost-large'))return lockedHTML('Promise','Read the signpost at the Hilltop Camp to unlock this page.');
    return '<div class="pe">My promise</div><div class="ph">Promise</div><div class="pb"><p>'+esc(PROMISE)+'</p></div><div class="ph">Positioning</div><div class="pb"><p>'+esc(POSITIONING)+'</p></div>';}
  if(i===2){if(!save.seen.includes('market-noticeboard'))return lockedHTML('Milestones','Read the notice board at the end of the market to unlock this page.');
    return '<div class="pe">Milestones</div><div class="ph">Education and accomplishments</div><div class="pb">'+MILESTONES.map(m=>'<p><b style="color:#754289;font-weight:normal">'+esc(m.h)+'</b> '+esc(m.t)+'</p>').join('')+'</div>';}
  if(i===3){const f=skillsFound(),t=skillsTotal(),nf=f.reduce((a,b)=>a+b.length,0),nt=t.reduce((a,b)=>a+b.length,0);
    if(!nf)return lockedHTML('Skills','Open the market stalls to discover the skills used in each project. They are collected and sorted here.');
    let h='<div class="pe">Skills: '+nf+' of '+nt+' found</div>';
    SKILL_CATS.forEach((c,ci)=>{h+='<div class="ph">'+esc(c)+'</div><div class="pb"><p>'+(f[ci].length?esc(f[ci].join(', ')):'<span class="dim">None found yet</span>')+'</p>'+(f[ci].length<t[ci].length?'<p class="dim">+ '+(t[ci].length-f[ci].length)+' more to find in the stalls</p>':'')+'</div>';});
    return h;}
  if(i===4){let h='<div class="pe">Contact</div><div class="ph">Get in touch</div><div class="pb">';
    CONTACT.items.forEach((it,n)=>{h+='<a class="lnk" data-contact="'+n+'"><img src="assets/'+it.icon+'.png" alt=""><span><b>'+esc(it.label)+'</b><small>'+esc(it.sub)+'</small></span></a>';});
    return h+'</div>';}
  return '';}
function renderJournal(){
  const s=jspread[jtab];
  $('pgL').innerHTML=pageHTML(jtab,2*s);$('pgR').innerHTML=pageHTML(jtab,2*s+1);
  $('jtabs').innerHTML=JTABS.map(t=>'<button class="jtab'+(t.id===jtab?' on':'')+'" data-tab="'+t.id+'" style="top:'+t.y+'px;height:'+t.h+'px">'+t.label+'</button>').join('');
  $('jfoot').textContent=fx(TOUCH?'Tap the tabs on the left to change section. Tap a page or the < > buttons to turn it. X closes.':'Click the tabs on the left to change section. Click a page or the < > buttons to turn it. J or Esc closes.');
  document.querySelectorAll('#pgL [data-hero],#pgR [data-hero]').forEach(el=>fillReel(el,'reel-'+el.dataset.hero.replace('work-',''),el.dataset.hero));}
function placeJournal(){[['pgL',JL],['pgR',JR]].forEach(([id,r])=>{const st=$(id).style;st.left=r.x+'px';st.top=r.y+'px';st.width=r.w+'px';st.height=r.h+'px';});}
function openJournal(tab){if(tab)jtab=tab;state='journal';jflip=false;placeJournal();renderJournal();$('flip').style.display='none';$('journal').classList.remove('hidden');showTop(false);}
let jFromContact=false;
function closeJournal(){$('journal').classList.add('hidden');if(jFromContact){jFromContact=false;state='contact';return;}state='play';showTop(true);}
function flipPage(dir){
  if(jflip)return;const ns=jspread[jtab]+dir;if(ns<0||ns>=spreadsOf(TAB_PAGES[jtab]))return;jflip=true;sfx.flip();
  const s=jspread[jtab],L=2*s,R=2*s+1,nL=2*ns,nR=2*ns+1,fl=$('flip'),fw=177,fh=226;
  const txt=(html,x,y,w,h)=>'<div class="ftxt" style="left:'+x+'px;top:'+y+'px;width:'+w+'px;height:'+h+'px">'+html+'</div>';
  if(dir>0){fl.style.left='241px';fl.style.transformOrigin='left center';
    fl.innerHTML='<div class="face">'+txt(pageHTML(jtab,R),10,10,JR.w,JR.h)+'</div><div class="face back">'+txt(pageHTML(jtab,nL),8,10,JL.w,JL.h)+'</div>';$('pgR').innerHTML=pageHTML(jtab,nR);}
  else{fl.style.left='64px';fl.style.transformOrigin='right center';
    fl.innerHTML='<div class="face">'+txt(pageHTML(jtab,L),8,10,JL.w,JL.h)+'</div><div class="face back">'+txt(pageHTML(jtab,nR),10,10,JR.w,JR.h)+'</div>';$('pgL').innerHTML=pageHTML(jtab,nL);}
  fl.style.top='24px';fl.style.width=fw+'px';fl.style.height=fh+'px';fl.style.display='block';
  fl.style.transition='none';fl.style.transform='rotateY(0deg)';void fl.offsetWidth;
  fl.style.transition='transform .55s ease-in-out';fl.style.transform='rotateY('+(dir>0?-180:180)+'deg)';
  setTimeout(()=>{jspread[jtab]=ns;renderJournal();fl.style.display='none';jflip=false;},590);}
$('journal').addEventListener('click',e=>{
  const t=e.target.closest('[data-tab],[data-url],[data-contact],#jprev,#jnext,#jclose');
  if(t){
    if(t.dataset&&t.dataset.tab){sfx.select();jtab=t.dataset.tab;renderJournal();}
    else if(t.dataset&&t.dataset.url){window.open(t.dataset.url,'_blank','noopener');}
    else if(t.dataset&&t.dataset.contact!==undefined){openLink(CONTACT.items[+t.dataset.contact]);}
    else if(t.id==='jprev')flipPage(-1);else if(t.id==='jnext')flipPage(1);else if(t.id==='jclose')closeJournal();
    return;}
  const r=$('jimg').getBoundingClientRect(),spine=r.left+(241/480)*r.width;
  if(e.clientX>r.left+r.width*.12&&e.clientX<r.right-r.width*.1)flipPage(e.clientX>spine?1:-1);});

/* ---------- MAP ---------- */
function openMap(){
  state='map';showTop(false);
  $('maphot').innerHTML=MAPSPOTS.map(s=>'<button class="hot" data-zone="'+s.zone+'" style="left:'+s.r[0]+'px;top:'+s.r[1]+'px;width:'+s.r[2]+'px;height:'+s.r[3]+'px"><span>'+esc(s.name)+'</span></button>').join('')+
    (function(){const s=MAPSPOTS[zi];return '<div class="here" style="left:'+(s.r[0]+s.r[2]/2-5)+'px;top:'+(s.r[1]-10)+'px"></div>';})();
  $('map').classList.remove('hidden');}
function closeMap(){$('map').classList.add('hidden');state='play';showTop(true);}
$('map').addEventListener('click',e=>{
  const t=e.target.closest('[data-zone],#mapclose');if(!t)return;
  if(t.id==='mapclose'){closeMap();return;}
  sfx.select();const z=+t.dataset.zone;$('map').classList.add('hidden');state='play';showTop(true);
  if(z===zi){toast('You are already here');return;}
  goZone(z,60,1);});

/* ---------- MENU + HELP ---------- */
function openMenu(){
  state='menu';showTop(false);
  const b=(m,t)=>'<div class="mi" data-m="'+m+'">'+t+'</div>';
  $('menu').innerHTML='<h2>Menu</h2>'+b('resume','RESUME')+b('help','HOW TO PLAY')+b('journal','JOURNAL')+b('map','MAP')+b('sound','SOUND: '+(soundOn?'ON':'OFF'))+b('save','SAVE')+b('contact','CONTACT')+b('title','TITLE SCREEN')+b('reset','RESET');
  $('menu').classList.remove('hidden');}
function closeMenu(){$('menu').classList.add('hidden');state='play';showTop(true);}
$('menu').addEventListener('click',e=>{
  const b=e.target.closest('[data-m]');if(!b)return;sfx.select();const m=b.dataset.m;
  if(m==='resume')closeMenu();
  else if(m==='help'){$('menu').classList.add('hidden');openHelp();}
  else if(m==='journal'){$('menu').classList.add('hidden');openJournal();}
  else if(m==='map'){$('menu').classList.add('hidden');openMap();}
  else if(m==='contact'){$('menu').classList.add('hidden');showContact(true);}
  else if(m==='sound'){setSound(!soundOn);openMenu();}
  else if(m==='save'){persist();toast('Game saved');}
  else if(m==='title'){persist();toTitle();}
  else if(m==='reset'){if(confirm('Delete your saved progress?')){try{localStorage.removeItem(KEY);}catch(er){}save=newSave();hasSave=false;toTitle();}}});
function openHelp(){
  state='help';
  $('help').innerHTML='<h2>How to play</h2>'+
   '<p><b>Walk:</b> press A and D, or the left and right arrow keys.</p>'+
   '<p><b>Open things:</b> stand next to a stall, sign or board and press E.</p>'+
   '<p><b>Collect pages:</b> walk into the floating journal pages. They are hidden along the way.</p>'+
   '<p><b>Need help?</b> Press C or click Peanut the cat for a hint.</p>'+
   '<p><b>Journal:</b> press J, or click J: journal in the bar at the bottom. Click the tabs on the left to switch section. Everything you find is saved there.</p>'+
   '<p><b>Travel:</b> press M, or click M: map in the bar at the bottom, then click a place to jump straight to it.</p>'+
   '<p><b>Pause:</b> press Esc, or click Esc: menu at the bottom. Your progress saves by itself.</p>'+
   '<span class="tl" data-close="1">GOT IT</span>';
  $('help').classList.remove('hidden');}
$('help').addEventListener('click',e=>{if(e.target.closest('[data-close]')){$('help').classList.add('hidden');state='play';showTop(true);}});

/* ---------- FINALE CINEMATIC + CONTACT ---------- */
function startCine(){persist();sfx.save();toast('Game saved');state='cine';cine={t:0};hideAll();save.finale=true;persist();}
function showContact(jump){hideAll();state='contact';contactT=jump?99:0;camY=H;cine=null;zoom=null;save.finale=true;}
function wanderBack(){if(fade.dir)return;fade.dir=1;fade.cb=()=>{camY=0;cine=null;state='play';enterZone(ZONES.length-1,FIREX-90,1);showTop(true);};}
function updateCine(dt){
  cine.t+=dt;const tx_=FIREX-46,cx_=FIREX+46;
  if(cine.t<2.2){
    if(Math.abs(P.x-tx_)>2){P.x+=Math.sign(tx_-P.x)*70*dt;P.dir=Math.sign(tx_-P.x)||1;P.st='walk';}else{P.st='idle';P.dir=1;}
    if(Math.abs(C.x-cx_)>2){C.x+=Math.sign(cx_-C.x)*80*dt;C.dir=Math.sign(cx_-C.x)||-1;C.st='walk';}else{C.st='idle';C.dir=-1;}
  }else{P.x=tx_;P.dir=1;C.x=cx_;C.dir=-1;P.st='idle';C.st='idle';}
  if(cine.t>=3.4)camY=H*easeIO(clamp((cine.t-3.4)/3,0,1));
  if(cine.t>=6.4)showContact(false);}

/* ---------- INPUT ---------- */
function titleItems(){
  const a=[{txt:'NEW GAME',go:()=>{if(hasSave&&!confirm('Start a new game? Your saved progress will be replaced.'))return;ac();startGame(false);}}];
  if(hasSave)a.push({txt:'CONTINUE',go:()=>{ac();startGame(true);}});
  return a.map((it,i)=>{it.rect=TITLE_RECTS[i]||null;return it;});}
const introDone=()=>(T-titleStart)>=INTRO_END;
const MOVE=['ArrowLeft','ArrowRight','KeyA','KeyD'];
function onKey(c){
  if(state==='title'){
    if(!introDone()){titleStart=T-INTRO_END-.1;return;}
    const n=titleItems().length;
    if(c==='ArrowDown'||c==='KeyS'){titleKeys=true;titleSel=(titleSel+1)%n;sfx.select();}
    else if(c==='ArrowUp'||c==='KeyW'){titleKeys=true;titleSel=(titleSel+n-1)%n;sfx.select();}
    else if(c==='Enter'||c==='Space'||c==='KeyE'){titleItems()[titleSel].go();}
  }else if(state==='ready'){if(MOVE.includes(c)){introMode=false;state='play';showTop(true);}}
  else if(state==='play'){
    if(c==='KeyE'||c==='Enter'||c==='Space')interact();
    else if(c==='KeyJ')openJournal();
    else if(c==='KeyM')openMap();
    else if(c==='Escape')openMenu();
    else if(c==='KeyC')hint();
    else if(c==='KeyN'){setSound(!soundOn);toast('Sound '+(soundOn?'on':'off'));}
    else if(c==='KeyF'){const el=document.documentElement;if(document.fullscreenElement)document.exitFullscreen();else if(el.requestFullscreen)el.requestFullscreen();}
  }else if(state==='dialog'){if(c==='KeyE'||c==='Enter'||c==='Space')advance();}
  else if(state==='card'){if(c==='KeyJ'&&cardJournal!==null){cardToJournal(cardJournal);return;}if(c==='KeyE'||c==='Enter'||c==='Space'||c==='Escape')closeCard();}
  else if(state==='journal'){
    if(c==='KeyJ'||c==='Escape')closeJournal();
    else if(c==='ArrowRight'||c==='KeyD')flipPage(1);
    else if(c==='ArrowLeft'||c==='KeyA')flipPage(-1);}
  else if(state==='map'){if(c==='Escape'||c==='KeyM')closeMap();}
  else if(state==='help'){if(c==='Escape'||c==='Enter'||c==='KeyE'){$('help').classList.add('hidden');state='play';showTop(true);}}
  else if(state==='menu'){if(c==='Escape')closeMenu();}
  else if(state==='cine'){if(c==='Enter'||c==='Space'||c==='Escape')showContact(true);}
  else if(state==='contact'){if(contactT<6)contactT=99;else if(c==='Escape')wanderBack();}
}
addEventListener('keydown',e=>{
  if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Space'].includes(e.code))e.preventDefault();
  const rep=e.repeat;keys[e.code]=true;if(!rep){ac();onKey(e.code);}});
addEventListener('keyup',e=>{keys[e.code]=false;});
addEventListener('blur',()=>{for(const k in keys)keys[k]=false;});
function mpos(e){const r=cv.getBoundingClientRect();return{x:(e.clientX-r.left)*W/r.width,y:(e.clientY-r.top)*H/r.height};}
cv.addEventListener('mousemove',e=>{
  const m=mpos(e);mouse.x=m.x;mouse.y=m.y;
  if(state==='title'&&introDone()){titleHover=-1;titleItems().forEach((it,i)=>{if(inR(m,it.rect)){titleHover=i;titleSel=i;titleKeys=true;}});}
  cv.style.cursor=(state==='title'&&titleHover>=0)||(state==='contact'&&CONTACT_RECTS.some(r=>inR(m,r)))||(state==='play'&&LEGEND_RECTS.some(r=>inR(m,r)))?'pointer':'default';});
cv.addEventListener('mousedown',e=>{ac();if(state==='title'){if(!introDone()){titleStart=T-INTRO_END-.1;return;}if(titleHover>=0)titleDown=titleHover;}});
cv.addEventListener('mouseup',e=>{if(state==='title'){if(titleDown>=0&&titleDown===titleHover)titleItems()[titleDown].go();titleDown=-1;}});
cv.addEventListener('click',e=>{
  const m=mpos(e);
  if(state==='play'){for(const r of LEGEND_RECTS){if(inR(m,r)){sfx.select();if(r.act==='journal')openJournal();else if(r.act==='map')openMap();else if(r.act==='menu')openMenu();else if(r.act==='hint')hint();return;}}
    const cx=C.x-camX;if(Math.abs(m.x-cx)<14&&m.y>GROUND-26&&m.y<GROUND+6)hint();}
  else if(state==='cine'){showContact(true);}
  else if(state==='contact'){
    if(contactT<6){contactT=99;return;}
    for(const r of CONTACT_RECTS){if(inR(m,r)){sfx.select();
      if(r.act==='back')wanderBack();else if(r.act==='reset'){finishAndReset();}
      else if(r.act==='journal'){openJournalFromContact();}
      else if(r.item)openLink(r.item);return;}}}});
function openJournalFromContact(){jFromContact=true;state='journal';jflip=false;placeJournal();renderJournal();$('flip').style.display='none';$('journal').classList.remove('hidden');}

/* ---------- UPDATE ---------- */
function update(dt){
  T+=dt;
  if(toastT>0){toastT-=dt;if(toastT<=0)$('toast').classList.add('hidden');}
  if(fade.dir===1){fade.a+=dt*3.2;if(fade.a>=1){fade.a=1;if(fade.cb)fade.cb();fade.cb=null;fade.dir=-1;}}
  else if(fade.dir===-1){fade.a-=dt*3.2;if(fade.a<=0){fade.a=0;fade.dir=0;}}
  if(state==='title')return;
  updateDialogue(dt);
  if(banner){banner.t+=dt;if(banner.t>3.6)banner=null;}
  if(bubble){bubble.life-=dt;if(bubble.life<=0)bubble=null;}
  if(C.meow>0)C.meow-=dt;
  if(state==='contact'){contactT+=dt;return;}
  if(zoom){
    zoom.t+=dt*zoom.dir/.6;
    if(zoom.dir>0&&zoom.t>=1){zoom.t=1;if(!zoom.done){zoom.done=true;openCard(zoom.p.card(),zoom.p);}}
    if(zoom.dir<0&&zoom.t<=0){zoom=null;state='play';showTop(true);}}
  if(state==='cine'){updateCine(dt);}
  else{
    const free=(state==='play')&&!fade.dir;
    const L=!!(free&&(keys.ArrowLeft||keys.KeyA)),R=!!(free&&(keys.ArrowRight||keys.KeyD));
    let moving=false;
    if(L!==R&&free){P.x+=(R?1:-1)*72*dt;P.dir=R?1:-1;moving=true;}
    P.x=clamp(P.x,14,Z.w-14);
    if(P.wave>0)P.wave-=dt;
    if(moving){P.st='walk';P.idleT=0;if(Math.floor(T*8)%4===0&&Math.floor((T-dt)*8)%4!==0)sfx.step();}
    else{P.idleT+=state==='play'?dt:0;P.st=P.wave>0?'wave':(P.idleT>7?'sit':'idle');}
    if(free){
      if(P.x>Z.w-15&&zi<ZONES.length-1)goZone(zi+1,26,1);
      else if(P.x<15&&zi>0)goZone(zi-1,ZONES[zi-1].w-26,-1);
      collectPage();}
    const tx_=P.x-P.dir*26,dx=tx_-C.x;
    if(Math.abs(dx)>4){C.x+=Math.sign(dx)*Math.min(Math.abs(dx),(Math.abs(dx)>40?100:70)*dt);C.dir=Math.sign(dx);C.st='walk';}
    else{C.st=(P.st==='sit'&&P.idleT>11)?'sleep':'idle';if(C.st!=='sleep')C.dir=P.dir;}
    if(C.meow>0)C.st='meow';}
  if(!zoom)camX+=(clamp(P.x-W/2,0,Z.w-W)-camX)*Math.min(1,dt*6);
}

/* ---------- DRAW: TITLE ---------- */
function hairFrame(t){let tot=0;HAIR_SEQ.forEach(s=>{tot+=s[1];});let m=t%tot;for(const s of HAIR_SEQ){if(m<s[1])return s[0];m-=s[1];}return 1;}
function drawTitle(){
  const tt=T-titleStart,ta=Math.max(0,tt-1.4),sky=IMG['title-sky'];
  ctx.fillStyle='#1b1530';ctx.fillRect(0,0,W,H);
  if(sky){
    ctx.save();ctx.globalAlpha=prog(tt,INTRO.sky);ctx.drawImage(sky,0,0);ctx.restore();
    ['title-clouds-1','title-clouds-2'].forEach((n,i)=>{const im=IMG[n];if(!im)return;ctx.drawImage(im,0,Math.round(-H*(1-easeOut(prog(tt,i?INTRO.cloud2:INTRO.cloud1)))));});
    const offFar=H*(1-easeOut(prog(tt,INTRO.hillFar))),offNear=H*(1-easeOut(prog(tt,INTRO.hillNear)));
    if(IMG['title-hill-far'])ctx.drawImage(IMG['title-hill-far'],0,Math.round(offFar));
    ctx.save();ctx.translate(0,Math.round(offNear));
    if(IMG['title-hill-near'])ctx.drawImage(IMG['title-hill-near'],0,0);
    if(IMG['title-girl-body'])ctx.drawImage(IMG['title-girl-body'],0,0);
    const hr=FR['title-girl-hair'];
    if(hr){const im=hr[Math.min(hr.length,hairFrame(ta))-1];ctx.save();ctx.translate(HAIR_PIVOT[0],HAIR_PIVOT[1]+HAIR_DY);ctx.scale(HAIR_SCALE,HAIR_SCALE);ctx.drawImage(im,-HAIR_PIVOT[0],-HAIR_PIVOT[1]);ctx.restore();}
    if(IMG['title-cat-body'])ctx.drawImage(IMG['title-cat-body'],0,0);
    const tl=FR['title-cat-tail'];if(tl)ctx.drawImage(tl[Math.floor(ta*TAIL_FPS)%tl.length],0,0);
    const ea=FR['title-cat-ears'];if(ea)ctx.drawImage(ea[(ta%5)<.35?1:0],0,0);
    ctx.restore();}
  drawLogo(prog(tt,INTRO.logo));
  const items=titleItems(),btnFr=FR['title-button'],rects=[],ba=prog(tt,INTRO.buttons),BS=BTN_SCALE;
  const bw=Math.round(128*BS),bh=Math.round(28*BS),vx=BTN_ART.x*BS,vy=BTN_ART.y*BS,vw=BTN_ART.w*BS,vh=BTN_ART.h*BS;
  const n=items.length,logoBottom=LOGO_VIS.y+LOGO_VIS.h,block=n*vh+(n-1)*BTN_GAP,g=(HILL_TOP-logoBottom-block)/2;
  ctx.save();ctx.globalAlpha=ba;
  items.forEach((it,i)=>{
    const down=(titleDown===i),hov=(titleKeys&&titleSel===i);
    const visTop=logoBottom+g+i*(vh+BTN_GAP)+(1-ba)*6,x=W/2-bw/2,y=visTop-vy;
    if(btnFr)ctx.drawImage(btnFr[down?2:(hov?1:0)],Math.round(x),Math.round(y),bw,bh);
    else phX(W/2,visTop+vh,vw,vh,'title-button');
    rects.push({x:Math.round(x+vx),y:Math.round(visTop),w:Math.round(vw),h:Math.round(vh)});
    TXT(it.txt,W/2,visTop+vh/2+BTN_TEXT*.33+(down?1:0),BTN_TEXT,'#2b1d12','center',ba);});
  ctx.restore();TITLE_RECTS=rects;
  if(ba>.9)TXT((TOUCH?'Tap a button to begin':'Click a button, or use the arrow keys and Enter'),W/2,H-8,9,'rgba(43,29,18,.85)','center',undefined,1);
}
function drawLogo(p){
  const lg=IMG['title-logo'];if(!lg){phX(W/2,LOGO_VIS.y+LOGO_VIS.h,LOGO_VIS.w,LOGO_VIS.h,'title-logo');return;}
  const c1=1.1,c3=c1+1,e=1+c3*Math.pow(p-1,3)+c1*Math.pow(p-1,2),off=Math.round(-(LOGO_VIS.y+LOGO_VIS.h+6)*(1-e));
  ctx.drawImage(lg,0,off);
  TXT("B's Journal",LOGO_TEXT.cx,LOGO_TEXT.cy+LOGO_TEXT.size*.33+off,LOGO_TEXT.size,'#4a2d1a','center');}

/* ---------- DRAW: WORLD ---------- */
function drawBG(z,cam){
  ['far','mid'].forEach(k=>{
    const a=IMG['bg-'+z.segs[0]+'-'+k];if(!a){ctx.fillStyle=k==='far'?'#d67bba':'#754289';ctx.fillRect(0,0,W,H);return;}
    ctx.drawImage(a,Math.round(-cam*(a.width-W)/Math.max(1,z.w-W)),0);
    if(z.segs.length>1){const b=IMG['bg-'+z.segs[1]+'-'+k];if(b){ctx.save();ctx.globalAlpha=Math.min(1,cam/(z.w-W));ctx.drawImage(b,Math.round(-cam*(b.width-W)/(z.w-W)),0);ctx.restore();}}});
  if(z.main)ctx.drawImage(z.main,-cam,0);else{ctx.fillStyle='#6e9a55';ctx.fillRect(0,212,W,58);}
}
/* layers that are drawn at their exact height and repeated (lamps, stalls) */
function stamp(im,cx,x,cam){ctx.drawImage(im,Math.round(x-cx-cam),0);}
function drawPropSprite(p,cam){
  const a=FR['prop-'+p.key]||(p.key&&p.key.indexOf('work-')===0?FR['prop-stall']:null);
  const top=GROUND-p.ph[1];
  if(a){drawFrames(a,0,p.x-cam,GROUND,1);if(p.papers)drawPapers(p.x-cam);}
  else{phX(p.x-cam,GROUND,p.ph[0],p.ph[1],p.beam||p.texts?'':'prop-'+p.key);}
  const lx=p.x-cam+(p.tx||0);
  if(p.beam)TXT(p.beam,lx,top+(p.ty||10.5),p.tsize||8,CARVE,'center');
  if(p.texts)p.texts.forEach(t=>TXT(t[0],p.x-cam+t[1],top+t[2],t[3],CARVE,'center'));}
let SHADOW=null;const CARVE='#663831';
function maskOut(im,x,y,dir){if(!TXON)return;tx.save();tx.globalCompositeOperation='destination-out';tx.imageSmoothingEnabled=false;tx.translate(Math.round(x),Math.round(y)+OFFY);tx.scale(dir||1,1);tx.drawImage(im,-Math.round(im.width/2),-im.height);tx.restore();}
function drawPapers(bx){
  const fa=FR['item-page'];if(!fa)return;const im=fa[0],left=Math.round(bx-43),top=GROUND-78;
  if(!SHADOW)SHADOW=mk(im.width,im.height,g=>{g.drawImage(im,0,0);g.globalCompositeOperation='source-in';g.fillStyle='rgba(43,29,18,.5)';g.fillRect(0,0,im.width,im.height);});
  [[8,9],[32,6],[57,10]].forEach(([dx,dy])=>{const x=left+dx,y=top+dy;
    ctx.drawImage(SHADOW,x+2,y+2);ctx.drawImage(im,x,y);
    const px=x+Math.floor(im.width/2)-1,py=y+2;
    ctx.fillStyle='#7a1f1a';ctx.fillRect(px+1,py+1,2,2);ctx.fillStyle='#d9473f';ctx.fillRect(px,py,2,2);});}
function drawWorld(){
  const cam=Math.round(camX);OFFY=Math.round(camY);
  let zs=1,zcx=0,zcy=0,zfx=0,zfy=0;
  ctx.save();
  if(zoom){const e=easeIO(clamp(zoom.t,0,1));zs=1+(ZOOM_SCALE-1)*e;zfx=zoom.fx;zfy=zoom.fy;zcx=zfx+(W/2-zfx)*e;zcy=zfy+(H/2-zfy)*e;
    ctx.translate(zcx,zcy);ctx.scale(zs,zs);ctx.translate(-zfx,-zfy);TXON=e<.02;}
  ctx.translate(0,Math.round(camY));
  drawBG(Z,cam);
  const lamp=IMG['bg-all-lamp'];if(lamp)(Z.lamps||[]).forEach(lx=>stamp(lamp,LAMP_CX,lx,cam));
  if(Z.fire){const ff=FR['bg-finale-fire'];if(ff)ctx.drawImage(ff[Math.floor(T*FIRE_FPS)%2],-cam,0);else phX(FIREX-cam,235,40,60,'bg-finale-fire');}
  for(const p of Z.props){if(p.nosprite)continue;drawPropSprite(p,cam);}
  for(const pg of (Z.pages||[])){if(save.pages.includes(pg.id))continue;const bob=Math.sin(T*3)*3,fa=FR['item-page'];
    if(fa)drawFrames(fa,Math.floor(T*3),pg.x-cam,GROUND-8+bob,1);else phX(pg.x-cam,GROUND-8+bob,16,20,'item-page');}
  const walking=C.st==='walk',pw=FR['char-walk'],pi=FR['char-idle'],cb=FR['cat-body'],ct=FR['cat-tail'];
  if(pw&&pi&&cb&&ct){
    const dr=(arr,i,x,dir)=>{drawFrames(arr,i,x,GROUND,dir);maskOut(arr[i%arr.length],x,GROUND,dir);};
    dr(cb,0,C.x-cam,C.dir);dr(ct,walking?[0,1,0,2][Math.floor(T*6)%4]:0,C.x-cam,C.dir);
    const seq=[pw[0],pi[0],pw[1],pi[0]];
    dr([P.st==='walk'?seq[Math.floor(T*7)%4]:pi[0]],0,P.x-cam,P.dir);}
  else{phX(C.x-cam,GROUND,16,16,'Peanut');phX(P.x-cam,GROUND,24,32,'B');}
  if(state==='play'){const p=nearProp();if(p){const px=Math.round(p.x-cam),py=Math.round(GROUND-p.ph[1]-16+Math.sin(T*5)*2);
    ctx.fillStyle='#2b1d12';ctx.beginPath();ctx.moveTo(px-6,py-5);ctx.lineTo(px+6,py-5);ctx.lineTo(px,py+5);ctx.closePath();ctx.fill();
    ctx.fillStyle='#d67bba';ctx.beginPath();ctx.moveTo(px-4,py-3);ctx.lineTo(px+4,py-3);ctx.lineTo(px,py+3);ctx.closePath();ctx.fill();}}
  ctx.restore();TXON=true;
  const sk=IMG['finale-sky'];
  if(camY>0){if(sk)ctx.drawImage(sk,0,Math.round(camY-H));else{ctx.fillStyle='#05052a';ctx.fillRect(0,0,W,Math.round(camY));}}
  OFFY=0;
  if(state==='cine'&&camY>0)return;
  if(bubble&&state!=='dialog'&&!zoom){
    ctx.font='8.5px '+FB;const lines=wrap(bubble.t,130),bw=Math.max(...lines.map(l=>ctx.measureText(l).width))+10,bh=lines.length*10+6;
    const bx=clamp(C.x-cam-bw/2,4,W-bw-4),by=GROUND-74-bh;
    ctx.fillStyle='#fbe9c8';ctx.fillRect(Math.round(bx),Math.round(by),Math.round(bw),bh);ctx.strokeStyle='#3a2a1a';ctx.strokeRect(Math.round(bx)+.5,Math.round(by)+.5,Math.round(bw)-1,bh-1);
    ctx.fillRect(Math.round(C.x-cam)-2,Math.round(by+bh),4,4);
    lines.forEach((l,i)=>TXT(l,Math.round(bx)+5,Math.round(by)+10+i*10,9,'#3a2a1a','left',undefined,1));}
  if(!zoom&&state!=='cine')drawPetals();
  drawHUD();
}
/* drifting petals (deterministic from the clock, so they need no state) */
function drawPetals(){
  for(let i=0;i<26;i++){
    const sp=7+(i*37%9),x=((i*83.7-T*sp)%(W+30)+(W+30))%(W+30)-12,
      y=((i*47.3+T*(5+i%4*2))%(GROUND-6))+Math.sin(T*1.2+i)*6,c=['#d67bba','#ec975e','#fbe9c8','#d8a066'][i%4],
      f=Math.floor(T*3+i)%2;
    ctx.globalAlpha=.85;ctx.fillStyle=c;ctx.fillRect(Math.round(x),Math.round(y),f?3:2,f?2:3);ctx.globalAlpha=1;}}
function contextHint0(){
  if(state==='ready')return null;
  if(state==='dialog')return introMode?'Press E, Space or click the box to read on':'Press E, Space or click the box to continue';
  if(state==='zoom'||state==='card')return 'Press E or Esc to close';
  if(state==='cine')return 'Press Enter or click to skip to the contact page';
  if(state==='wait')return '';
  const p=nearProp();
  if(p)return p.kind==='save'?'Press E to rest by the fire and finish the trip':p.kind==='card'?'Press E to look closer at the '+p.label.toLowerCase():'Press E to read the '+p.label.toLowerCase();
  const pg=(Z.pages||[]).find(q=>!save.pages.includes(q.id)&&Math.abs(q.x-P.x)<130);
  if(pg)return 'A journal page is close. Walk into it to collect it';
  return 'Walk with A and D or the arrow keys. Look for floating pages and things you can open';}
const tk=s=>{if(!TOUCH||!s)return s;return s.replace('Press E, Space or click the box to read on','Tap the box to read on').replace('Press E, Space or click the box to continue','Tap the box to continue').replace('Press E or Esc to close','Tap CLOSE to leave').replace('Press Enter or click to skip to the contact page','Tap to skip to the contact page').replace('Press E to','Tap the E button to').replace('Walk with A and D or the arrow keys.','Walk with the arrow buttons.');};
const contextHint=()=>tk(contextHint0());
const LEGEND=TOUCH?[['Ask Peanut','hint'],['Journal','journal'],['Map','map'],['Menu','menu']]:[['A / D or arrows: walk',null],['E: open',null],['C: ask Peanut','hint'],['J: journal','journal'],['M: map','map'],['Esc: menu','menu']];
let LEGEND_RECTS=[];
function drawLegend(){
  ctx.font='8px '+FP;const gap=16,ws=LEGEND.map(l=>ctx.measureText(fx(l[0])).width),tot=ws.reduce((a,b)=>a+b,0)+gap*(LEGEND.length-1);let x=(W-tot)/2;LEGEND_RECTS=[];
  LEGEND.forEach((l,i)=>{const r={x:x-2,y:H-12,w:ws[i]+4,h:11,act:l[1]};if(l[1])LEGEND_RECTS.push(r);const hov=l[1]&&inR(mouse,r);TXT(l[0],x,H-4,8,hov?'#ec975e':'#fbe9c8','left',undefined,0);x+=ws[i]+gap;});}
function drawHUD(){
  const strip=!(state==='cine'||state==='contact');
  if(strip){
    ctx.fillStyle='rgba(43,29,18,.82)';ctx.fillRect(0,H-22,W,22);
    const ch=contextHint();if(ch)TXT(ch,W/2,H-13,9,'#ffd28a','center',undefined,0);
    drawLegend();}
  if(state!=='cine'&&state!=='wait'){
    const ic=FR['ui-page-icon'];ctx.fillStyle='rgba(43,29,18,.55)';ctx.fillRect(6,5,50,16);
    if(ic)drawFrames(ic,0,16,19,1);else phX(16,18,12,12,'');
    TXT(save.pages.length+'/7',24,17,10,'#fbe9c8','left');}
  if(state==='ready'){
    const a=.55+.45*Math.sin(T*5);
    ctx.fillStyle='rgba(43,29,18,.7)';ctx.fillRect(W/2-120,96,240,50);
    TXT('MOVE TO START',W/2,118,16,'#fbe9c8','center',a);
    TXT('Press A or D, or the arrow keys, to begin',W/2,136,10,'#ffd28a','center',undefined,1);}
  if(banner&&state!=='ready'&&state!=='wait'){const a=banner.t<.5?banner.t/.5:banner.t>3?Math.max(0,(3.6-banner.t)/.6):1;
    ctx.save();ctx.globalAlpha=a;ctx.fillStyle='rgba(43,29,18,.7)';ctx.fillRect(W/2-120,28,240,34);ctx.restore();
    TXT(banner.title,W/2,45,13,'#fbe9c8','center',a);TXT(banner.sub,W/2,57,9,'#ec975e','center',a,1);}
}
/* ---------- DRAW: CONTACT SCREEN ---------- */
function drawContact(){
  const sk=IMG['finale-sky'];if(sk)ctx.drawImage(sk,0,0);else{ctx.fillStyle='#05052a';ctx.fillRect(0,0,W,H);}
  const t=contactT,fa=r=>prog(t,r),rects=[];
  drawLogo(prog(t,[.1,.55]));
  TXT(CONTACT.heading,W/2,100,12,'#fbe9c8','center',fa([.55,.3]));
  const items=CONTACT.items,cols=2,rowH=38,x0=[62,256],y0=110;
  items.forEach((it,i)=>{
    const c=i%cols,r=Math.floor(i/cols),x=x0[c],y=y0+r*rowH,a=fa([.8+i*.15,.3]),rc={x:x-3,y:y-3,w:170,h:36,item:it};rects.push(rc);
    const hov=inR(mouse,rc)&&state==='contact';
    ctx.save();ctx.globalAlpha=a;
    if(hov){ctx.fillStyle='rgba(251,233,200,.18)';ctx.fillRect(rc.x,rc.y,rc.w,rc.h);}
    const im=IMG[it.icon];if(im)ctx.drawImage(im,x-2,y-2,32,32);else phX(x+14,y+30,28,28,it.icon);
    ctx.restore();
    TXT(it.label,x+36,y+11,11,hov?'#ec975e':'#fbe9c8','left',a);
    TXT(it.sub,x+36,y+23,8,'#c9b8e8','left',a,1);});
  const ba=fa([1.7,.3]);ctx.font='10px '+FP;
  TXT('Done exploring? Press FINISH AND RESET so the next visitor starts from the beginning.',W/2,H-42,8,'#c9b8e8','center',ba,1);
  [['< WANDER BACK',W/2-140,'back'],['VIEW JOURNAL',W/2,'journal'],['FINISH AND RESET >',W/2+135,'reset']].forEach(([txt,cx,act])=>{
    const tw=ctx.measureText(fx(txt)).width,r={x:Math.round(cx-tw/2-6),y:H-30,w:Math.round(tw+12),h:16,act};rects.push(r);
    const hov=inR(mouse,r)&&state==='contact'&&ba>.9;
    TXT(txt,cx,H-18,10,hov?'#ec975e':'#fbe9c8','center',ba);});
  CONTACT_RECTS=ba>.9||contactT>6?rects:[];
}
function draw(){
  tx.setTransform(1,0,0,1,0,0);tx.clearRect(0,0,tcv.width,tcv.height);tx.setTransform(KX,0,0,KY,0,0);
  ctx.clearRect(0,0,W,H);
  if(state==='title')drawTitle();
  else if(state==='contact'||(state==='journal'&&jFromContact))drawContact();
  else drawWorld();
  if(fade.a>0){const fc='rgba(27,21,48,'+fade.a.toFixed(3)+')';ctx.fillStyle=fc;ctx.fillRect(0,0,W,H);tx.fillStyle=fc;tx.fillRect(0,0,W,H);}
}


/* ---------- TOUCH CONTROLS ---------- */
if(TOUCH){
  $('maphint').textContent='Tap a place to travel there. X closes the map.';
  const held=(id,code)=>{const b=$(id);
    const on=e=>{e.preventDefault();ac();try{b.setPointerCapture(e.pointerId);}catch(er){}keys[code]=true;b.classList.add('on');onKey(code);};
    const off=e=>{keys[code]=false;b.classList.remove('on');};
    b.addEventListener('pointerdown',on);b.addEventListener('pointerup',off);b.addEventListener('pointercancel',off);b.addEventListener('lostpointercapture',off);};
  held('tpL','ArrowLeft');held('tpR','ArrowRight');
  const tap=(id,fn)=>$(id).addEventListener('pointerdown',e=>{e.preventDefault();ac();fn();});
  tap('tpE',()=>onKey(state==='cine'?'Enter':'KeyE'));
  tap('tpM',()=>onKey('Escape'));
  ['tpad','rot','pn'].forEach(id=>$(id).addEventListener('contextmenu',e=>e.preventDefault()));
  let kbMode=false;addEventListener('keydown',()=>{kbMode=true;});addEventListener('pointermove',e=>{if(e.pointerType==='mouse')kbMode=true;},{passive:true});
  setInterval(()=>{
    const mv=!kbMode&&(state==='play'||state==='ready'),act=!kbMode&&(mv||state==='dialog'||state==='cine');
    $('tpL').style.display=$('tpR').style.display=mv?'flex':'none';
    $('tpE').style.display=act?'flex':'none';
    $('tpM').style.display=!kbMode&&state==='play'?'flex':'none';},120);
  cv.addEventListener('touchstart',e=>{if(state==='title'){e.preventDefault();ac();if(!introDone()){titleStart=T-INTRO_END-.1;}}},{passive:false});
  cv.addEventListener('touchend',e=>{if(state!=='title'||!introDone()||!e.changedTouches[0])return;e.preventDefault();
    const m=mpos(e.changedTouches[0]);for(const it of titleItems()){if(it.rect&&inR(m,it.rect)){it.go();break;}}},{passive:false});
}
(()=>{let seen=false;try{seen=sessionStorage.getItem('bjpn')==='1';}catch(e){}
  if(seen||!(TOUCH||innerWidth<720))return;
  const pn=$('pn');setTimeout(()=>{pn.style.display='block';},700);
  $('pnok').addEventListener('click',()=>{pn.style.display='none';try{sessionStorage.setItem('bjpn','1');}catch(e){}lastInput=Date.now();});})();

/* ---------- LOOP ---------- */
function resize(){
  const s=Math.min(innerWidth/W,innerHeight/H),cw=Math.floor(W*s),ch=Math.floor(H*s),dpr=window.devicePixelRatio||1;
  $('stage').style.width=cw+'px';$('stage').style.height=ch+'px';
  cv.style.width=cw+'px';cv.style.height=ch+'px';
  tcv.style.width=cw+'px';tcv.style.height=ch+'px';tcv.width=Math.max(1,Math.round(cw*dpr));tcv.height=Math.max(1,Math.round(ch*dpr));KX=tcv.width/W;KY=tcv.height/H;
  $('ui').style.transform='scale('+(cw/W)+')';}
addEventListener('resize',resize);resize();
let last=performance.now();
function frame(now){const dt=Math.min(.05,(now-last)/1000);last=now;update(dt);draw();requestAnimationFrame(frame);}
preload().then(()=>{try{return Promise.all([document.fonts.load('10px Pixelta'),document.fonts.load('10px InterB')]);}catch(e){}}).then(()=>{titleStart=T;requestAnimationFrame(frame);});
})();
